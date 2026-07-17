import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function validateField(name, value) {
  if (!value || !value.trim()) {
    if (name === 'email') return 'El email es obligatorio'
    if (name === 'password') return 'La contraseña es obligatoria'
  }
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'El email debe ser válido'
  }
  return ''
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'email') setEmail(value)
    else setPassword(value)
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const inputClass = (name) => {
    const base = 'w-full px-4 py-3 border rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400'
    if (touched[name] && errors[name]) {
      return `${base} border-red-400 focus:ring-2 focus:ring-red-400 focus:border-red-400`
    }
    return `${base} border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const emailErr = validateField('email', email)
    const passErr = validateField('password', password)
    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr })
      setTouched({ email: true, password: true })
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="w-16 h-16 mx-auto mb-4 rounded-xl object-contain" />
          <h1 className="text-2xl font-bold text-gray-900">3 Esquinas</h1>
          <p className="text-gray-500 text-sm mt-1">Portal de Donaciones</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="email"
              placeholder="usuario@ejemplo.com"
              className={inputClass('email')}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className={inputClass('password')}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
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

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>¿No tenés una cuenta?</p>
          <Link to="/register" className="mt-2 inline-block text-emerald-600 hover:text-emerald-700 font-medium">Crear cuenta</Link>
          <p className="mt-3 text-xs text-gray-400">3 Esquinas — Maipú, Mendoza</p>
        </div>
      </div>
    </div>
  )
}
