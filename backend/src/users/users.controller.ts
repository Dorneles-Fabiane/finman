import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { CreateUserDto } from "./dtos/create-user.dto.js";
import { type JwtPayload, CurrentUser } from "../auth/decorators/current-user.decorator.js";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";
import { ZodValidationPipe } from "../shared/pipes.js";
import { createUserSchema } from "./schemas/create-user.schema.js";
import { RolesGuard } from "../auth/guards/roles.guard.js";
import { Roles } from "../auth/decorators/roles.decorator.js";
import { UserRole } from "./entities/user.entity.js";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: JwtPayload) {
    return this.usersService.findById(user.sub);
  }

  @UseGuards(RolesGuard)
  @Roles([UserRole.ADMIN, UserRole.SUPER_ADMIN])
  @Post()
  async create(@Body(new ZodValidationPipe(createUserSchema)) createUserDto: CreateUserDto, @CurrentUser() user: JwtPayload) {
    return this.usersService.createTeamMember(createUserDto, user.sub)
  }
}