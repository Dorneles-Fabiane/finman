import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";

export type RefreshTokenDocument = HydratedDocument<RefreshTokenSchema>;

@Schema({collection: 'refresh-tokens', timestamps: true})
export class RefreshTokenSchema {
  @Prop({type: Types.ObjectId, ref: 'User', required: true})
  userId: Types.ObjectId
  
  @Prop({required: true, unique: true})
  refreshToken: string

  @Prop({required: true})
  ttl: Date
}

export const RefreshTokenModelSchema = SchemaFactory.createForClass(RefreshTokenSchema)