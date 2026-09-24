import { useEffect } from 'react'
import { SITE_URL, SITE_NAME } from '../config/site'

/**
 * Seo — metadatos dinámicos por ruta en la SPA.
 *
 * Actualiza document.title, meta description, link canonical y (opcional)
 * robots noindex. No renderiza nada en pantalla.
 *
 * Uso:
 *   <Seo title="Conocenos" description="..." path="/conocenos" />
 *   <Seo title="Iniciar sesión" path="/login" noIndex />
 */
export default function Seo({ title, description, path = '/', noIndex = false }) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Portal de Donaciones`

    const upsert = (selector, make) => {
      let el = document.head.querySelector(selector)
      if (!el) {
        el = make()
        document.head.appendChild(el)
      }
      return el
    }

    if (description) {
      upsert('meta[name="description"]', () => {
        const m = document.createElement('meta')
        m.setAttribute('name', 'description')
        return m
      }).setAttribute('content', description)
    }

    upsert('link[rel="canonical"]', () => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'canonical')
      return l
    }).setAttribute('href', `${SITE_URL}${path}`)

    const robots = document.head.querySelector('meta[name="robots"]')
    if (noIndex) {
      upsert('meta[name="robots"]', () => {
        const m = document.createElement('meta')
        m.setAttribute('name', 'robots')
        return m
      }).setAttribute('content', 'noindex, nofollow')
    } else if (robots) {
      robots.remove()
    }
  }, [title, description, path, noIndex])

  return null
}