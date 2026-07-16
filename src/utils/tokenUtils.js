/**
 * tokenUtils.js — Utilidades de manejo de tokens JWT
 * 
 * Funciones para decodificar y validar tokens JWT.
 * El access token se guarda en memoria (no en localStorage)
 * por seguridad. El refresh token viene en httpOnly cookie.
 * 
 * Pertenece a: Fase 4 — Frontend Auth
 */

/**
 * Decodifica un JWT sin validarlo (solo para leer el payload).
 * No verifica la firma — eso lo hace el backend.
 * 
 * @param {string} token - Token JWT a decodificar
 * @returns {object|null} - Payload decodificado o null si es inválido
 */
export function decodeToken(token) {
  try {
    // Un JWT tiene 3 partes separadas por puntos
    const parts = token.split('.')
    if (parts.length !== 3) return null

    // Decodificar el payload (segunda parte)
    // atob() decodifica base64, y el payload es JSON
    const payload = JSON.parse(atob(parts[1]))
    return payload
  } catch {
    // Si hay error al decodificar, el token es inválido
    return null
  }
}

/**
 * Verifica si un token ha expirado.
 * 
 * @param {string} token - Token JWT a verificar
 * @returns {boolean} - true si el token expiró o es inválido
 */
export function isTokenExpired(token) {
  const payload = decodeToken(token)
  if (!payload || !payload.exp) return true

  // 'exp' viene en segundos, Date.now() en milisegundos
  const expirationMs = payload.exp * 1000
  return Date.now() >= expirationMs
}

/**
 * Calcula cuánto falta para que el token expire.
 * Útil para programar un refresh automático.
 * 
 * @param {string} token - Token JWT
 * @returns {number} - Milisegundos hasta la expiración (0 si ya expiró)
 */
export function getTimeUntilExpiration(token) {
  const payload = decodeToken(token)
  if (!payload || !payload.exp) return 0

  const expirationMs = payload.exp * 1000
  const remaining = expirationMs - Date.now()
  return Math.max(0, remaining)
}

/**
 * Extrae el rol del usuario desde el token JWT.
 * El backend guarda el rol en el claim 'role'.
 * 
 * @param {string} token - Token JWT
 * @returns {string|null} - Rol del usuario (ADMIN, EDITOR, VIEWER) o null
 */
export function getUserRole(token) {
  const payload = decodeToken(token)
  return payload?.role || null
}

/**
 * Extrae el email del usuario desde el token JWT.
 * 
 * @param {string} token - Token JWT
 * @returns {string|null} - Email del usuario o null
 */
export function getUserEmail(token) {
  const payload = decodeToken(token)
  return payload?.sub || null
}

/**
 * Hook personalizado para programar el refresh automático del token.
 * Renueva el token 1 minuto antes de que expire.
 * 
 * Uso:
 *   useTokenRefresh(accessToken, refreshFn)
 */
export function useTokenRefresh(accessToken, refreshFn) {
  // Importar useEffect y useRef en el componente que use esto
  // Este es un ejemplo de cómo se usaría:
  //
  // useEffect(() => {
  //   if (!accessToken) return
  //   
  //   const timeLeft = getTimeUntilExpiration(accessToken)
  //   const refreshBefore = 60 * 1000 // 1 minuto antes
  //   
  //   if (timeLeft <= refreshBefore) {
  //     // Ya casi expira, renovar ahora
  //     refreshFn()
  //     return
  //   }
  //   
  //   // Programar el refresh automático
  //   const timeout = setTimeout(() => {
  //     refreshFn()
  //   }, timeLeft - refreshBefore)
  //   
  //   return () => clearTimeout(timeout)
  // }, [accessToken, refreshFn])
}
