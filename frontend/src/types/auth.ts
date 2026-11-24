
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'STORE' | 'TECHNICIAN' | 'BILLING'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse extends TokenPair {
  user: AuthUser
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export type RefreshTokenResponse = TokenPair
