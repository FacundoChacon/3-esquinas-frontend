/**
 * authService.js — Servicio de autenticación
 * 
 * Maneja todas las llamadas a la API de autenticación del backend.
 * - Login: POST /api/auth/login
 * - Register: POST /api/auth/register
 * - Refresh: POST /api/auth/refresh (requiere refreshToken en body)
 * - Logout: POST /api/auth/logout
 * 
 * El backend retorna un AuthResponse con campos planos (accessToken, refreshToken,
 * email, nombre, rol, usuarioId). Este servicio transforma la respuesta para que
 * el frontend reciba { accessToken, refreshToken, user: { id, email, nombre, rol } }.
 * 
 * Pertenece a: Fase 4 — Frontend Auth
 */

// URL base del backend (en desarrollo usa el proxy de Vite)
const API_BASE = '/api'

/**
 * Función auxiliar para hacer requests al backend.
 * Maneja errores de red y respuestas no exitosas.
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  
  // Configuración por defecto del request
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    // Importante: incluir cookies httpOnly en las requests
    credentials: 'include',
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    // Si la respuesta no es JSON, lanzar error
    if (!response.ok) {
      let errorMessage = 'Error del servidor'
      try {
        // Intentar leer el mensaje de error del backend
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch {
        // Si no se puede parsear el error, usar mensaje genérico
        errorMessage = `Error HTTP ${response.status}`
      }
      throw new Error(errorMessage)
    }

    // Parsear la respuesta exitosa
    return await response.json()
  } catch (error) {
    // Error de red (backend apagado, CORS, etc.)
    if (error.message === 'Failed to fetch') {
      throw new Error('No se pudo conectar con el servidor. Verifique su conexión.')
    }
    throw error
  }
}

/**
 * Transforma la respuesta plana del backend en un objeto con { accessToken, refreshToken, user }.
 * El backend AuthResponse tiene: accessToken, refreshToken, email, nombre, rol, usuarioId
 */
function transformAuthResponse(data) {
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: {
      id: data.usuarioId,
      email: data.email,
      nombre: data.nombre,
      apellido: data.apellido,
      rol: data.rol,
    },
  }
}

/**
 * Servicio de autenticación.
 * Expone las funciones para interactuar con la API de auth.
 */
export const authService = {
  /**
   * Iniciar sesión.
   * @param {string} email - Correo del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<{accessToken: string, refreshToken: string, user: object}>}
   */
  async login(email, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    return transformAuthResponse(data)
  },

  /**
   * Registrar un nuevo usuario.
   * El backend crea el usuario con rol VIEWER por defecto.
   * @param {string} email - Correo del usuario
   * @param {string} password - Contraseña del usuario
   * @param {string} nombre - Nombre
   * @param {string} apellido - Apellido
   * @returns {Promise<{accessToken: string, refreshToken: string, user: object}>}
   */
  async register(email, password, nombre, apellido) {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, nombre, apellido }),
    })
    return transformAuthResponse(data)
  },

  /**
   * Renovar el token de acceso.
   * Envía el refresh token en el body (el backend lo requiere así).
   * @param {string} refreshToken - Refresh token del usuario
   * @returns {Promise<{accessToken: string, refreshToken: string, user: object}|null>}
   */
  async refresh(refreshToken) {
    try {
      const data = await apiRequest('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      })
      return transformAuthResponse(data)
    } catch (error) {
      // 400/401 = refresh token inválido/expirado. Esto es normal
      // cuando el usuario no se ha logueado todavía.
      return null
    }
  },

  /**
   * Cerrar sesión.
   * Revoca el refresh token en el backend.
   * @returns {Promise<void>}
   */
  async logout() {
    return apiRequest('/auth/logout', {
      method: 'POST',
    })
  },
}
