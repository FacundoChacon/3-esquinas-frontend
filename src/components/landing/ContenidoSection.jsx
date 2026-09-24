import { CONTENIDO_DESTACADO } from './contenidoData'

export default function ContenidoSection() {
  return (
    <section id="contenido" className="landing-contenido">
      <div className="landing-contenido-inner">
        <h2 className="landing-contenido-title">Contenido</h2>
        <div className="landing-contenido-divider" />
        <p className="landing-contenido-subtitle">
          El último video de 3 Esquinas. Lo vamos actualizando con cada actividad nueva.
        </p>

        <figure className="landing-contenido-video">
          <video
            className="landing-contenido-video-el"
            src={CONTENIDO_DESTACADO.src}
            poster={CONTENIDO_DESTACADO.poster}
            controls
            preload="metadata"
            playsInline
          >
            Tu navegador no soporta la reproducción de video.
          </video>

          <figcaption className="landing-contenido-video-info">
            <div>
              <h3 className="landing-contenido-video-title">{CONTENIDO_DESTACADO.title}</h3>
              {CONTENIDO_DESTACADO.description && (
                <p className="landing-contenido-video-desc">{CONTENIDO_DESTACADO.description}</p>
              )}
            </div>
            {CONTENIDO_DESTACADO.link && (
              <a
                href={CONTENIDO_DESTACADO.link.href}
                target={CONTENIDO_DESTACADO.link.external ? '_blank' : undefined}
                rel={CONTENIDO_DESTACADO.link.external ? 'noopener noreferrer' : undefined}
                className="landing-contenido-video-link"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
                {CONTENIDO_DESTACADO.link.label}
              </a>
            )}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}