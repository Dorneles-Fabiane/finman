import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../decorators/current-user.decorator.js";
import type { Request } from 'express'


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & {user?: JwtPayload}>()
    const token = this.extractTokenFromHeader(request)
    
    if(!token) {
      throw new UnauthorizedException('Token de acesso não fornecido')
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET
      })

      request.user = payload

      return true
    } catch(err) {
      throw new UnauthorizedException('Token de acesso inválido ou expirado')
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization

    if(!authHeader) {
      return undefined
    }

    const [type, token] = authHeader.split(' ')
    return type === 'Bearer' && token ? token: undefined
  }
}