export type FormSignupState =
    | {
        errors?: {
            name?: string[];
            email?: string[];
            password?: string[];
        };
        message?: string;
    }
    | undefined;

export type FormLoginState =
    | {
        errors?: {
            email?: string[];
            password?: string[];
        };
        message?: string;
    }
    | undefined;

export type SessionPayload = {
    userId: string | number;
    expiresAt: Date;
};