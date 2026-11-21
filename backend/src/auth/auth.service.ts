import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import type { LoginDto } from "./schemas/login.schema.js";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../users/users.service.js";
import { AuthRepository } from "./auth.repository.js";
import { createRefreshTokenSchema } from "./schemas/refresh-token.schema.js";

@Injectable()
  export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly authRepository: AuthRepository
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if(!user) {
      throw new UnauthorizedException('Email ou senha inválidos')
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos')
    }
    
    //sub para padronização RFC 7519
    const payload = { sub: user.id, email: user.email, role: user.role}
    
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m', 
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '2d', 
    });

    await this.saveRefreshToken(payload.sub, refreshToken )

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email
      }
    }
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const ttl = new Date();
    ttl.setDate(ttl.getDate() + 2);

    const parsed = createRefreshTokenSchema.parse({
      userId,
      refreshToken,
      ttl
    })

    return this.authRepository.create(
      parsed.userId,
      parsed.refreshToken,
      parsed.ttl
    )
  }

  async logout(refreshToken: string): Promise<void> {
    await this.authRepository.deleteByRefreshToken(refreshToken)
  }
}