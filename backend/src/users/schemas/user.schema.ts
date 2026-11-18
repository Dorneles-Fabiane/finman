import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../entities/user.entity.js';

export type UserDocument = UserSchemaClass & Document & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true, collection: 'users' })
export class UserSchemaClass {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ 
    required: true,
    enum: UserRole,
    default: UserRole.STORE
  })
  role: UserRole;

  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true, default: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);