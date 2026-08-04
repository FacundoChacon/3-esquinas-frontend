import { apiRequest } from './apiClient'

export const donacionService = {
  listar(page = 0, size = 10) {
    return apiRequest(`/donaciones?page=${page}&size=${size}`)
  },

  confirmar(id) {
    return apiRequest(`/donaciones/${id}/confirmar`, { method: 'PATCH' })
  },

  marcarFallida(id) {
    return apiRequest(`/donaciones/${id}/fallida`, { method: 'PATCH' })
  },

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
