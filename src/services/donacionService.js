import { apiRequest } from './apiClient'

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
