import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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

function ODSFlipCard({ ods, flipped, onToggle }) {
  return (
    <div
      className="[perspective:1000px] cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={onToggle}
    >
      <div
        className={`relative w-full [transform-style:preserve-3d] transition-transform duration-500 ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
        style={{ minHeight: '16rem' }}
      >
        <div className="absolute inset-0 rounded-xl p-4 text-white text-center flex flex-col items-center gap-2 [backface-visibility:hidden]" style={{ backgroundColor: ods.color }}>
          <div className="text-base sm:text-lg font-bold">{String(ods.id).padStart(2, '0')}</div>
          <div className="w-full rounded-lg border border-white/30 flex items-center justify-center" style={{ height: '5rem' }}>
            <svg className="w-6 h-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
          <div className="text-[11px] leading-tight opacity-90 font-medium mt-auto">{ods.label}</div>
        </div>
        <div className="absolute inset-0 rounded-xl p-4 text-white text-center flex flex-col items-center justify-center gap-2 [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ backgroundColor: ods.color }}>
          <div className="text-xs font-bold opacity-80 uppercase tracking-wider">ODS {String(ods.id).padStart(2, '0')}</div>
          <p className="text-[10px] leading-relaxed opacity-90">{ods.desc}</p>
          <div className="text-[9px] font-medium opacity-60 mt-1">Tocar para voltear</div>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const [flippedODS, setFlippedODS] = useState([])
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [contactSent, setContactSent] = useState(false)

  const toggleODS = (id) => {
    setFlippedODS((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
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

  return (
    <div className="min-h-screen bg-white">
      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 sm:px-6 h-14 max-w-6xl mx-auto">
          <button onClick={() => scrollTo('inicio')} className="flex items-center gap-2 shrink-0">
            <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-sm font-bold text-gray-900 hidden sm:inline">3 Esquinas</span>
          </button>
          <div className="flex items-center gap-0 sm:gap-1 overflow-x-auto min-w-0">
            {[{ id: 'inicio', label: 'Inicio' }, { id: 'institucional', label: 'Institucional' }, { id: 'ods', label: 'ODS' }, { id: 'contacto', label: 'Contacto' }].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="shrink-0 text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isAuthenticated ? (
              user?.rol === 'ADMIN' ? (
                <Link to="/admin" className="shrink-0 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full font-semibold border text-gray-600 hover:bg-gray-100 border-gray-300 transition-all">
                  Admin
                </Link>
              ) : (
                <button onClick={logout} className="shrink-0 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full font-semibold border text-gray-600 hover:bg-gray-100 border-gray-300 transition-all">
                  Cerrar sesión
                </button>
              )
            ) : (
              <Link to="/login" className="shrink-0 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full font-semibold border text-gray-600 hover:bg-gray-100 border-gray-300 transition-all">
                Iniciar sesión
              </Link>
            )}
            <button onClick={() => scrollTo('donar')} className="shrink-0 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
              Donar
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section id="inicio" className="px-6 py-12 sm:py-20 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-400 text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="w-9 h-9 rounded-xl object-contain" />
              <span className="text-sm font-semibold tracking-wider uppercase opacity-80">3 Esquinas</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
              Construyendo un futuro sostenible desde Maipú, Mendoza
            </h1>
            <p className="text-base sm:text-lg opacity-90 max-w-xl mb-6">
              Somos una organización comprometida con los 17 Objetivos de Desarrollo Sostenible de la ONU.
              Trabajamos para generar impacto social, económico y ambiental en nuestra comunidad.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button onClick={() => scrollTo('institucional')} className="px-5 py-2 rounded-full text-sm font-semibold bg-white text-emerald-700">
                Conocé más
              </button>
              <button onClick={() => scrollTo('contacto')} className="px-5 py-2 border border-white/40 text-white rounded-full text-sm font-semibold">
                Contactanos
              </button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-sm">
            <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-white/40 text-white/50 flex flex-col items-center justify-center gap-2">
              <svg className="w-10 h-10 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
              <span className="text-xs font-medium opacity-70">Foto institucional</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUIENES SOMOS ===== */}
      <section id="institucional" className="px-6 py-10 sm:py-14 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Quiénes somos</h2>
          <div className="w-16 h-1 mx-auto mb-6 rounded-full bg-emerald-600" />
          <p className="leading-relaxed max-w-3xl mx-auto text-gray-600">
            <strong>3 Esquinas</strong> nace en Maipú, Mendoza, con la misión de contribuir activamente al cumplimiento de los
            17 ODS de la Agenda 2030. Creemos en el poder de la comunidad organizada para transformar realidades. Trabajamos
            en proyectos de educación, ambiente, inclusión social y desarrollo comunitario.
          </p>
        </div>
      </section>

      {/* ===== ODS ===== */}
      <section id="ods" className="px-6 py-10 sm:py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Objetivos de Desarrollo Sostenible</h2>
          <p className="text-sm mb-6 text-gray-500">Agenda 2030 — ONU</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {ODS_LIST.map((ods) => (
              <ODSFlipCard key={ods.id} ods={ods} flipped={flippedODS.includes(ods.id)} onToggle={() => toggleODS(ods.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== DONAR ===== */}
      <section id="donar" className="px-6 py-10 sm:py-14 bg-emerald-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Sumate con tu donación</h2>
          <p className="opacity-90 mb-6">Tu aporte nos ayuda a seguir construyendo un futuro sostenible para todos.</p>
          <Link to="/donar" className="inline-block px-8 py-3 rounded-full font-bold text-lg bg-white text-emerald-700 shadow-lg hover:shadow-xl transition-shadow">
            Donar ahora
          </Link>
        </div>
      </section>

      {/* ===== CONTACTO ===== */}
      <section id="contacto" className="px-6 py-10 sm:py-14 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">Contacto</h2>
          {contactSent ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-xl text-center text-sm">
              Mensaje enviado correctamente. ¡Gracias por contactarnos!
            </div>
          ) : (
            <form onSubmit={handleContact} className="space-y-3">
              <input
                type="text"
                placeholder="Nombre"
                value={contactForm.nombre}
                onChange={(e) => setContactForm((p) => ({ ...p, nombre: e.target.value }))}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder-gray-400"
              />
              <textarea
                placeholder="Tu mensaje"
                rows={4}
                value={contactForm.mensaje}
                onChange={(e) => setContactForm((p) => ({ ...p, mensaje: e.target.value }))}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder-gray-400 resize-none"
              />
              <button type="submit" className="h-11 px-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors mx-auto block">
                Enviar
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="px-6 py-8 text-sm bg-gray-900 text-gray-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="w-7 h-7 rounded-xl object-contain" />
            <span className="text-white font-semibold">3 Esquinas</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-default">Facebook</span>
            <span className="hover:text-white transition-colors cursor-default">Instagram</span>
            <span className="hover:text-white transition-colors cursor-default">YouTube</span>
          </div>
          <div className="text-xs">Maipú, Mendoza — Argentina</div>
        </div>
      </footer>
    </div>
  )
}
