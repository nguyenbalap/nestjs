export interface UserInterFace {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    avatar: string;
    password: string;
    isActive: boolean;
}

export enum UserRole {
    ADMIN = 1,
    USER = 2,
}
