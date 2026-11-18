import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { UsersModule } from "../users/users.module.js";
import { RefreshTokenModelSchema, RefreshTokenSchema } from "./schemas/refresh-token.schema.js";
import { AuthRepository } from "./auth.repository.js";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRECT || 'teste_key',
      signOptions: { expiresIn: '15m' }
    }),
    MongooseModule.forFeature([
      {name: RefreshTokenSchema.name, schema: RefreshTokenModelSchema}
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