import * as z from 'zod'
import { UserRole } from '../entities/user.entity.js';

export const createUserSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  role: z.enum(UserRole), 
  active: z.boolean().default(true),
});

export type CreateUserDto = z.infer<typeof createUserSchema>