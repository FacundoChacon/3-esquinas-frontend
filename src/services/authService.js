import { apiRequest } from './apiClient'

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

export const authService = {
  async login(email, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    return transformAuthResponse(data)
  },

  async register(email, password, nombre, apellido) {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, nombre, apellido }),
    })
    return transformAuthResponse(data)
  },

  async refresh(refreshToken) {
    try {
      const data = await apiRequest('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      })
      return transformAuthResponse(data)
    } catch {
      return null
    }
  },

  async logout() {
    return apiRequest('/auth/logout', {
      method: 'POST',
    })
  },
}
