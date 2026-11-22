import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import type { LoginDto } from "./schemas/login.schema.js";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../users/users.service.js";
import { AuthRepository } from "./auth.repository.js";
import { createRefreshTokenSchema } from "./schemas/refresh-token.schema.js";
import { JwtPayload } from "./decorators/current-user.decorator.js";

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
  
    const {accessToken, refreshToken} = await this.generateTokens(payload)

    await this.saveRefreshToken(payload.sub, refreshToken)

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
    const TWO_DAYS_IN_MS = 2 * 24 * 60 * 60 * 1000;

    const expiresIn = new Date(Date.now() + TWO_DAYS_IN_MS)

    const parsed = createRefreshTokenSchema.parse({
      userId,
      refreshToken,
      expiresIn
    })

    return this.authRepository.saveRefreshToken(
      parsed.userId,
      parsed.refreshToken,
      parsed.expiresIn
    )
  }

  async logout(refreshToken: string): Promise<void> {
    await this.authRepository.deleteByRefreshToken(refreshToken)
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string
  }> {
    const payload = await this.jwtService.verifyAsync<JwtPayload> (
      refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET
    })

    const deletedToken = await this.authRepository.deleteByRefreshToken(refreshToken)
    
    if (!deletedToken || deletedToken.deletedCount === 0) {
      throw new UnauthorizedException('O token fornecido não é válido!');
    }

    const user = await this.userService.findById(payload.sub)

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado ou inválido!');
    }

    const newPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role
    }

    const tokens = await this.generateTokens(newPayload)

    await this.saveRefreshToken(user.id, tokens.refreshToken)

    return tokens;
  }

  private async generateTokens(payload: JwtPayload): Promise<{
    accessToken: string;
    refreshToken: string
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
      expiresIn: '15m', 
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '2d', 
      })
    ])

    return {accessToken, refreshToken}
  } 
}