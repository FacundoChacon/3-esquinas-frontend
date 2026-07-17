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

  const inputClass = (name) => {
    const base = 'w-full px-4 py-3 border rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400'
    if (touched[name] && errors[name]) {
      return `${base} border-red-400 focus:ring-2 focus:ring-red-400 focus:border-red-400`
    }
    return `${base} border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`
  }

  const fieldDefs = [
    { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Juan', autoComplete: 'given-name' },
    { name: 'apellido', label: 'Apellido', type: 'text', placeholder: 'Pérez', autoComplete: 'family-name' },
    { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'usuario@ejemplo.com', autoComplete: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Mínimo 8 caracteres', autoComplete: 'new-password' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="w-16 h-16 mx-auto mb-4 rounded-xl object-contain" />
          <h1 className="text-2xl font-bold text-gray-900">Crear cuenta</h1>
          <p className="text-gray-500 text-sm mt-1">Registrarse en el Portal de Donaciones</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fieldDefs.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
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
                <p className="text-red-500 text-xs mt-1">{errors[f.name]}</p>
              )}
            </div>
          ))}

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
                Registrando...
              </>
            ) : (
              'Crear cuenta'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>¿Ya tenés una cuenta?</p>
          <Link to="/login" className="mt-2 inline-block text-emerald-600 hover:text-emerald-700 font-medium">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  )
}
