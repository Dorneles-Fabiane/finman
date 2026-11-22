import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { loginSchema, type LoginDto } from "./schemas/login.schema.js";
import { ZodValidationPipe } from "../shared/pipes.js";
import { logoutSchema, type LogoutDto } from "./schemas/logout.schema.js";
import { refreshTokenSchema, type RefreshTokenDto } from "./schemas/refresh-token.schema.js";

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @Post('logout')
  async logout(@Body(new ZodValidationPipe(logoutSchema)) body: LogoutDto){
    return await this.authService.logout(body.refreshToken)
  }

  @Post('refreshtoken') 
  async refreshToken(@Body(new ZodValidationPipe(refreshTokenSchema)) body: RefreshTokenDto) {
    return this.authService.refreshToken(body.refreshToken)
  }
}