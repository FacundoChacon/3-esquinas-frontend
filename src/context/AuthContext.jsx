/**
 * AuthContext.jsx — Context de autenticación
 * 
 * Administra el estado de autenticación de toda la aplicación.
 * - Guarda el usuario actual, tokens (access + refresh) en memoria
 * - Provee funciones login/logout/refresh/checkSession
 * - NO llama al backend al cargar (evita el 400 de "no hay sesión")
 * 
 * Pertenece a: Fase 4 — Frontend Auth
 */
import { createContext, useContext, useState, useCallback } from 'react'
import { authService } from '../services/authService'

// Crear el context (valor por defecto undefined)
const AuthContext = createContext(null)

/**
 * Provider de autenticación.
 * Envuelve toda la app y provee el estado de auth.
 */
export function AuthProvider({ children }) {
  // Estado del usuario actual (null = no autenticado)
  const [user, setUser] = useState(null)
  // Token de acceso (se guarda en memoria, no en localStorage por seguridad)
  const [accessToken, setAccessToken] = useState(null)
  // Refresh token (se guarda en memoria para enviarlo en POST /api/auth/refresh)
  const [refreshToken, setRefreshToken] = useState(null)

  /**
   * Guarda tokens y usuario en el estado.
   * Helper interno para no repetir lógica.
   */
  const saveAuth = useCallback((data) => {
    setAccessToken(data.accessToken)
    setRefreshToken(data.refreshToken)
    setUser(data.user)
  }, [])

  const clearAuth = useCallback(() => {
    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)
  }, [])

  /**
   * Verificar si hay una sesión activa.
   * Se llama manualmente desde ProtectedRoute cuando el usuario
   * intenta acceder a una ruta privada sin estado en memoria.
   * Usa el refresh token para obtener un nuevo access token.
   */
  const checkSession = useCallback(async () => {
    if (!refreshToken) return false
    try {
      const data = await authService.refresh(refreshToken)
      if (data) {
        saveAuth(data)
        return true
      }
      clearAuth()
      return false
    } catch {
      clearAuth()
      return false
    }
  }, [refreshToken, saveAuth, clearAuth])

  /**
   * Función de login.
   * Llama al backend, guarda el token y el usuario.
   */
  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password)
    saveAuth(data)
    return data
  }, [saveAuth])

  /**
   * Función de logout.
   * Llama al backend para revocar el refresh token
   * y limpia el estado local.
   */
  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch {
      // Ignorar errores del logout
    } finally {
      clearAuth()
    }
  }, [clearAuth])

  /**
   * Función para refrescar el token de acceso.
   * Se llama cuando el access token está por expirar.
   */
  const refresh = useCallback(async () => {
    if (!refreshToken) {
      clearAuth()
      throw new Error('Sesión expirada')
    }
    try {
      const data = await authService.refresh(refreshToken)
      if (!data) {
        clearAuth()
        throw new Error('Sesión expirada')
      }
      saveAuth(data)
      return data.accessToken
    } catch {
      clearAuth()
      throw new Error('Sesión expirada')
    }
  }, [refreshToken, saveAuth, clearAuth])

  // Valores que se proveen a toda la app
  const value = {
    user,           // Usuario actual (null si no hay sesión)
    accessToken,    // Token de acceso JWT
    isAuthenticated: !!user,  // true si hay usuario logueado
    checkSession,   // Verificar si hay sesión activa (llamado por ProtectedRoute)
    login,          // Función para iniciar sesión
    logout,         // Función para cerrar sesión
    refresh,        // Función para renovar el token
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook personalizado para usar el context de autenticación.
 * Debe usarse dentro de un <AuthProvider>.
 * 
 * Ejemplo:
 *   const { user, login, logout } = useAuth()
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>')
  }
  return context
}
