/**
 * Configuración del sitio: URL absoluta y nombre de marca.
 *
 * Fuente única del dominio para todo lo que genera URLs absolutas
 * (canonical por ruta, sitemap).
 *
 * TODO DEPLOY: al publicar, definir la variable de entorno VITE_SITE_URL
 * (o editar esta constante) para que coincida con el dominio real.
 * Los tags estáticos de index.html (canonical, og:url, og:image y JSON-LD)
 * también deben actualizarse manualmente para que coincidan.
 */
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://3esquinas.invalid'

export const SITE_NAME = '3 Esquinas'