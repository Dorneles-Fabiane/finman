import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRole } from "../entities/user.entity.js";


export class CreateUserDto{
  @IsNotEmpty({ message: 'O nome é obrigatório'})
  @IsString({ message: 'O nome deve ser um texto válido'})
  name: string

  @IsNotEmpty({ message: 'O email é obrigatório'})
  @IsEmail({}, { message: 'Informe um e-mail válido'})
  email: string

  @IsNotEmpty({ message: 'A senha é obrigatório'})
  @IsString()
  @MinLength(6, {message: 'A senha deve ter no minimo 6 caracteres'})
  password: string

  @IsNotEmpty({ message: 'O cargo (role) é obrigatório'})
  @IsEnum(UserRole, { message: 'Cargo inválido' })
  role: UserRole
}