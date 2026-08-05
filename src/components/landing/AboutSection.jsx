import { Link } from 'react-router-dom'

export default function AboutSection() {
  return (
    <section id="institucional" className="landing-about">
      <div className="landing-about-inner">
        <h2 className="landing-about-title">Quiénes somos</h2>
        <div className="landing-about-divider" />

        <div className="landing-about-body">
          <div className="landing-about-body-left">
            <h3 className="landing-about-subtitle">Quiénes somos</h3>
            <p className="landing-about-text">
              <strong>3 Esquinas</strong> es una organización comunitaria independiente, nacida en Maipú, Mendoza,
              con la vocación de generar un cambio real en la vida de las personas y los territorios que habitamos.
              Desde nuestra fundación, trabajamos de la mano con las familias, las escuelas y las instituciones locales
              para construir soluciones concretas a los desafíos sociales, ambientales y económicos que enfrenta nuestra comunidad.
            </p>
            <p className="landing-about-text">
              Nuestro nombre rinde homenaje al distrito <strong>Tres Esquinas</strong>, en el departamento de Maipú,
              y refleja la filosofía que nos guía: la articulación de tres grandes actores — <strong>la sociedad civil, el Estado y las empresas</strong> —
              para impulsar la formación, capacitación y asesoramiento en los Objetivos de Desarrollo Sostenible de la ONU, en el marco del Plan de Agenda 2030.
            </p>
          </div>

          <div className="landing-about-body-right">
            <h3 className="landing-about-subtitle">El recorrido</h3>
            <div className="landing-about-cards">
              <div className="landing-about-card">
                <div className="landing-about-card-icon landing-about-card-icon--mission">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                </div>
                <div>
                  <h4 className="landing-about-card-title">Misión</h4>
                  <p className="landing-about-card-text">
                    Contribuir activamente al cumplimiento de los 17 ODS de la Agenda 2030 a través de la educación,
                    la acción ambiental, la inclusión social y el desarrollo comunitario.
                  </p>
                </div>
              </div>

              <div className="landing-about-card">
                <div className="landing-about-card-icon landing-about-card-icon--vision">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="landing-about-card-title">Visión</h4>
                  <p className="landing-about-card-text">
                    Ser una organización de referencia en el trabajo comunitario por los ODS en Mendoza,
                    demostrando que la acción local genera transformaciones globales.
                  </p>
                </div>
              </div>

              <div className="landing-about-card">
                <div className="landing-about-card-icon landing-about-card-icon--how">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="landing-about-card-title">Cómo trabajamos</h4>
                  <p className="landing-about-card-text">
                    A través de la educación, la incidencia en políticas públicas, la colaboración con la sociedad civil
                    y el trabajo directo en territorio.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link to="/conocenos" className="landing-about-btn">
                Conocenos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
