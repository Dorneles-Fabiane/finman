export enum UserRole {
    SUPER_ADMIN = 'SUPER-ADMIN',
    ADMIN = 'ADMIN',
    STORE = 'STORE',
    TECHNICIAN = 'TECHNICIAN',
    BILLING = 'BILLING',  
}

export class User {
     id: string;
     name: string;
     email: string;
     passwordHash: string;
     role: UserRole;
     companyId: string;
     active: boolean;
     createdAt: Date;

     constructor(partial: Partial<User>) {
        Object.assign(this, partial)
     }
}