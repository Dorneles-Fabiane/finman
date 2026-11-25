import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { clearAuthSession, getAccessToken, getRefreshToken, setAuthStorage } from '../storage/tokenStorage';
import type { TokenPair } from '../types/auth';

const baseURL = import.meta.env.VITE_API_URL

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

interface QueuedRequest {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}

export const api = axios.create({
  baseURL: baseURL
})

let onSessionExpired: (() => void) | null = null

export function setOnSessionExpired(handler: (() => void) | null) {
  onSessionExpired = handler
}

let isRefreshing = false
let failedQueue: QueuedRequest[] = []

function processQueue(error: unknown, token: string | null): void {
  failedQueue.forEach((request) => {
    if(error) {
      request.reject(error)
    } else if(token) {
      request.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()

  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined
    const status = error.response?.status
    const url = originalRequest?.url ?? ''

    const isAuthRoute =
      url.includes('auth/login') ||
      url.includes('auth/refreshtoken') ||
      url.includes('auth/logout')

    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthRoute
    ) {
      return Promise.reject(error)
    }

    if(isRefreshing) {
      return new Promise((resolve, reject) =>
        failedQueue.push({
          resolve: (newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            resolve(api(originalRequest))
          },
          reject
        })
      )
    }

    originalRequest._retry = true
    isRefreshing = true

    const currentRefreshToken = getRefreshToken()

    if (!currentRefreshToken) {
      isRefreshing = false
      processQueue(error, null)
      clearAuthSession()
      onSessionExpired?.()
      return Promise.reject(error)
    }

    try {
      const { data } = await axios.post<TokenPair>(
        `${baseURL}/auth/refreshtoken`,
        { refreshToken: currentRefreshToken }
      )

      setAuthStorage(data)
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
      processQueue(null, data.accessToken)

      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      clearAuthSession()
      onSessionExpired?.()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)