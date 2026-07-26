import { Link } from 'react-router-dom'

export default function Footer() {
  return (
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
            <a href="/#inicio" className="landing-footer-link">Inicio</a>
            <a href="/#institucional" className="landing-footer-link">Quiénes somos</a>
            <a href="/#contacto" className="landing-footer-link">Contacto</a>
            <Link to="/donar" className="landing-footer-link">Donar</Link>
          </div>
          <div className="landing-footer-social-row">
            <a href="https://x.com/3esqfundacion" target="_blank" rel="noopener noreferrer" className="landing-footer-social-pill">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X
            </a>
            <a href="https://instagram.com/Tresesquinasfundacion" target="_blank" rel="noopener noreferrer" className="landing-footer-social-pill">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              Instagram
            </a>
            <a href="https://youtube.com/@FundacionTresEsquinas" target="_blank" rel="noopener noreferrer" className="landing-footer-social-pill">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube
            </a>
          </div>
        </div>

        <div className="landing-footer-contact-col">
          <span className="landing-footer-nav-title">Contacto</span>
          <div className="landing-footer-contact-items">
            <a href="mailto:tresesquinasfundacion@gmail.com" className="landing-footer-contact-item">tresesquinasfundacion@gmail.com</a>
            <span className="landing-footer-contact-item">Maipú, Mendoza — Argentina</span>
          </div>
        </div>
      </div>

      <div className="landing-footer-bottom">
        <span>&copy; {new Date().getFullYear()} 3 Esquinas — Todos los derechos reservados</span>
      </div>
    </footer>
  )
}
