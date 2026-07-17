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

  const inputClass = (name) =>
    touched[name] && errors[name] ? 'auth-input error' : 'auth-input'

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
      const result = await login(email, password)
      navigate(result.user?.rol === 'ADMIN' ? '/admin' : '/')
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="auth-logo" />
          <h1 className="auth-title">3 Esquinas</h1>
          <p className="auth-subtitle">Portal de Donaciones</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label htmlFor="email" className="auth-field">Correo electrónico</label>
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
              <p className="auth-field-error">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="auth-field">Contraseña</label>
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
              <p className="auth-field-error">{errors.password}</p>
            )}
          </div>

          {error && <div className="auth-global-error">{error}</div>}

          <button type="submit" disabled={loading} className="auth-submit">
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

        <div className="auth-links">
          <p>¿No tenés una cuenta?</p>
          <Link to="/register" className="auth-links-action">Crear cuenta</Link>
          <p className="auth-links-location">3 Esquinas — Maipú, Mendoza</p>
        </div>
      </div>
    </div>
  )
}
