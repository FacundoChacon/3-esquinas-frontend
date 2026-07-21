import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDarkMode } from '../context/DarkModeContext'

const ODS_LIST = [
  { id: 1, color: '#E5243B', label: 'Fin de la pobreza', desc: 'Promovemos inclusión socioeconómica mediante talleres de oficios y acceso a recursos básicos para familias de Maipú.', img: '/images/ods/ods-01.jpg' },
  { id: 2, color: '#DDA63A', label: 'Hambre cero', desc: 'Impulsamos huertas comunitarias y campañas de alimentación saludable para garantizar nutrición en sectores vulnerables.', img: '/images/ods/ods-02.jpg' },
  { id: 3, color: '#4C9F38', label: 'Salud y bienestar', desc: 'Organizamos jornadas de salud preventiva, talleres de bienestar y acompañamiento a adultos mayores.', img: '/images/ods/ods-03.jpg' },
  { id: 4, color: '#C5192D', label: 'Educación de calidad', desc: 'Brindamos apoyo escolar, becas educativas y espacios de aprendizaje para niños y jóvenes de Mendoza.', img: '/images/ods/ods-04.jpg' },
  { id: 5, color: '#FF3A21', label: 'Igualdad de género', desc: 'Desarrollamos programas de empoderamiento femenino y promovemos la equidad de género en nuestra comunidad.', img: '/images/ods/ods-05.jpg' },
  { id: 6, color: '#26BDE2', label: 'Agua limpia y saneamiento', desc: 'Realizamos campañas de concientización sobre uso responsable del agua y acceso a saneamiento básico.', img: '/images/ods/ods-06.jpg' },
  { id: 7, color: '#FCC30B', label: 'Energía asequible y no contaminante', desc: 'Fomentamos el uso de energías renovables y la eficiencia energética en hogares e instituciones locales.', img: '/images/ods/ods-07.jpg' },
  { id: 8, color: '#A21942', label: 'Trabajo decente y crecimiento económico', desc: 'Capacitamos en emprendedurismo y vinculamos con oportunidades laborales para el desarrollo económico local.', img: '/images/ods/ods-08.jpg' },
  { id: 9, color: '#FD6925', label: 'Industria, innovación e infraestructura', desc: 'Apoyamos proyectos de innovación social y mejoramos infraestructura comunitaria en Maipú.', img: '/images/ods/ods-09.jpg' },
  { id: 10, color: '#DD1367', label: 'Reducción de las desigualdades', desc: 'Trabajamos para reducir brechas sociales garantizando igualdad de oportunidades a todos los sectores.', img: '/images/ods/ods-10.jpg' },
  { id: 11, color: '#FD9D24', label: 'Ciudades y comunidades sostenibles', desc: 'Promovemos espacios públicos inclusivos, seguros y sostenibles en los barrios de Maipú.', img: '/images/ods/ods-11.jpg' },
  { id: 12, color: '#BF8B2E', label: 'Producción y consumo responsables', desc: 'Impulsamos prácticas de consumo responsable, reciclaje y economía circular en la comunidad.', img: '/images/ods/ods-12.jpg' },
  { id: 13, color: '#3F7E44', label: 'Acción por el clima', desc: 'Realizamos forestación, jornadas de limpieza y educación ambiental para mitigar el cambio climático.', img: '/images/ods/ods-13.jpg' },
  { id: 14, color: '#0A97D9', label: 'Vida submarina', desc: 'Cuidamos nuestros recursos hídricos y promovemos la preservación de ecosistemas acuáticos locales.', img: '/images/ods/ods-14.jpg' },
  { id: 15, color: '#56C02B', label: 'Vida de ecosistemas terrestres', desc: 'Protegemos la biodiversidad local mediante reforestación y conservación de espacios naturales.', img: '/images/ods/ods-15.jpg' },
  { id: 16, color: '#00689D', label: 'Paz, justicia e instituciones sólidas', desc: 'Fomentamos la participación ciudadana, la transparencia y el acceso a la justicia en nuestra comunidad.', img: '/images/ods/ods-16.jpg' },
  { id: 17, color: '#19486A', label: 'Alianzas para lograr los objetivos', desc: 'Articulamos con organizaciones públicas, privadas y sociales para potenciar el impacto de nuestras acciones.', img: '/images/ods/ods-17.jpg' },
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
            <img src={ods.img} alt={ods.label} className="w-full h-full object-cover" />
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

const ABOUT_VIDEOS = [
  { src: '/videos/mendoza-plaza-independencia.mp4', alt: 'Vista aérea de Plaza Independencia, Mendoza' },
  { src: '/videos/mendoza-ciudad-aerea.mp4', alt: 'Vista aérea de la ciudad de Mendoza' },
  { src: '/videos/parque-aereo.mp4', alt: 'Vista aérea de parque y naturaleza' },
  { src: '/videos/equipo-mano.mp4', alt: 'Equipo de trabajo colaborando' },
  { src: '/videos/voluntarios-reciclando.mp4', alt: 'Voluntarios reciclando en comunidad' },
]

export default function LandingPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const { dark, toggle: toggleDark } = useDarkMode()
  const [flippedODS, setFlippedODS] = useState([])
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [contactSent, setContactSent] = useState(false)
  const carouselRef = useRef(null)
  const videoRefs = useRef([])
  const [aboutSlide, setAboutSlide] = useState(0)

  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    let rafId = null

    const updateCards = () => {
      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth
      const containerCenter = scrollLeft + containerWidth / 2
      const cards = Array.from(container.children)

      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(containerCenter - cardCenter)
        const cardWidth = card.offsetWidth
        const ratio = distance / cardWidth

        const isCentered = ratio < 0.35
        const inner = card.querySelector('.landing-ods-card-inner')

        let scale, opacity, glow
        if (isCentered) {
          scale = 1
          opacity = 1
          glow = '0 0 0 2px rgba(16,185,129,0.5), 0 0 20px rgba(16,185,129,0.25)'
        } else if (ratio < 1.3) {
          scale = 0.82
          opacity = 0.5
          glow = 'none'
        } else {
          scale = 0.7
          opacity = 0.25
          glow = 'none'
        }

        card.style.transform = `scale(${scale})`
        card.style.opacity = opacity

        if (inner) {
          inner.style.boxShadow = glow
          if (!isCentered && inner.classList.contains('flipped')) {
            inner.classList.remove('flipped')
          }
        }
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

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === aboutSlide) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
        v.currentTime = 0
      }
    })
  }, [aboutSlide])

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

  const aboutNext = () => setAboutSlide((prev) => (prev + 1) % ABOUT_VIDEOS.length)

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
        </div>
      </section>

      {/* ===== QUIENES SOMOS ===== */}
      <section id="institucional" className="landing-about">
        <div className="landing-about-inner">

          {/* Fila superior: Título + Carrusel */}
          <div className="landing-about-header">
            <h2 className="landing-about-title">Quiénes somos</h2>
            <div className="landing-about-divider" />

            <div className="landing-about-carousel">
              {ABOUT_VIDEOS.map((video, i) => (
                <div key={i} className={`landing-about-carousel-slide ${i === aboutSlide ? 'active' : ''}`}>
                  <video
                    ref={(el) => { videoRefs.current[i] = el }}
                    src={video.src}
                    muted
                    loop={false}
                    playsInline
                    preload={i === 0 ? 'auto' : 'metadata'}
                    onEnded={aboutNext}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Fila inferior: Texto izquierda + Recorrido derecha */}
          <div className="landing-about-body">
            <div className="landing-about-body-left">
              <h3 className="landing-about-subtitle">Quiénes somos</h3>
              <p className="landing-about-text">
                <strong>3 Esquinas</strong> es una organización comunitaria independiente, nacida en Maipú, Mendoza,
                con la vocación de generar un cambio real en la vida de las personas y los territorios que habitamos.
                Desde nuestra fundación, trabajamos de la mano con las familias, las escuelas y las instituciones locales
                para construir soluciones concretas a los desafíos sociales, ambientales y económicos que enfrenta nuestra comunidad.
              </p>

              <p className="landing-about-text">
                Nuestro nombre rinde homenaje al distrito <strong>Tres Esquinas</strong>, en el departamento de Maipú,
                y refleja la filosofía que nos guía: la articulación de tres grandes actores — <strong>la sociedad civil, el Estado y las empresas</strong> —
                para impulsar la formación, capacitación y asesoramiento en los Objetivos de Desarrollo Sostenible de la ONU, en el marco del Plan de Agenda 2030.
              </p>
            </div>

            <div className="landing-about-body-right">
              <h3 className="landing-about-subtitle">El recorrido</h3>
              <div className="landing-about-cards">
                <div className="landing-about-card">
                  <div className="landing-about-card-icon landing-about-card-icon--mission">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="landing-about-card-title">Misión</h4>
                    <p className="landing-about-card-text">
                      Contribuir activamente al cumplimiento de los 17 ODS de la Agenda 2030 a través de la educación,
                      la acción ambiental, la inclusión social y el desarrollo comunitario.
                    </p>
                  </div>
                </div>

                <div className="landing-about-card">
                  <div className="landing-about-card-icon landing-about-card-icon--vision">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="landing-about-card-title">Visión</h4>
                    <p className="landing-about-card-text">
                      Ser una organización de referencia en el trabajo comunitario por los ODS en Mendoza,
                      demostrando que la acción local genera transformaciones globales.
                    </p>
                  </div>
                </div>

                <div className="landing-about-card">
                  <div className="landing-about-card-icon landing-about-card-icon--how">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="landing-about-card-title">Cómo trabajamos</h4>
                    <p className="landing-about-card-text">
                      A través de la educación, la incidencia en políticas públicas, la colaboración con la sociedad civil
                      y el trabajo directo en territorio.
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/conocenos" className="landing-about-btn">
                Conocenos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
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

      {/* ===== CONTACTO ===== */}
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
                    <span className="landing-contact-channel-value">Tresesquinasfundacion@gmail.com</span>
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
                  <a href="https://x.com/3esqfundacion" target="_blank" rel="noopener noreferrer" className="landing-contact-social-link">X (Twitter)</a>
                  <a href="https://instagram.com/Tresesquinasfundacion" target="_blank" rel="noopener noreferrer" className="landing-contact-social-link">Instagram</a>
                  <a href="https://youtube.com/@FundacionTresEsquinas" target="_blank" rel="noopener noreferrer" className="landing-contact-social-link">YouTube</a>
                  <a href="mailto:Tresesquinasfundacion@gmail.com" className="landing-contact-social-link">Gmail</a>
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
                  <button type="submit" className="landing-contact-submit">
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ===== DONAR (integrado en Contacto) ===== */}
        <div id="donar" className="landing-contact-donate">
          <div className="landing-donate-inner">
            <div className="landing-donate-heart">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <h2 className="landing-donate-title">Cada aporte construye futuro</h2>
            <p className="landing-donate-desc">
              Tu generosidad nos permite seguir trabajando por una comunidad más justa, inclusiva y sustentable.
              Con tu donación financiamos educación, huertas comunitarias, jornadas de salud y proyectos
              que transforman la vida de las familias de Maipú.
            </p>
            <div className="landing-donate-impact">
              <div className="landing-donate-stat">
                <span className="landing-donate-stat-number">100%</span>
                <span className="landing-donate-stat-label">de tu aporte se destina a proyectos</span>
              </div>
            </div>
            <Link to="/donar" className="landing-donate-btn">
              Donar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-main">
            <div className="landing-footer-brand">
              <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="landing-footer-logo" />
              <span className="landing-footer-name">3 Esquinas</span>
            </div>
            <p className="landing-footer-desc">
              Organización sin fines de lucro dedicada al desarrollo social,
              educación y sustentabilidad en Maipú, Mendoza.
            </p>
          </div>

          <div className="landing-footer-nav">
            <span className="landing-footer-nav-title">Enlaces</span>
            <div className="landing-footer-nav-links">
              <a href="#inicio" className="landing-footer-link">Inicio</a>
              <a href="#institucional" className="landing-footer-link">Quiénes somos</a>
              <a href="#contacto" className="landing-footer-link">Contacto</a>
              <Link to="/donar" className="landing-footer-link">Donar</Link>
            </div>
            <div className="landing-footer-social-row">
              <a href="https://x.com/3esqfundacion" target="_blank" rel="noopener noreferrer" className="landing-footer-social-pill">X (Twitter)</a>
              <a href="https://instagram.com/Tresesquinasfundacion" target="_blank" rel="noopener noreferrer" className="landing-footer-social-pill">Instagram</a>
              <a href="https://youtube.com/@FundacionTresEsquinas" target="_blank" rel="noopener noreferrer" className="landing-footer-social-pill">YouTube</a>
            </div>
          </div>

          <div className="landing-footer-contact-col">
            <span className="landing-footer-nav-title">Contacto</span>
            <div className="landing-footer-contact-items">
              <a href="mailto:Tresesquinasfundacion@gmail.com" className="landing-footer-contact-item">Tresesquinasfundacion@gmail.com</a>
              <span className="landing-footer-contact-item">Maipú, Mendoza — Argentina</span>
            </div>
          </div>
        </div>

        <div className="landing-footer-bottom">
          <span>&copy; {new Date().getFullYear()} 3 Esquinas — Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  )
}
