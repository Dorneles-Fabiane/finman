import * as z from 'zod';

export const createRefreshTokenSchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de usuário inválido'),
  refreshToken: z.string().min(1, 'Refresh token é obrigatório'),
  expiresIn: z.coerce.date()
});

export type CreateRefreshTokenDto = z.infer<typeof createRefreshTokenSchema>;

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token é obrigatório'),
});

export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;