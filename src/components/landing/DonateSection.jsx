/**
 * DonateSection.jsx — Sección de donaciones del landing
 *
 * CTA de donación con botón que lleva a la página /donar.
 * Antes estaba embebida en ContactSection; se separó para poder ubicar
 * la sección de colaboración entre "Contactanos" y "Donaciones".
 *
 * Pertenece a: Landing — al final, tras Colaborar
 */
import { Link } from 'react-router-dom'

export default function DonateSection() {
  return (
    <section id="donar" className="landing-contact-donate">
      {/* Efecto de agua: olas animadas en la parte inferior */}
      <div className="landing-donate-water" aria-hidden="true">
        <svg className="landing-donate-wave landing-donate-wave--back" preserveAspectRatio="none" viewBox="0 0 1200 60">
          <path d="M0,36 C200,60 400,12 600,36 C800,60 1000,12 1200,36 L1200,60 L0,60 Z" />
        </svg>
        <svg className="landing-donate-wave landing-donate-wave--front" preserveAspectRatio="none" viewBox="0 0 1200 60">
          <path d="M0,42 C250,60 500,24 750,42 C1000,60 1150,30 1200,42 L1200,60 L0,60 Z" />
        </svg>
      </div>

      <div className="landing-donate-inner">
        <Link to="/donar" className="landing-donate-btn">
          Donar ahora
        </Link>
        <div className="landing-donate-heart-wrap">
          <div className="landing-donate-ripple-wrap">
            <div className="landing-donate-ripple" />
            <div className="landing-donate-ripple" />
            <div className="landing-donate-ripple" />
          </div>
          <div className="landing-donate-heart">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
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
      </div>
    </section>
  )
}
