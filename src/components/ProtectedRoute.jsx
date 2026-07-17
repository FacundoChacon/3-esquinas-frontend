/**
 * ProtectedRoute.jsx — Componente de ruta protegida
 *
 * Protege rutas que requieren autenticación y opcionalmente roles específicos.
 * - Si no hay sesión → llama a checkSession para intentar restaurarla
 * - Si aún no hay sesión → redirige a /login
 * - Si no tiene el rol requerido → redirige a /admin
 * - Si está autorizado → renderiza el componente hijo
 *
 * Pertenece a: Fase 5 — Control de acceso por roles
 */
import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Componente que protege rutas privadas con auth + roles.
 *
 * Uso:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/admin" element={<DashboardPage />} />
 *   </Route>
 *
 *   <Route element={<ProtectedRoute roles={['ADMIN', 'EDITOR']} />}>
 *     <Route path="/admin/datos" element={<DatosPage />} />
 *   </Route>
 */
export default function ProtectedRoute({ roles }) {
  const { isAuthenticated, user, checkSession } = useAuth()
  const [checking, setChecking] = useState(!isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      setChecking(false)
      return
    }
    const verify = async () => {
      await checkSession()
      setChecking(false)
    }
    verify()
  }, [isAuthenticated, checkSession])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 mx-auto text-emerald-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="mt-4 text-gray-500">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(user?.rol)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
