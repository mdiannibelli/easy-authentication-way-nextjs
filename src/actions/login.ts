'use server';
import { loginFormSchema } from "@/schemas/login.schema";
import type { FormLoginState } from "../../types";
import { db } from "@/config/db/prisma";
import bcrypt from 'bcrypt';
import { createSession } from "@/lib/sessions";

export async function login(state: FormLoginState, formData: FormData): Promise<FormLoginState> {
    // 1. Fields validation
    const validationResult = loginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const { email, password } = validationResult.data;

    // 2. Find a user with current email
    const user = await db.user.findFirst({ where: { email } });
    if (!user) {
        return {
            message: "There is no account registered with that email."
        }
    }

    // 3. Compare passwords and validate
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
        return {
            message: 'Incorrect password'
        }
    }

    // 4. Create session
    await createSession(user.userId);
}