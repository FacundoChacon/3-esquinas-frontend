import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useDarkMode } from '../../context/DarkModeContext'

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'institucional', label: 'Institucional' },
  { id: 'ods', label: 'ODS' },
  { id: 'colaborar', label: 'Colaborar' },
  { id: 'contacto', label: 'Contacto' },
]

export default function LandingNavbar({ scrollTo }) {
  const { user, isAuthenticated, logout } = useAuth()
  const { dark, toggle: toggleDark } = useDarkMode()

  return (
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
  )
}
