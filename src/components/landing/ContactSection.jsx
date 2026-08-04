import { useState } from 'react'
import { contactService } from '../../services/apiService'

export default function ContactSection() {
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [contactLoading, setContactLoading] = useState(false)
  const [contactError, setContactError] = useState('')
  const [contactSent, setContactSent] = useState(false)

  const handleContact = async (e) => {
    e.preventDefault()
    setContactLoading(true)
    setContactError('')
    try {
      await contactService.enviar(contactForm)
      setContactForm({ nombre: '', email: '', mensaje: '' })
      setContactSent(true)
      setTimeout(() => setContactSent(false), 3000)
    } catch (err) {
      setContactError(err.message || 'Error al enviar el mensaje. Intentá nuevamente.')
    } finally {
      setContactLoading(false)
    }
  }

  return (
    <section id="contacto" className="landing-contact">
      <div className="landing-contact-inner">
        <div className="landing-contact-layout">
          <div className="landing-contact-info">
            <h2 className="landing-contact-title">Contactanos</h2>
            <div className="landing-contact-divider" />
            <p className="landing-contact-desc">
              Si tenés preguntas, querés sumarte como voluntario, proponer un proyecto o simplemente
              saludarnos, nos encantaría escucharte. Cada mensaje es una oportunidad para fortalecer
              nuestra comunidad.
            </p>

            <div className="landing-contact-channels">
              <div className="landing-contact-channel">
                <div className="landing-contact-channel-icon">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <span className="landing-contact-channel-label">Email</span>
                  <span className="landing-contact-channel-value">tresesquinasfundacion@gmail.com</span>
                </div>
              </div>

              <div className="landing-contact-channel">
                <div className="landing-contact-channel-icon">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <span className="landing-contact-channel-label">Ubicación</span>
                  <span className="landing-contact-channel-value">Maipú, Mendoza — Argentina</span>
                </div>
              </div>

              <div className="landing-contact-channel">
                <div className="landing-contact-channel-icon">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="landing-contact-channel-label">Horario</span>
                  <span className="landing-contact-channel-value">Lunes a Viernes — 9 a 17 hs</span>
                </div>
              </div>
            </div>

            <div className="landing-contact-socials">
              <span className="landing-contact-socials-label">Seguinos en redes</span>
              <div className="landing-contact-socials-links">
                <a href="https://x.com/3esqfundacion" target="_blank" rel="noopener noreferrer" className="landing-contact-social-link">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X
                </a>
                <a href="https://instagram.com/Tresesquinasfundacion" target="_blank" rel="noopener noreferrer" className="landing-contact-social-link">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  Instagram
                </a>
                <a href="https://youtube.com/@FundacionTresEsquinas" target="_blank" rel="noopener noreferrer" className="landing-contact-social-link">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube
                </a>
                <a href="mailto:tresesquinasfundacion@gmail.com" className="landing-contact-social-link">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Gmail
                </a>
              </div>
            </div>
          </div>

          <div className="landing-contact-form-wrapper">
            {contactSent ? (
              <div className="landing-contact-success">
                <svg className="w-8 h-8 mx-auto mb-2 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="landing-contact-success-text">
                  Mensaje enviado correctamente. ¡Gracias por contactarnos!
                </p>
                <p className="landing-contact-success-sub">
                  Te responderemos a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContact} className="landing-contact-form">
                <h3 className="landing-contact-form-title">Envianos tu mensaje</h3>
                {contactError && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg text-sm">{contactError}</div>}
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={contactForm.nombre}
                  onChange={(e) => setContactForm((p) => ({ ...p, nombre: e.target.value }))}
                  required
                  className="landing-contact-input"
                />
                <input
                  type="email"
                  placeholder="Tu email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                  required
                  className="landing-contact-input"
                />
                <textarea
                  placeholder="Contanos en qué podemos ayudarte..."
                  rows={5}
                  value={contactForm.mensaje}
                  onChange={(e) => setContactForm((p) => ({ ...p, mensaje: e.target.value }))}
                  required
                  className="landing-contact-textarea"
                />
                <button type="submit" disabled={contactLoading} className="landing-contact-submit">
                  {contactLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Enviando...
                    </span>
                  ) : 'Enviar mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
