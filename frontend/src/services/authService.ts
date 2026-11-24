import type { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from "../types/auth";
import { api } from "./api";

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('auth/login', credentials)
  return data
}

export async function refreshToken(payload: RefreshTokenRequest): Promise<RefreshTokenResponse> {
  const { data } = await api.post<RefreshTokenResponse>('auth/refreshtoken', payload)
  return data
}

export async function logout(payload:RefreshTokenRequest): Promise<void> {
  await api.post('auth/logout', payload)
}