/**
 * ProtectedRoute.jsx — Componente de ruta protegida
 * 
 * Protege rutas que requieren autenticación.
 * - Si no hay sesión → llama a checkSession para intentar restaurarla
 * - Si aún no hay sesión → redirige a /login
 * - Si hay sesión → renderiza el componente hijo
 * 
 * Pertenece a: Fase 4 — Frontend Auth
 */
import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Componente que protege rutas privadas.
 * 
 * Uso:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/admin" element={<DashboardPage />} />
 *   </Route>
 */
export default function ProtectedRoute() {
  const { isAuthenticated, checkSession } = useAuth()
  // Estado local: verificando si hay sesión en el backend
  const [checking, setChecking] = useState(!isAuthenticated)

  useEffect(() => {
    // Si ya está autenticado (estado en memoria), no necesita verificar
    if (isAuthenticated) {
      setChecking(false)
      return
    }

    // Si no está autenticado, intentar restaurar sesión desde la cookie
    const verify = async () => {
      await checkSession()
      setChecking(false)
    }
    verify()
  }, [isAuthenticated, checkSession])

  // Mostrar spinner mientras se verifica la sesión
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 mx-auto text-emerald-600" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none" 
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" 
            />
          </svg>
          <p className="mt-4 text-gray-500">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  // Si no está autenticado (ni en memoria ni en el backend), redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Si está autenticado, renderizar la ruta hija
  return <Outlet />
}
