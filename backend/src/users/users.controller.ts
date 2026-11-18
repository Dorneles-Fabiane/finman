import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { CreateUserDto } from "./dtos/create-user.dto.js";


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // Simulando o usuário logado temporariamente para testar a regra de companyId
    // Depois vamos pegar isso do token JWT real via @CurrentUser()
    const mockCurrentUser = {
      id: 'admin-id-123',
      role: 'ADMIN',
      companyId: 'empresa-abc',
    };

    return this.usersService.createTeamMember(createUserDto, mockCurrentUser as any)
  }
}