import { Role } from "@/types/roles.types";

export type RegisterForm = {
    email: string;
    password: string;
    name: string;
    surname: string;
    role: Role;
}