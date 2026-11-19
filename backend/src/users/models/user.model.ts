import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '../entities/user.entity.js';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel> & {
  createdAt?: Date
  updatedAt?: Date
};

@Schema({ collection: 'users', timestamps: true })
export class UserModel {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ 
    required: true,
    enum: UserRole,
  })
  role: UserRole;

  //Débito técnico - adicionar ref após criação da company
  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true, default: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);