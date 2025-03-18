import 'server-only';
import { config } from '@/config/envs/config.env';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify } from 'jose';

const key = new TextEncoder().encode(config.JWT_SECRET);

export function encrypt(payload: Record<string, string | Date>) {
    const token = new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key);
    // console.log("Token has been created", token)
    return token;
}

export async function decrypt(token: string) {
    try {
        const { payload } = await jwtVerify(token, key);
        // console.log("Token has been decoded", payload);
        return payload;
    } catch (error) {
        console.log(`There is an error at trying to decoding token: ${error}`);
    }
}

export async function createSession(userId: string) {
    const cookieDuration = 24 * 60 * 60 * 1000;
    const expires = new Date(Date.now() + cookieDuration);
    const session = await encrypt({ userId, expires });

    (await cookies()).set('session', session, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', expires });
    redirect('/dashboard');
}

export async function verifySession() {
    const cookie = (await cookies()).get('session')?.value;
    if (!cookie) return null;
    const session = await decrypt(cookie);
    return session;
}

export async function deleteSession() {
    (await cookies()).delete('session');
    redirect('/auth/login');
}