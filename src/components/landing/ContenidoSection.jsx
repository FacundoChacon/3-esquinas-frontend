import { useState } from 'react'

const CONTENIDO_ITEMS = [
  {
    id: 'video-institucional',
    type: 'video',
    label: 'Video institucional de 3 Esquinas',
    desc: 'Conocé la historia y la misión de la organización en un recorrido audiovisual por Maipú y sus programas.',
    links: [
      { label: 'Ver en YouTube', href: '#' },
      { label: 'Ver en Vimeo', href: '#' },
    ],
  },
  {
    id: 'noticia-huerta',
    type: 'noticia',
    label: 'Noticia: huerta comunitaria en Maipú',
    desc: 'Foto y nota sobre el avance de nuestros programas de huertas comunitarias y educación ambiental.',
    links: [{ label: 'Leer nota', href: '#' }],
  },
  {
    id: 'redes-voluntariado',
    type: 'redes',
    label: 'Publicación de Instagram: jornada de voluntariado',
    desc: 'Imágenes y resumen de la jornada de voluntariado junto a la comunidad.',
    links: [
      { label: 'Abrir publicación', href: '#' },
      { label: 'Seguir a 3 Esquinas', href: '#' },
    ],
  },
  {
    id: 'noticia-forestacion',
    type: 'noticia',
    label: 'Noticia: jornada de forestación',
    desc: 'Cobertura fotográfica de la jornada de forestación en el departamento.',
    links: [{ label: 'Leer nota', href: '#' }],
  },
  {
    id: 'video-ods',
    type: 'video',
    label: 'Video educativo: ODS y Agenda 2030',
    desc: 'Material audiovisual que explica los Objetivos de Desarrollo Sostenible y la Agenda 2030 de la ONU.',
    links: [{ label: 'Ver video', href: '#' }],
  },
]

const MEDIA_LABELS = { video: 'Video', noticia: 'Noticia', redes: 'Redes' }

function MediaIcon({ type }) {
  if (type === 'video') {
    return (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 4.5h12a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H6a1.5 1.5 0 01-1.5-1.5V6A1.5 1.5 0 016 4.5zM12.75 9.75l3.75 2.25-3.75 2.25V9.75z" />
      </svg>
    )
  }
  if (type === 'noticia') {
    return (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    )
  }
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
    </svg>
  )
}

function ContentCard({ item }) {
  return (
    <article className="landing-contenido-card">
      <div className="landing-contenido-card-media">
        <MediaIcon type={item.type} />
        <span className="landing-contenido-card-media-type">{MEDIA_LABELS[item.type]}</span>
      </div>
      <div className="landing-contenido-card-body">
        <h3 className="landing-contenido-card-title">{item.label}</h3>
        <p className="landing-contenido-card-desc">{item.desc}</p>
        <div className="landing-contenido-card-links">
          {item.links.map((link) => (
            <a key={link.label} href={link.href} onClick={(e) => e.preventDefault()} className="landing-contenido-card-link">
              {link.label}
            </a>
          ))}
        </div>
        <div className="landing-contenido-card-badge">Próximamente</div>
      </div>
    </article>
  )
}

export default function ContenidoSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="contenido" className="landing-contenido">
      <div className="landing-contenido-inner">
        <h2 className="landing-contenido-title">Contenido</h2>
        <div className="landing-contenido-divider" />
        <p className="landing-contenido-subtitle">
          Videos, noticias y publicaciones de 3 Esquinas, en preparación.
        </p>

        <div className="landing-contenido-list">
          <ContentCard item={CONTENIDO_ITEMS[0]} />

          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="landing-contenido-bar"
            aria-expanded={expanded}
          >
            <span className="landing-contenido-bar-line" />
            <span className="landing-contenido-bar-label">
              {expanded ? 'Ver menos' : 'Ver más contenido'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                {expanded ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                )}
              </svg>
            </span>
            <span className="landing-contenido-bar-line" />
          </button>

          {expanded &&
            CONTENIDO_ITEMS.slice(1).map((item) => <ContentCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  )
}