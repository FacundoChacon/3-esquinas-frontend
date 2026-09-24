import { Link } from 'react-router-dom'
import { useDarkMode } from '../context/DarkModeContext'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

export default function ConocenosPage() {
  const { dark, toggle: toggleDark } = useDarkMode()

  return (
    <div className={`min-h-screen ${dark ? 'dark bg-gray-950' : 'bg-white'}`}>
      <Seo
        title="Conocenos"
        path="/conocenos"
        description="Conocé la historia, el origen y los pilares de 3 Esquinas, la asociación civil de Maipú, Mendoza que articula sociedad civil, Estado y empresas."
      />

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
          <h1 className="conocenos-hero-title">Conocenos</h1>
          <p className="conocenos-hero-subtitle">Nuestra historia, nuestro equipo, nuestros ideales</p>
        </div>
      </section>

      {/* ORIGEN E IDEALES */}
      <section className="conocenos-origin">
        <div className="conocenos-origin-inner">
          <div className="conocenos-origin-content">
            <h2 className="conocenos-section-title">Nuestro origen</h2>
            <div className="conocenos-section-divider" />
            <p className="conocenos-text">
              <strong>3 Esquinas</strong> nace en Maipú, Mendoza, de la mano de un grupo de vecinos y profesionales
              convencidos de que el desarrollo sostenible no es una opción, sino una necesidad. Observamos en
              nuestro territorio las desigualdades sociales, la degradación ambiental y la falta de oportunidades
              para los sectores más vulnerables, y decidimos actuar.
            </p>
            <p className="conocenos-text">
              Nuestro nombre proviene de la pujante y productiva zona de maipu que nos da identidad, <strong>Tres Esquinas</strong>, caracteristica por sus viñedos, olivares y huertas
              . Al mismo tiempo, refleja la esencia de nuestra fundación: la articulación de
              <strong> tres grandes actores — la sociedad civil, el Estado y las empresas</strong> — trabajando de manera
              conjunta para cumplir con el objeto de formación, capacitación y asesoramiento en los Objetivos de
              Desarrollo Sostenible de la ONU, dentro del Plan de Agenda 2030.
            </p>
            <p className="conocenos-text">
              Nuestra propuesta se funda en tres pilares fundamentales:
            </p>
          </div>

          <div className="conocenos-pillars">
            <div className="conocenos-pillar">
              <div className="conocenos-pillar-number">01</div>
              <h3 className="conocenos-pillar-title">Educación como transformación</h3>
              <p className="conocenos-pillar-text">
                Creemos que la educación es la herramienta más poderosa para el cambio social.
                Por eso, nuestros programas están diseñados para empoderar a las personas con
                conocimientos y habilidades que les permitan construir un futuro mejor.
              </p>
            </div>

            <div className="conocenos-pillar">
              <div className="conocenos-pillar-number">02</div>
              <h3 className="conocenos-pillar-title">Acción ambiental local</h3>
              <p className="conocenos-pillar-text">
                El cambio climático se siente primero en los territorios. Trabajamos directamente
                con las comunidades para implementar soluciones ambientales concretas: huertas
                comunitarias, forestación, educación ambiental y gestión de residuos.
              </p>
            </div>

            <div className="conocenos-pillar">
              <div className="conocenos-pillar-number">03</div>
              <h3 className="conocenos-pillar-title">Inclusión y equidad</h3>
              <p className="conocenos-pillar-text">
                Cada persona tiene derecho a participar del desarrollo. Promovemos la inclusión
                social, la equidad de género y el acceso igualitario a recursos y oportunidades
                para todos los habitantes de nuestra comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className="conocenos-team">
        <div className="conocenos-team-inner">
          <h2 className="conocenos-section-title">Nuestro equipo</h2>
          <div className="conocenos-section-divider" />
          <p className="conocenos-text-center">
            Profesionales comprometidos con la transformación social. Cada uno aporta su experiencia
            para hacer posible la misión de 3 Esquinas.
          </p>

          <div className="conocenos-team-grid">
            {/* Placeholder 1 */}
            <div className="conocenos-member-card conocenos-member-card--placeholder">
              <div className="conocenos-member-photo">
                <svg className="w-10 h-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <span className="conocenos-member-placeholder-label">Próximamente</span>
            </div>

            {/* Placeholder 2 */}
            <div className="conocenos-member-card conocenos-member-card--placeholder">
              <div className="conocenos-member-photo">
                <svg className="w-10 h-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <span className="conocenos-member-placeholder-label">Próximamente</span>
            </div>
          </div>

          {/* Placeholder foto grupal */}
          <div className="conocenos-group-photo">
            <svg className="w-14 h-14 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
            <span className="conocenos-group-photo-text">Foto grupal del equipo — Próximamente</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
