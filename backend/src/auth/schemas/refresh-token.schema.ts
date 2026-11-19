import * as z from 'zod';

export const createRefreshTokenSchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de usuário inválido'),
  refreshToken: z.string().min(1, 'Refresh token é obrigatório'),
  ttl: z.coerce.date(),
});

export type CreateRefreshTokenDto = z.infer<typeof createRefreshTokenSchema>;