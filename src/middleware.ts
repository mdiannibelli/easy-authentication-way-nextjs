import { verifySession } from "@/lib/sessions";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    //1. Check if route is protected
    const protectedRoutes = ['/dashboard'];
    const url = req.nextUrl.clone();
    const isProtectedRoute = protectedRoutes.includes(url.pathname);


    if (isProtectedRoute) {
        // 2. Check for valid session
        const session = await verifySession();

        // 3. Redirect unauthed users
        if (!session?.userId) {
            url.pathname = '/auth/login';
            return NextResponse.redirect(url);
        }

    }
    // 4. Render route
    return NextResponse.next();
}

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/dashboard/:path*']
};