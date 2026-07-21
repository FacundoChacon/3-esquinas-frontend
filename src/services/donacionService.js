const API_BASE = '/api'

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const config = {
    headers: { 'Content-Type': 'application/json' },
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

  return await response.json()
}

export const donacionService = {
  async crearTransferencia(data) {
    return apiRequest('/donaciones/transferencia', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async crearMercadoPago(data) {
    return apiRequest('/donaciones/mercadopago', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async crearPayPal(data) {
    return apiRequest('/donaciones/paypal', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}
