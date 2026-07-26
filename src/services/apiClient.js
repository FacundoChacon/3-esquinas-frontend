const API_BASE = '/api'

let accessTokenGetter = null

export function setAccessTokenGetter(fn) {
  accessTokenGetter = fn
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

  const response = await fetch(url, config)

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
