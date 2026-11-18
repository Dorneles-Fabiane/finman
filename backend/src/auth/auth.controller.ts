import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { LoginDto } from "./dtos/login.dto.js";

interface LogoutBodyDto {
  refreshToken: string
}

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @Post('logout')
  async logout(@Body() body: LogoutBodyDto){
    return await this.authService.logout(body.refreshToken)
  }
}