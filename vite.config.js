/**
 * Configuración de Vite para el frontend de 3 Esquinas.
 * - React para el framework de UI
 * - Tailwind CSS v4 para estilos via plugin de Vite
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Proxy para evitar problemas de CORS durante desarrollo
    // Redirige las llamadas al backend en el puerto 8081
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
})
