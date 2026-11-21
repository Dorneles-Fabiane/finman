import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/roles.decorator.js";
import { UserRole } from "../../users/entities/user.entity.js";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor (private readonly reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride(Roles, [
      context.getHandler(),
      context.getClass()
    ])

    if(!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest<{
      user?: { role?: UserRole | null };
    }>()
    
    const userRole = request.user?.role;

    if (userRole === null || userRole === undefined || !requiredRoles.includes(userRole)) {
      throw new ForbiddenException('Sem permissão para acessar este recurso');
    }
    
    return true
  }
}