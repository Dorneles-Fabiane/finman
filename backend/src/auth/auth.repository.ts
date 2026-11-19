import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  RefreshTokenModel,
  type RefreshTokenDocument,
} from './models/refresh-token.model.js';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(RefreshTokenModel.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  async create(userId: string, refreshToken: string, ttl: Date) {
    const userObjectId = new Types.ObjectId(userId);

    return this.refreshTokenModel.create({
      userId: userObjectId,
      refreshToken,
      ttl,
    });
  }

  async findByToken(refreshToken: string) {
    return this.refreshTokenModel.findOne({ refreshToken });
  }

  async deleteByRefreshToken(refreshToken: string) {
    return this.refreshTokenModel.deleteOne({ refreshToken });
  }
}