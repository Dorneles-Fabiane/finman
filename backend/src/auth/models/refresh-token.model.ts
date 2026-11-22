import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";

export type RefreshTokenDocument = HydratedDocument<RefreshTokenModel>;

@Schema({collection: 'refresh-tokens', timestamps: true})
export class RefreshTokenModel {
  @Prop({type: Types.ObjectId, ref: 'User', required: true})
  userId: Types.ObjectId
  
  @Prop({required: true, unique: true})
  refreshToken: string

  @Prop({required: true, expires: 0})
  expiresIn: Date
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel)