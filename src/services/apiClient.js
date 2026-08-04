const API_BASE = '/api'

let accessTokenGetter = null
let refreshHandler = null

export function setAccessTokenGetter(fn) {
  accessTokenGetter = fn
}

export function setRefreshHandler(fn) {
  refreshHandler = fn
}

async function doRequest(url, config, retried) {
  const response = await fetch(url, config)

  // El access token expiró: se intenta renovar una vez y se reintenta la petición.
  // Nunca se reintenta en endpoints de auth para evitar recursión infinita
  // (p.ej. un 401 en /auth/refresh).
  if (response.status === 401 && !retried && refreshHandler && !url.includes('/auth/')) {
    const newToken = await refreshHandler()
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${newToken}`,
    }
    return doRequest(url, config, true)
  }

  return response
}

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const token = accessTokenGetter ? accessTokenGetter() : null

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    credentials: 'include',
  }

  const response = await doRequest(url, config, false)

  if (!response.ok) {
    let errorMessage = 'Error del servidor'
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorData.error || errorMessage
    } catch {
      errorMessage = `Error HTTP ${response.status}`
    }
    throw new Error(errorMessage)
  }

  if (response.status === 204) return null
  return await response.json()
}
