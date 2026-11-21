import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'
import { USER_REPOSITORY, type IUserRepository } from "./repositories/users.repository.interface.js";
import { User, UserRole } from "./entities/user.entity.js";
import { CreateUserDto } from "./dtos/create-user.dto.js";


@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly usersRepository: IUserRepository,
    ) {}

    async createTeamMember(dto: CreateUserDto, currentUserId: string): Promise<Omit<User, 'passwordHash'>> {
        const currentUser = await this.usersRepository.findById(currentUserId);

        if (!currentUser) {
            throw new NotFoundException('Usuário autenticado não encontrado');
        }

        const allowedActorRoles = [UserRole.ADMIN, UserRole.SUPER_ADMIN];

        if (!allowedActorRoles.includes(currentUser.role)) {
            throw new ForbiddenException(
                'Apenas administradores podem cadastrar membros da equipe',
            );
        }

        const allowedRolesForAdmin = [
            UserRole.STORE,
            UserRole.TECHNICIAN,
            UserRole.BILLING,
        ];

        if (!allowedRolesForAdmin.includes(dto.role)) {
            throw new ForbiddenException(
                'Administradores só podem cadastrar Vendedores, Técnicos ou Faturamento',
            );
        }

        const existingUser = await this.usersRepository.findByEmail(dto.email);
        
        if (existingUser) {
            throw new ConflictException('Email já cadastrado no sistema');
        }

       const passwordHash = await bcrypt.hash(dto.password, 10);

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

    async findById (id: string) {
        return await this.usersRepository.findById(id)
    }

}
