'use server';

import { signupSchema } from "@/schemas/signup.schema";
import type { FormSignupState } from "../../types";
import bcrypt from 'bcrypt';
import { db } from "@/config/db/prisma";
import { createSession } from "@/lib/sessions";
import { v4 as uuidv4 } from 'uuid';

export async function signup(state: FormSignupState, formData: FormData): Promise<FormSignupState> {
    // 1. Fields validation
    const validationResult = signupSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const { name, email, password } = validationResult.data;

    // 2. Find a user with current email
    const existingEmail = await db.user.findFirst({ where: { email } });
    if (existingEmail) {
        return {
            message: 'Email already exists, please use a different email or login.',
        }
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the user
    const user = await db.user.create({
        data: {
            userId: uuidv4(),
            email: email,
            name: name,
            password: hashedPassword
        }
    });
    // console.log({ user })
    // 5. Create a session for the user
    await createSession(user.userId);
};