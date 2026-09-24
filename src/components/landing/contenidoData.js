/**
 * CONTENIDO_DESTACADO — único video de la sección Contenido.
 *
 * El cliente pidió que NO sea tipo blog: solo debe haber UN video que se vaya
 * actualizando a medida que haya contenido nuevo.
 *
 * Para actualizarlo:
 *   1. Reemplazá `src` por el nuevo video (puede ser un archivo propio en
 *      /public/videos/ o una URL externa licenciada para su uso).
 *   2. Ajustá `title`, `description` y, si aplica, el `link` (ej. YouTube).
 */
export const CONTENIDO_DESTACADO = {
  src: '/videos/voluntarios-reciclando.mp4',
  poster: '/images/hero-maipu.jpg',
  title: 'Voluntariado en acción',
  description:
    'Jornadas de 3 Esquinas junto a la comunidad de Maipú. El próximo video se publica acá apenas haya actividad nueva.',
  link: {
    label: 'Ver canal de YouTube',
    href: 'https://youtube.com/@FundacionTresEsquinas',
    external: true,
  },
}