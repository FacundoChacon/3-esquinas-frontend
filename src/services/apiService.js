import { apiRequest } from './apiClient'

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
