import { useRef, useEffect, useState } from 'react'
import { ABOUT_VIDEOS } from './heroData'

export default function HeroSection({ scrollTo }) {
  const videoRefs = useRef([])
  const [aboutSlide, setAboutSlide] = useState(0)

  const aboutNext = () => setAboutSlide((prev) => (prev + 1) % ABOUT_VIDEOS.length)

  useEffect(() => {
    const handlers = []
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === aboutSlide) {
        v.currentTime = 0
        const handler = () => {
          if (v.duration && v.currentTime >= v.duration - 0.5) {
            v.removeEventListener('timeupdate', handler)
            aboutNext()
          }
        }
        v.addEventListener('timeupdate', handler)
        handlers.push({ video: v, handler })
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
    return () => {
      handlers.forEach(({ video, handler }) => video.removeEventListener('timeupdate', handler))
    }
  }, [aboutSlide])

  return (
    <section id="inicio" className="landing-hero">
      <div className="landing-hero-video-bg">
        {ABOUT_VIDEOS.map((video, i) => (
          <video
            key={i}
            ref={(el) => { videoRefs.current[i] = el }}
            src={video.src}
            muted
            loop={false}
            playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            className={`landing-hero-video ${i === aboutSlide ? 'active' : ''}`}
          />
        ))}
      </div>
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
  )
}
