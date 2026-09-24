import { useState } from 'react'

const CONTENIDO_ITEMS = [
  { id: 'informes', label: 'Informes de impacto' },
  { id: 'programas', label: 'Programas activos' },
  { id: 'noticias', label: 'Noticias y novedades' },
  { id: 'historias', label: 'Historias de la comunidad' },
  { id: 'recursos', label: 'Recursos educativos ODS' },
  { id: 'eventos', label: 'Eventos y voluntariado' },
]

const VISIBLE_COUNT = 3

export default function ContenidoSection() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? CONTENIDO_ITEMS : CONTENIDO_ITEMS.slice(0, VISIBLE_COUNT)

  return (
    <section id="contenido" className="landing-contenido">
      <div className="landing-contenido-inner">
        <h2 className="landing-contenido-title">Contenido</h2>
        <div className="landing-contenido-divider" />
        <p className="landing-contenido-subtitle">
          Material y novedades de 3 Esquinas, en preparación.
        </p>
        <div className="landing-contenido-grid">
          {visible.map((item) => (
            <div key={item.id} className="landing-contenido-card">
              <svg className="landing-contenido-card-icon" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="landing-contenido-card-label">{item.label}</span>
              <div className="landing-contenido-card-badge">Próximamente</div>
            </div>
          ))}
        </div>
        <div className="landing-contenido-actions">
          <button onClick={() => setExpanded((prev) => !prev)} className="landing-contenido-btn" aria-expanded={expanded}>
            {expanded ? 'Ver menos' : 'Ver más contenido'}
          </button>
        </div>
      </div>
    </section>
  )
}