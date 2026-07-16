/**
 * LoginPage.jsx — Página de inicio de sesión
 * 
 * Formulario que permite a los usuarios autenticarse en el sistema.
 * - Email + contraseña
 * - Muestra errores del backend
 * - Redirige al dashboard después del login exitoso
 * 
 * Pertenece a: Fase 4 — Frontend Auth
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  // Estado del formulario
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Hook de navegación para redirigir después del login
  const navigate = useNavigate()

  // Context de autenticación para llamar al login
  const { login } = useAuth()

  /**
   * Maneja el envío del formulario de login.
   * Llama al servicio de auth y redirige al dashboard si es exitoso.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Llamar al servicio de login del backend
      await login(email, password)
      // Redirigir al dashboard después del login exitoso
      navigate('/admin')
    } catch (err) {
      // Mostrar error del backend o mensaje genérico
      setError(err.message || 'Credenciales incorrectas. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 px-4">
      {/* Contenedor del formulario de login */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Logo y título */}
        <div className="text-center mb-8">
          <img 
            src="/images/logo-3esquinas.png" 
            alt="3 Esquinas" 
            className="w-16 h-16 mx-auto mb-4 rounded-xl object-contain"
          />
          <h1 className="text-2xl font-bold text-gray-900">3 Esquinas</h1>
          <p className="text-gray-500 text-sm mt-1">Portal de Donaciones</p>
        </div>

        {/* Formulario de login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Campo de email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="usuario@ejemplo.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Campo de contraseña */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                {/* Spinner de carga */}
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Ingresando...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        {/* Footer del formulario */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Sistema de gestión de donaciones</p>
          <p className="mt-1">3 Esquinas — Maipú, Mendoza</p>
        </div>
      </div>
    </div>
  )
}
