import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { AuthUser, LoginRequest } from "../types/auth"
import { clearAuthSession, getAccessToken, getRefreshToken, getUser, setAuthSession } from "../storage/tokenStorage"
import { login as authServiceLogin, logout as authServiceLogout } from "../services/authService"
import { setOnSessionExpired } from "../services/api"

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = getUser()
    const token = getAccessToken()
      
    return storedUser && token ? storedUser : null
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setOnSessionExpired(() => {
      setUser(null)
    })

    return() => {
      setOnSessionExpired(null)
    }
  },[])

  async function login(credentials: LoginRequest): Promise<void> {
    setIsLoading(true)

    try {
      const session = await authServiceLogin(credentials)
      setAuthSession(session)
      setUser(session.user)
    } finally {
      setIsLoading(false)
    }
  }

  async function logout(): Promise<void> {
    setIsLoading(true) 

    try {
      const refreshToken = getRefreshToken()
      if(refreshToken) {
        await authServiceLogout({refreshToken})
      }
    } finally {
      clearAuthSession()
      setUser(null)
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout
      }}
    >
      {children}
  </AuthContext.Provider>)
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}