import { User } from "../entities/user.entity.js"

export const USER_REPOSITORY = Symbol("USER_REPOSITORY")

export interface IUserRepository {
    create(user: Omit<User, 'id'| 'createdAt'>): Promise<User>
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAllByCompany(companyId: string): Promise<User[]>;
}