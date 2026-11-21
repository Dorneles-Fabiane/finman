import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { UsersModule } from "../users/users.module.js";
import { AuthRepository } from "./auth.repository.js";
import { RefreshTokenModel, RefreshTokenSchema } from "./models/refresh-token.model.js";
import { JwtAuthGuard } from "./guards/jwt-auth.guard.js";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' }
    }),
    MongooseModule.forFeature([
      {name: RefreshTokenModel.name, schema: RefreshTokenSchema}
    ])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JwtAuthGuard
  ],
  exports: [
    JwtModule,
    JwtAuthGuard
  ]
})

export class AuthModule {}