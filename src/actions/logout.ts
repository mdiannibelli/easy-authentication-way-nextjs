'use server';
import { deleteSession } from "@/lib/sessions";

export async function logout() {
    await deleteSession();
}