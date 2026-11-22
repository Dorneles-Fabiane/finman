import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UserRole } from "../../users/entities/user.entity.js"

export interface JwtPayload {
  sub: string
  email: string,
  role: UserRole
}

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user: JwtPayload | null = request.user

    if(!user) {
      return undefined
    }

    return data ? user[data] : user
  }
)