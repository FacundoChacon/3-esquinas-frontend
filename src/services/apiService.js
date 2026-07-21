/**
 * apiService.js — Servicio de comunicación con la API del backend
 *
 * Centraliza todas las llamadas HTTP a los endpoints del backend.
 * Usa el access token del AuthContext para las requests autenticadas.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */

const API_BASE = '/api'

let accessTokenGetter = null

export function setAccessTokenGetter(fn) {
  accessTokenGetter = fn
}

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const token = accessTokenGetter ? accessTokenGetter() : null

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
    ...options,
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

export const dashboardService = {
  getKpis() {
    return apiRequest('/dashboard/kpis')
  },
  getIngresos() {
    return apiRequest('/dashboard/ingresos')
  },
  getDonantes(page = 0, size = 10) {
    return apiRequest(`/dashboard/donantes?page=${page}&size=${size}`)
  },
  getCupones(page = 0, size = 10) {
    return apiRequest(`/dashboard/cupones?page=${page}&size=${size}`)
  },
}

export const datosService = {
  getAll(page = 0, size = 20) {
    return apiRequest(`/datos?page=${page}&size=${size}`)
  },
  getByCategoria(categoria) {
    return apiRequest(`/datos/categoria/${encodeURIComponent(categoria)}`)
  },
  getById(id) {
    return apiRequest(`/datos/${id}`)
  },
  crear(data) {
    return apiRequest('/datos', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  actualizar(id, data) {
    return apiRequest(`/datos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  eliminar(id) {
    return apiRequest(`/datos/${id}`, { method: 'DELETE' })
  },
}

export const donacionesService = {
  getHistorial(page = 0, size = 20) {
    return apiRequest(`/donaciones?page=${page}&size=${size}`)
  },
  getDetalle(id) {
    return apiRequest(`/donaciones/${id}`)
  },
}
