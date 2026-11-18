import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUserRepository } from "./users.repository.interface.js";
import { User } from "../entities/user.entity.js";
import { UserDocument, UserSchemaClass } from '../schemas/user.schema.js'

@Injectable()
export class UsersRepository implements IUserRepository {
    constructor(
        @InjectModel(UserSchemaClass.name)
        private readonly userModel: Model<UserDocument>,
) {}

async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const created = new this.userModel(userData);
    const saved = await created.save();
    return this.toDomain(saved);
}

async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    
    if (!doc) {
    return null;
  }
    
    return this.toDomain(doc);
}

async findById(id: string): Promise<User | null> {
    const doc = await this.userModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null
}

async findAllByCompany(companyId: string): Promise<User[]> {
    const docs = await this.userModel.find({ companyId }).exec();
    return docs.map((doc) => this.toDomain(doc));
}

private toDomain(doc: UserDocument): User {
    return new User({
        id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        passwordHash: doc.passwordHash,
        role: doc.role,
        companyId: doc.companyId,
        active: doc.active,
        createdAt: doc.createdAt,

    });
}
}