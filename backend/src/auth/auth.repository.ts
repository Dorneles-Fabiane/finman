import { InjectModel } from "@nestjs/mongoose";
import { RefreshTokenSchema } from "./schemas/refresh-token.schema.js";
import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(RefreshTokenSchema.name)
    private readonly refreshTokenModel: Model<RefreshTokenSchema>
  ) {}

  async create(userId: string, refreshToken: string, ttl: Date) {
    const userObjectId = new Types.ObjectId(userId);

    await this.refreshTokenModel.create({
      userId: userObjectId,
      refreshToken,
      ttl
    })
  }

  async findByToken(refreshToken: string) {
    await this.refreshTokenModel.findOne({refreshToken})
  }

  async deleteByRefreshToken(refreshToken: string) {
    await this.refreshTokenModel.deleteOne({refreshToken: refreshToken})
  }
}