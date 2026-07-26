import { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

function getStoredRefreshToken() {
  try { return sessionStorage.getItem('3eq-refresh') } catch { return null }
}

function setStoredRefreshToken(token) {
  try { token ? sessionStorage.setItem('3eq-refresh', token) : sessionStorage.removeItem('3eq-refresh') } catch {}
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(() => getStoredRefreshToken())
  const refreshMutex = useRef(null)

  const saveAuth = useCallback((data) => {
    setAccessToken(data.accessToken)
    setRefreshToken(data.refreshToken)
    setStoredRefreshToken(data.refreshToken)
    setUser(data.user)
  }, [])

  const clearAuth = useCallback(() => {
    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)
    setStoredRefreshToken(null)
  }, [])

  const checkSession = useCallback(async () => {
    const token = getStoredRefreshToken() || refreshToken
    if (!token) return false
    if (refreshMutex.current) return refreshMutex.current
    refreshMutex.current = (async () => {
      try {
        const data = await authService.refresh(token)
        if (data) { saveAuth(data); return true }
        clearAuth(); return false
      } catch { clearAuth(); return false }
      finally { refreshMutex.current = null }
    })()
    return refreshMutex.current
  }, [refreshToken, saveAuth, clearAuth])

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password)
    saveAuth(data)
    return data
  }, [saveAuth])

  const register = useCallback(async (email, password, nombre, apellido) => {
    const data = await authService.register(email, password, nombre, apellido)
    saveAuth(data)
    return data
  }, [saveAuth])

  const logout = useCallback(async () => {
    try { await authService.logout() } catch {} finally { clearAuth() }
  }, [clearAuth])

  const refresh = useCallback(async () => {
    const token = getStoredRefreshToken() || refreshToken
    if (!token) { clearAuth(); throw new Error('Sesión expirada') }
    try {
      const data = await authService.refresh(token)
      if (!data) { clearAuth(); throw new Error('Sesión expirada') }
      saveAuth(data)
      return data.accessToken
    } catch {
      clearAuth()
      throw new Error('Sesión expirada')
    }
  }, [refreshToken, saveAuth, clearAuth])

  const value = useMemo(() => ({
    user, accessToken, isAuthenticated: !!user,
    checkSession, login, register, logout, refresh,
  }), [user, accessToken, checkSession, login, register, logout, refresh])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de un <AuthProvider>')
  return context
}
