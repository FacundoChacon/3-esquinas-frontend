/**
 * Feature flags del sitio público de 3 Esquinas.
 *
 * CONOCENOS_HABILITADA — página /conocenos.
 * Apagada a pedido: su sección "Nuestro equipo" solo tiene placeholders
 * vacíos ("Próximamente") y el resto del contenido (origen y pilares) ya
 * está resumido en el landing (sección "Quiénes somos"). Con el flag en
 * false la ruta /conocenos redirige al inicio y el botón "Conocenos" del
 * landing no se renderiza.
 *
 * Para reactivarla (cuando la ONG tenga fotos y datos del equipo):
 *   1. Pasar CONOCENOS_HABILITADA a true (recupera ruta y botón).
 *   2. Volver a agregar la entrada /conocenos en public/sitemap.xml.
 */
export const CONOCENOS_HABILITADA = false
