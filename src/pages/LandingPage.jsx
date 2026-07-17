import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDarkMode } from '../context/DarkModeContext'

const ODS_LIST = [
  { id: 1, color: '#E5243B', label: 'Fin de la pobreza', desc: 'Promovemos inclusión socioeconómica mediante talleres de oficios y acceso a recursos básicos para familias de Maipú.' },
  { id: 2, color: '#DDA63A', label: 'Hambre cero', desc: 'Impulsamos huertas comunitarias y campañas de alimentación saludable para garantizar nutrición en sectores vulnerables.' },
  { id: 3, color: '#4C9F38', label: 'Salud y bienestar', desc: 'Organizamos jornadas de salud preventiva, talleres de bienestar y acompañamiento a adultos mayores.' },
  { id: 4, color: '#C5192D', label: 'Educación de calidad', desc: 'Brindamos apoyo escolar, becas educativas y espacios de aprendizaje para niños y jóvenes de Mendoza.' },
  { id: 5, color: '#FF3A21', label: 'Igualdad de género', desc: 'Desarrollamos programas de empoderamiento femenino y promovemos la equidad de género en nuestra comunidad.' },
  { id: 6, color: '#26BDE2', label: 'Agua limpia y saneamiento', desc: 'Realizamos campañas de concientización sobre uso responsable del agua y acceso a saneamiento básico.' },
  { id: 7, color: '#FCC30B', label: 'Energía asequible y no contaminante', desc: 'Fomentamos el uso de energías renovables y la eficiencia energética en hogares e instituciones locales.' },
  { id: 8, color: '#A21942', label: 'Trabajo decente y crecimiento económico', desc: 'Capacitamos en emprendedurismo y vinculamos con oportunidades laborales para el desarrollo económico local.' },
  { id: 9, color: '#FD6925', label: 'Industria, innovación e infraestructura', desc: 'Apoyamos proyectos de innovación social y mejoramos infraestructura comunitaria en Maipú.' },
  { id: 10, color: '#DD1367', label: 'Reducción de las desigualdades', desc: 'Trabajamos para reducir brechas sociales garantizando igualdad de oportunidades a todos los sectores.' },
  { id: 11, color: '#FD9D24', label: 'Ciudades y comunidades sostenibles', desc: 'Promovemos espacios públicos inclusivos, seguros y sostenibles en los barrios de Maipú.' },
  { id: 12, color: '#BF8B2E', label: 'Producción y consumo responsables', desc: 'Impulsamos prácticas de consumo responsable, reciclaje y economía circular en la comunidad.' },
  { id: 13, color: '#3F7E44', label: 'Acción por el clima', desc: 'Realizamos forestación, jornadas de limpieza y educación ambiental para mitigar el cambio climático.' },
  { id: 14, color: '#0A97D9', label: 'Vida submarina', desc: 'Cuidamos nuestros recursos hídricos y promovemos la preservación de ecosistemas acuáticos locales.' },
  { id: 15, color: '#56C02B', label: 'Vida de ecosistemas terrestres', desc: 'Protegemos la biodiversidad local mediante reforestación y conservación de espacios naturales.' },
  { id: 16, color: '#00689D', label: 'Paz, justicia e instituciones sólidas', desc: 'Fomentamos la participación ciudadana, la transparencia y el acceso a la justicia en nuestra comunidad.' },
  { id: 17, color: '#19486A', label: 'Alianzas para lograr los objetivos', desc: 'Articulamos con organizaciones públicas, privadas y sociales para potenciar el impacto de nuestras acciones.' },
]

function ODSFlipCard({ ods, flipped, onToggle, dark }) {
  return (
    <div className="landing-ods-card" onClick={onToggle}>
      <div
        className={`landing-ods-card-inner ${flipped ? 'flipped' : ''}`}
      >
        <div className="landing-ods-card-front" style={{ backgroundColor: ods.color }}>
          <div className="landing-ods-card-number">{String(ods.id).padStart(2, '0')}</div>
          <div className="landing-ods-card-photo">
            <svg className="w-10 h-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
          <div className="landing-ods-card-label">{ods.label}</div>
          <p className="landing-ods-card-desc">{ods.desc}</p>
        </div>
        <div className={`landing-ods-card-back ${dark ? 'dark' : ''}`}>
          <div className="landing-ods-card-back-ods">ODS {String(ods.id).padStart(2, '0')}</div>
          <div className="landing-ods-card-back-title">{ods.label}</div>
          <p className="landing-ods-card-back-desc">Próximamente conocerás cómo trabajamos en este objetivo desde 3 Esquinas.</p>
          <div className="landing-ods-card-back-hint">Tocar para voltear</div>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const { dark, toggle: toggleDark } = useDarkMode()
  const [flippedODS, setFlippedODS] = useState([])
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [contactSent, setContactSent] = useState(false)
  const carouselRef = useRef(null)

  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    let rafId = null

    const updateCards = () => {
      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth
      const containerCenter = scrollLeft + containerWidth / 2
      const cards = Array.from(container.children)

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(containerCenter - cardCenter)
        const cardWidth = card.offsetWidth
        const ratio = distance / cardWidth

        let scale, opacity
        if (ratio < 0.35) {
          scale = 1
          opacity = 1
        } else if (ratio < 1.3) {
          scale = 0.82
          opacity = 0.5
        } else {
          scale = 0.7
          opacity = 0.25
        }

        card.style.transform = `scale(${scale})`
        card.style.opacity = opacity
      })
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateCards)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    updateCards()

    return () => {
      container.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const toggleODS = (id) => {
    setFlippedODS((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  }

  const handleODSClick = (id, index) => {
    const container = carouselRef.current
    if (!container) return
    const card = container.children[index]
    if (!card) return
    const containerCenter = container.scrollLeft + container.clientWidth / 2
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const distance = Math.abs(containerCenter - cardCenter)

    if (distance < card.offsetWidth * 0.35) {
      toggleODS(id)
    } else {
      const scrollTarget = card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2
      container.scrollTo({ left: scrollTarget, behavior: 'smooth' })
    }
  }

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return
    const scrollAmount = 310
    carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  const handleContact = (e) => {
    e.preventDefault()
    setContactSent(true)
    setContactForm({ nombre: '', email: '', mensaje: '' })
    setTimeout(() => setContactSent(false), 3000)
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const NAV_ITEMS = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'institucional', label: 'Institucional' },
    { id: 'ods', label: 'ODS' },
    { id: 'contacto', label: 'Contacto' },
  ]

  return (
    <div className={`min-h-screen ${dark ? 'dark bg-gray-950' : 'bg-white'}`}>

      {/* ===== NAVBAR ===== */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <button onClick={() => scrollTo('inicio')} className="landing-nav-logo">
            <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="landing-nav-logo-img" />
            <span className="landing-nav-logo-text">3 Esquinas</span>
          </button>

          <div className="landing-nav-links">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="landing-nav-link">
                {item.label}
              </button>
            ))}
          </div>

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
            {isAuthenticated ? (
              user?.rol === 'ADMIN' ? (
                <Link to="/admin" className="landing-nav-btn-outline">Admin</Link>
              ) : (
                <button onClick={logout} className="landing-nav-btn-outline">Cerrar sesión</button>
              )
            ) : (
              <Link to="/login" className="landing-nav-btn-outline">Iniciar sesión</Link>
            )}
            <button onClick={() => scrollTo('donar')} className="landing-nav-btn-primary">
              Donar
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section id="inicio" className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-hero-text-block">
            <div className="landing-hero-tag">
              <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="landing-hero-tag-img" />
              <span className="landing-hero-tag-text">3 Esquinas</span>
            </div>
            <h1 className="landing-hero-title">
              Construyendo un futuro sostenible desde Maipú, Mendoza
            </h1>
            <p className="landing-hero-desc">
              Somos una organización comprometida con los 17 Objetivos de Desarrollo Sostenible de la ONU.
              Trabajamos para generar impacto social, económico y ambiental en nuestra comunidad.
            </p>
            <div className="landing-hero-actions">
              <button onClick={() => scrollTo('institucional')} className="landing-hero-btn-primary">
                Conocé más
              </button>
              <button onClick={() => scrollTo('contacto')} className="landing-hero-btn-outline">
                Contactanos
              </button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-sm">
            {/* Placeholder para foto institucional — reemplazar con imagen real */}
            <div className="landing-hero-image-placeholder">
              <svg className="landing-hero-image-placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
              <span className="landing-hero-image-placeholder-text">Foto institucional</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUIENES SOMOS ===== */}
      <section id="institucional" className="landing-about">
        <div className="landing-about-inner">
          <h2 className="landing-about-title">Quiénes somos</h2>
          <div className="landing-about-divider" />
          <p className="landing-about-text">
            <strong>3 Esquinas</strong> nace en Maipú, Mendoza, con la misión de contribuir activamente al cumplimiento de los
            17 ODS de la Agenda 2030. Creemos en el poder de la comunidad organizada para transformar realidades. Trabajamos
            en proyectos de educación, ambiente, inclusión social y desarrollo comunitario.
          </p>
        </div>
      </section>

      {/* ===== ODS ===== */}
      <section id="ods" className="landing-ods">
        <div className="landing-ods-inner">
          <h2 className="landing-ods-title">Objetivos de Desarrollo Sostenible</h2>
          <p className="landing-ods-subtitle">Agenda 2030 — ONU</p>
          <div className="landing-ods-carousel-wrapper">
            <button onClick={() => scrollCarousel('left')} className="landing-ods-arrow landing-ods-arrow--left" aria-label="Anterior">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div ref={carouselRef} className="landing-ods-carousel">
              {ODS_LIST.map((ods, index) => (
                <ODSFlipCard key={ods.id} ods={ods} flipped={flippedODS.includes(ods.id)} onToggle={() => handleODSClick(ods.id, index)} dark={dark} />
              ))}
            </div>
            <button onClick={() => scrollCarousel('right')} className="landing-ods-arrow landing-ods-arrow--right" aria-label="Siguiente">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===== DONAR ===== */}
      <section id="donar" className="landing-donate">
        <div className="landing-donate-inner">
          <h2 className="landing-donate-title">Sumate con tu donación</h2>
          <p className="landing-donate-desc">Tu aporte nos ayuda a seguir construyendo un futuro sostenible para todos.</p>
          <Link to="/donar" className="landing-donate-btn">
            Donar ahora
          </Link>
        </div>
      </section>

      {/* ===== CONTACTO ===== */}
      <section id="contacto" className="landing-contact">
        <div className="landing-contact-inner">
          <h2 className="landing-contact-title">Contacto</h2>
          {contactSent ? (
            <div className="landing-contact-success">
              Mensaje enviado correctamente. ¡Gracias por contactarnos!
            </div>
          ) : (
            <form onSubmit={handleContact} className="landing-contact-form">
              <input
                type="text"
                placeholder="Nombre"
                value={contactForm.nombre}
                onChange={(e) => setContactForm((p) => ({ ...p, nombre: e.target.value }))}
                required
                className="landing-contact-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                required
                className="landing-contact-input"
              />
              <textarea
                placeholder="Tu mensaje"
                rows={4}
                value={contactForm.mensaje}
                onChange={(e) => setContactForm((p) => ({ ...p, mensaje: e.target.value }))}
                required
                className="landing-contact-textarea"
              />
              <button type="submit" className="landing-contact-submit">
                Enviar
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">
            <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="landing-footer-logo" />
            <span className="landing-footer-name">3 Esquinas</span>
          </div>
          <div className="landing-footer-social">
            <span className="landing-footer-social-link">Facebook</span>
            <span className="landing-footer-social-link">Instagram</span>
            <span className="landing-footer-social-link">YouTube</span>
          </div>
          <div className="landing-footer-location">Maipú, Mendoza — Argentina</div>
        </div>
      </footer>
    </div>
  )
}
