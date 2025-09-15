export interface User {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified?: Date | null;
    password: string | null;
    role: string | null;
    image?: string | null;
}