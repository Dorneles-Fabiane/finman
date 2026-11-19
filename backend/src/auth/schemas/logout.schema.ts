import * as z from 'zod'

export const logoutSchema = z.object({
  refreshToken: z.string()
})

export type LogoutDto = z.infer<typeof logoutSchema>