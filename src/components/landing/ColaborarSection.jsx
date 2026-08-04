/**
 * ColaborarSection.jsx — Sección de colaboración no monetaria
 *
 * Muestra un QR que apunta a /colaborar y un botón que lleva al formulario
 * de voluntariado. El QR se genera localmente (data URL) porque la CSP del
 * sitio solo permite imágenes propias o data:.
 *
 * Pertenece a: Landing — entre ODS y Contacto
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode'

const BENEFICIOS = [
  'Sumate a jornadas, talleres y proyectos solidarios',
  'Aportá tu tiempo, tus ganas o tu talento profesional',
  'Formá parte de una comunidad con propósito',
]

export default function ColaborarSection() {
  const [qrUrl, setQrUrl] = useState('')

  useEffect(() => {
    const target = new URL('/colaborar', window.location.origin).toString()
    QRCode.toDataURL(target, { width: 220, margin: 1, errorCorrectionLevel: 'M' })
      .then(setQrUrl)
      .catch(() => setQrUrl(''))
  }, [])

  return (
    <section id="colaborar" className="landing-colaborar">
      <div className="landing-colaborar-inner">
        <div className="landing-colaborar-card">
          <div className="landing-colaborar-left">
            <h2 className="landing-colaborar-title">Colaborá con tu tiempo</h2>
            <div className="landing-colaborar-divider" />
            <p className="landing-colaborar-desc">
              No hace falta donar dinero para transformar la comunidad. Sumate como voluntario
              a las jornadas, talleres y proyectos que llevamos adelante en Maipú.
            </p>

            <ul className="landing-colaborar-benefits">
              {BENEFICIOS.map((beneficio) => (
                <li key={beneficio} className="landing-colaborar-benefit">
                  <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{beneficio}</span>
                </li>
              ))}
            </ul>
            <Link to="/colaborar" className="landing-colaborar-btn">
              Quiero colaborar
            </Link>
          </div>

          <div className="landing-colaborar-qr">
            {qrUrl ? (
              <img src={qrUrl} alt="Código QR para sumarse como voluntario" className="w-48 h-48 rounded-lg bg-white p-2 shadow-sm" />
            ) : (
              <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-400">
                Cargando QR...
              </div>
            )}
            <span className="landing-colaborar-qr-label">Escaneá y completá el formulario</span>
          </div>
        </div>
      </div>
    </section>
  )
}
