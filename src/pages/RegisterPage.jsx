import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function validateField(name, value) {
  if (!value || !value.trim()) {
    switch (name) {
      case 'nombre': return 'El nombre es obligatorio'
      case 'apellido': return 'El apellido es obligatorio'
      case 'email': return 'El email es obligatorio'
      case 'password': return 'La contraseña es obligatoria'
    }
  }
  if (name === 'nombre' || name === 'apellido') {
    if (!/^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s]+$/.test(value)) {
      return `${name === 'nombre' ? 'El nombre' : 'El apellido'} solo debe contener letras`
    }
  }
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'El email debe ser válido'
  }
  if (name === 'password') {
    if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres'
    if (!/[a-z]/.test(value)) return 'Debe contener al menos una minúscula'
    if (!/[A-Z]/.test(value)) return 'Debe contener al menos una mayúscula'
    if (!/\d/.test(value)) return 'Debe contener al menos un número'
  }
  return ''
}

export default function RegisterPage() {
  const [fields, setFields] = useState({ nombre: '', apellido: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { register } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const allErrors = {}
    let hasError = false
    for (const [key, val] of Object.entries(fields)) {
      const err = validateField(key, val)
      if (err) { allErrors[key] = err; hasError = true }
    }
    setErrors(allErrors)
    setTouched({ nombre: true, apellido: true, email: true, password: true })

    if (hasError) return

    setLoading(true)
    try {
      await register(fields.email, fields.password, fields.nombre, fields.apellido)
      navigate('/')
    } catch (err) {
      setError(err.message || 'No se pudo registrar. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (name) =>
    touched[name] && errors[name] ? 'auth-input error' : 'auth-input'

  const fieldDefs = [
    { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Juan', autoComplete: 'given-name' },
    { name: 'apellido', label: 'Apellido', type: 'text', placeholder: 'Pérez', autoComplete: 'family-name' },
    { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'usuario@ejemplo.com', autoComplete: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Mínimo 8 caracteres', autoComplete: 'new-password' },
  ]

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="auth-logo" />
          <h1 className="auth-title">Crear cuenta</h1>
          <p className="auth-subtitle">Registrarse en el Portal de Donaciones</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fieldDefs.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="auth-field">{f.label}</label>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                value={fields[f.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                className={inputClass(f.name)}
              />
              {touched[f.name] && errors[f.name] && (
                <p className="auth-field-error">{errors[f.name]}</p>
              )}
            </div>
          ))}

          {error && <div className="auth-global-error">{error}</div>}

          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Registrando...
              </>
            ) : (
              'Crear cuenta'
            )}
          </button>
        </form>

        <div className="auth-links">
          <p>¿Ya tenés una cuenta?</p>
          <Link to="/login" className="auth-links-action">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  )
}
