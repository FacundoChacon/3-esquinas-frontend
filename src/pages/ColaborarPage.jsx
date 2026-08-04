/**
 * ColaborarPage.jsx — Formulario de colaboración no monetaria
 *
 * Recopila los datos de la persona que quiere sumarse como voluntario y los
 * envía a POST /api/voluntarios (guardados en la base de datos).
 * Es el destino del QR y del botón de ColaborarSection.
 *
 * Pertenece a: Ruta pública /colaborar
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { voluntarioService } from '../services/apiService'
import { useDarkMode } from '../context/DarkModeContext'
import Footer from '../components/Footer'

const COMO_SE_ENTERO_OPTIONS = [
  { value: 'redes_sociales', label: 'Redes sociales' },
  { value: 'boca_a_boca', label: 'Boca a boca / conocidos' },
  { value: 'evento', label: 'Evento presencial' },
  { value: 'medios', label: 'Medios (radio, TV, diarios)' },
  { value: 'internet', label: 'Internet / búsqueda web' },
  { value: 'otro', label: 'Otro' },
]

const EMPTY_FORM = {
  nombre: '',
  apellido: '',
  dni: '',
  telefono: '',
  email: '',
  fechaNacimiento: '',
  direccion: '',
  empresa: '',
  comoSeEntero: '',
}

export default function ColaborarPage() {
  const { dark, toggle: toggleDark } = useDarkMode()
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await voluntarioService.crear(form)
      setForm(EMPTY_FORM)
      setSent(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message || 'Error al enviar el formulario. Intentá nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${dark ? 'dark bg-gray-950' : 'bg-white'}`}>
      {/* NAVBAR */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <Link to="/" className="landing-nav-logo">
            <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="landing-nav-logo-img" />
            <span className="landing-nav-logo-text">3 Esquinas</span>
          </Link>
          <div className="landing-nav-actions">
            <button onClick={toggleDark} className="landing-nav-dark-toggle" aria-label="Cambiar modo">
              {dark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
            <Link to="/" className="landing-nav-btn-outline">Volver al inicio</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="conocenos-hero">
        <div className="conocenos-hero-inner">
          <h1 className="conocenos-hero-title">Sumate como voluntario</h1>
          <p className="conocenos-hero-subtitle">Colaborá con tu tiempo, tus ganas y tu talento</p>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="landing-colaborar-page">
        <div className="landing-colaborar-page-inner">
          {sent ? (
            <div className="landing-contact-success bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-10">
              <svg className="w-10 h-10 mx-auto mb-3 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="landing-contact-success-text">¡Gracias por sumarte!</p>
              <p className="landing-contact-success-sub">
                Recibimos tus datos. Nos vamos a contactar para coordinar tu participación.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Link to="/" className="landing-nav-btn-outline">Volver al inicio</Link>
                <button onClick={() => setSent(false)} className="landing-colaborar-btn">
                  Cargar otro formulario
                </button>
              </div>
            </div>
          ) : (
            <div className="landing-contact-form-wrapper">
              <h2 className="landing-contact-form-title">Formulario de voluntariado</h2>
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg text-sm mb-3">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="landing-contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input name="nombre" type="text" placeholder="Nombre" value={form.nombre} onChange={handleChange} required className="landing-contact-input" />
                  <input name="apellido" type="text" placeholder="Apellido" value={form.apellido} onChange={handleChange} required className="landing-contact-input" />
                  <input name="dni" type="text" placeholder="DNI" value={form.dni} onChange={handleChange} required className="landing-contact-input" />
                  <input name="telefono" type="tel" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required className="landing-contact-input" />
                  <input name="email" type="email" placeholder="Gmail / email" value={form.email} onChange={handleChange} required className="landing-contact-input" />
                  <input name="fechaNacimiento" type="date" placeholder="Fecha de nacimiento" value={form.fechaNacimiento} onChange={handleChange} required className="landing-contact-input" />
                </div>
                <textarea
                  name="direccion"
                  placeholder="Dirección completa"
                  rows={2}
                  value={form.direccion}
                  onChange={handleChange}
                  required
                  className="landing-contact-textarea"
                />
                <input name="empresa" type="text" placeholder="Empresa (opcional)" value={form.empresa} onChange={handleChange} className="landing-contact-input" />
                <select name="comoSeEntero" value={form.comoSeEntero} onChange={handleChange} required className="landing-contact-input">
                  <option value="" disabled>¿Cómo te enteraste de la organización?</option>
                  {COMO_SE_ENTERO_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <button type="submit" disabled={loading} className="landing-contact-submit">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </span>
                  ) : 'Quiero colaborar'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
