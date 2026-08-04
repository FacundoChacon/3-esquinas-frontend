/**
 * DonateSection.jsx — Sección de donaciones del landing
 *
 * CTA de donación con botón que lleva a la página /donar.
 * Antes estaba embebida en ContactSection; se separó para poder ubicar
 * la sección de colaboración entre "Contactanos" y "Donaciones".
 *
 * Pertenece a: Landing — al final, tras Colaborar
 */
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* Sprite offscreen: un destello con degradado radial (núcleo → transparente) */
function makeGlint(color) {
  const size = 64
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, color)
  grad.addColorStop(0.4, color)
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

export default function DonateSection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const sprites = [makeGlint('rgba(255, 255, 255, 1)'), makeGlint('rgba(255, 216, 170, 1)')]

    let width = 0
    let height = 0
    let raf = 0
    let t = 0
    let last = 0

    /* Destellos: suben como burbujas de luz con velocidad propia */
    const particles = Array.from({ length: 170 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.8 + Math.random() * 2.6,
      phase: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 2.2,
      drift: 0.4 + Math.random() * 1.6,
      base: 0.25 + Math.random() * 0.65,
      sprite: Math.random() < 0.55 ? 0 : 1,
      vy: 0.06 + Math.random() * 0.3,
      vx: (Math.random() - 0.5) * 0.1,
    }))

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }
    resize()
    window.addEventListener('resize', resize)

    const bandWidth = Math.max(50, height * 0.16)

    /* Brillo: recorre el borde del cuadro creciendo y achicándose */
    const glow = { p: Math.random(), speed: 1 / 14 } // p: posición en el perímetro (0..1), una vuelta cada ~14s

    const step = (dt) => {
      glow.p += glow.speed * dt
      if (glow.p >= 1) glow.p -= 1

      for (const p of particles) {
        p.y -= p.vy * dt
        p.x += p.vx * dt
        if (p.y < -0.02) {
          p.y = 1.02
          p.x = Math.random()
          p.phase = Math.random() * Math.PI * 2
        }
        if (p.x > 1.02) p.x = -0.02
        else if (p.x < -0.02) p.x = 1.02
      }
    }

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      const by = height * 0.55 + Math.sin(t * 0.22) * height * 0.05

      /* Glow: centro que rodea el borde del cuadro, creciendo y achicándose */
      const maxDim = Math.max(width, height)
      const inset = Math.max(10, Math.min(width, height) * 0.05)
      const perim = 2 * (width + height)
      const len = glow.p * perim
      let gx
      let gy
      if (len < width) {
        gx = len
        gy = inset
      } else if (len < width + height) {
        gx = width - inset
        gy = len - width
      } else if (len < 2 * width + height) {
        gx = width - (len - width - height)
        gy = height - inset
      } else {
        gx = inset
        gy = height - (len - 2 * width - height)
      }

      const osc = 0.5 + 0.5 * Math.sin(glow.p * Math.PI * 4) // crece y se achica 2 veces por vuelta
      const rad = (0.12 + 0.26 * osc) * maxDim
      const alpha = 0.15 + 0.05 * (1 - osc)

      const halo = ctx.createRadialGradient(gx, gy, 0, gx, gy, rad)
      halo.addColorStop(0, `rgba(255, 196, 110, ${alpha})`)
      halo.addColorStop(0.5, `rgba(255, 196, 110, ${alpha * 0.45})`)
      halo.addColorStop(1, 'rgba(255, 196, 110, 0)')
      ctx.fillStyle = halo
      ctx.fillRect(0, 0, width, height)

      for (const p of particles) {
        const dist = Math.abs(p.y * height - by) / bandWidth
        const path = Math.max(0, 1 - dist * dist)
        const tw = Math.pow(0.5 + 0.5 * Math.sin(p.phase + t * p.speed), 2)
        const tw2 = 0.5 + 0.5 * Math.sin(p.phase * 1.7 + t * p.speed * 0.6)
        const intensity = p.base * (0.35 + 0.65 * tw) * (0.6 + 0.4 * tw2) * (0.45 + 0.55 * path)
        if (intensity < 0.06) continue

        const r = p.size * (0.8 + 1.6 * path) * (0.7 + 0.6 * tw)
        const x = p.x * width + Math.sin(t * p.drift + p.phase) * 1.6
        const y = p.y * height + Math.cos(t * p.drift * 0.8 + p.phase) * 1.2
        ctx.globalAlpha = Math.min(1, intensity)
        ctx.drawImage(sprites[p.sprite], x - r, y - r, r * 2, r * 2)
      }

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    const loop = (now) => {
      if (!last) last = now
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      t += dt
      step(dt)
      draw()
      if (!reduceMotion) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="donar" className="landing-contact-donate">
      {/* Brillos estilo sol sobre el mar (canvas) */}
      <canvas ref={canvasRef} className="landing-donate-canvas" aria-hidden="true" />

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
