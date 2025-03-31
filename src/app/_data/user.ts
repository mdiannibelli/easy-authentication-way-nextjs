import { db } from "@/config/db/prisma";
import { userDTO } from "@/dtos/user.dto";
import { verifySession } from "@/lib/sessions"
import { redirect } from "next/navigation";
import { cache } from "react";

//? Using cache will making one request while calling getUser in multiple components
export const getUser = cache(async () => {
    // 1. Verify user's session
    const session = await verifySession();
    if (!session) {
        redirect("/auth/login");
    }

    // 2. Get user from database
    const user = await db.user.findFirst({
        where: {
            userId: session.userId!
        }
    })

    // 3. Filter user data and return only the necessary information
    const filteredUser = userDTO(user!);
    return filteredUser;
});