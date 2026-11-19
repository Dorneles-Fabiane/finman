import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { UsersModule } from "../users/users.module.js";
import { AuthRepository } from "./auth.repository.js";
import { RefreshTokenModel, RefreshTokenSchema } from "./models/refresh-token.model.js";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRECT,
      signOptions: { expiresIn: '15m' }
    }),
    MongooseModule.forFeature([
      {name: RefreshTokenModel.name, schema: RefreshTokenSchema}
    ])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository
  ],
  exports: [AuthService]
})

export class AuthModule {}