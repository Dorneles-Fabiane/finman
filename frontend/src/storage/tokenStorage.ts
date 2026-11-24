import type {  AuthUser, LoginResponse, TokenPair } from "../types/auth";

const ACCESS_TOKEN_KEY = '@finman:token'
const REFRESH_TOKEN_KEY = '@finman:refreshToken'
const USER_KEY = '@finman:user'

export function setAuthStorage(tokens: TokenPair) {
  const { accessToken, refreshToken } = tokens

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function setAuthSession(session: LoginResponse) {
  setAuthStorage({
    accessToken: session.accessToken,
    refreshToken: session.refreshToken
  })
  localStorage.setItem(USER_KEY, JSON.stringify(session.user))
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function getUser(): AuthUser | null {
  const rawUser = localStorage.getItem(USER_KEY)
  if(!rawUser) return null

  try {
    return JSON.parse(rawUser) as AuthUser
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export function clearAuthSession(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
