import { User } from "@prisma/client";

export function userDTO(user: User) {
    // Add more validations..
    return {
        id: user.userId,
        name: user.name,
        email: user.email
    }
}