import { ConflictException, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import * as bcript from 'bcryptjs'
import { USER_REPOSITORY, type IUserRepository } from "./repositories/users.repository.interface.js";
import { User, UserRole } from "./entities/user.entity.js";
import { CreateUserDto } from "./dtos/create-user.dto.js";


@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly usersRepository: IUserRepository,
    ) {}

    async createTeamMember(dto: CreateUserDto, currentUser: User): Promise<Omit<User, 'passwordHash'>> {
        const allowedRolesForAdmin = [UserRole.STORE, UserRole.TECHNICIAN, UserRole.BILLING];

        if (currentUser.role == UserRole.ADMIN && !allowedRolesForAdmin.includes(dto.role)) {
            throw new ForbiddenException('Administradores só podem cadastrar Vendedores, Técnicos ou Faturamento');
        }

       const existingUser = await this.usersRepository.findByEmail(dto.email)
       if(existingUser) {
        throw new ConflictException('Email já cadastrado no sistema')
       }

       const passwordHash = await bcript.hash(dto.password, 10)

       const createdUser = await this.usersRepository.create({
        name: dto.name,
        email: dto.email,
        passwordHash,
        role: dto.role,
        companyId: currentUser.companyId,
        active: true,
       });

       const { passwordHash: _, ...userWithoutPassword } = createdUser;
       return userWithoutPassword;
    }

    async findByEmail (email: string) {
        return await this.usersRepository.findByEmail(email)
    }

}
