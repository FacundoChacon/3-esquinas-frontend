import { useState } from 'react'
import { Link } from 'react-router-dom'
import { donacionService } from '../services/donacionService'

const PASARELAS = [
  { id: 'transferencia', label: 'Transferencia bancaria', icon: '🏦', desc: 'Transferí directamente a nuestra cuenta' },
  { id: 'mercadopago', label: 'Mercado Pago', icon: '💳', desc: 'Pagá con tarjeta, débito o cuenta MP' },
  { id: 'payPal', label: 'PayPal', icon: '🌐', desc: 'Donación internacional en USD' },
]

const MONTOS_SUGERIDOS = [1000, 2000, 5000, 10000]

export default function DonatePage() {
  const [form, setForm] = useState({
    monto: '',
    concepto: '',
    pasarela: 'transferencia',
    donanteNombre: '',
    donanteEmail: '',
    donanteTelefono: '',
    donanteTipoDocumento: '',
    donanteNumeroDocumento: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [transferencia, setTransferencia] = useState(null)

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.monto || parseFloat(form.monto) < 1) {
      setError('El monto mínimo es $1.00')
      return
    }

    setLoading(true)
    try {
      const payload = {
        monto: parseFloat(form.monto),
        pasarela: form.pasarela,
        concepto: form.concepto || null,
        donanteNombre: form.donanteNombre || null,
        donanteEmail: form.donanteEmail || null,
        donanteTelefono: form.donanteTelefono || null,
        donanteTipoDocumento: form.donanteTipoDocumento || null,
        donanteNumeroDocumento: form.donanteNumeroDocumento || null,
      }

      if (form.pasarela === 'transferencia') {
        const res = await donacionService.crearTransferencia(payload)
        setTransferencia(res)
      } else if (form.pasarela === 'mercadopago') {
        const res = await donacionService.crearMercadoPago(payload)
        window.location.href = res.init_point || res.sandbox_init_point
      } else if (form.pasarela === 'payPal') {
        const res = await donacionService.crearPayPal(payload)
        window.location.href = res.approval_url
      }
    } catch (err) {
      setError(err.message || 'Error al procesar la donación')
    } finally {
      setLoading(false)
    }
  }

  /* ========== VISTA: CONFIRMACIÓN DE TRANSFERENCIA ========== */
  if (transferencia) {
    return (
    <div className="donate-page">
        <nav className="donate-nav">
          <div className="donate-nav-inner">
            <Link to="/" className="donate-nav-logo">
              <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="donate-nav-logo-img" />
              <span className="donate-nav-logo-text">3 Esquinas</span>
            </Link>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="donate-transfer-card">
            <div className="donate-transfer-header">
              <div className="donate-transfer-check">
                <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="donate-transfer-title">Datos de transferencia</h2>
              <p className="donate-transfer-subtitle">
                Realizá la transferencia con estos datos y tu donación quedará registrada.
              </p>
            </div>

            <div className="donate-transfer-data">
              <InfoRow label="Monto" value={`$${Number(transferencia.monto).toLocaleString('es-AR')}`} />
              <InfoRow label="Estado" value={transferencia.estado} badge />
              <InfoRow label="CVU" value={transferencia.cvu} />
              <InfoRow label="Alias" value={transferencia.alias} />
              <InfoRow label="Banco" value={transferencia.banco} />
              <InfoRow label="Titular" value={transferencia.titular} />
              <InfoRow label="CUIT" value={transferencia.cuit} />
              {transferencia.concepto && <InfoRow label="Concepto" value={transferencia.concepto} />}
            </div>

            <div className="donate-transfer-warning">
              <p className="donate-transfer-warning-text">
                Importante: incluí tu nombre o email en la descripción de la transferencia para que podamos identificar tu donación.
              </p>
            </div>

            <Link to="/" className="donate-transfer-back">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ========== VISTA: FORMULARIO DE DONACIÓN ========== */
  return (
    <div className="donate-page">
      <nav className="donate-nav">
        <div className="donate-nav-inner">
          <Link to="/" className="donate-nav-logo">
            <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="donate-nav-logo-img" />
            <span className="donate-nav-logo-text">3 Esquinas</span>
          </Link>
          <Link to="/" className="donate-nav-back">Volver</Link>
        </div>
      </nav>

      <div className="donate-form-container">
        <div className="donate-form-wrapper">
          <div className="text-center mb-6">
            <div className="donate-form-heart">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <h1 className="donate-form-title">Sumate con tu donación</h1>
            <p className="donate-form-subtitle">Elegí el monto y medio de pago. Tu aporte transforma vidas en Maipú.</p>
          </div>

          <form onSubmit={handleSubmit} className="donate-form-card">

            {error && <div className="donate-form-error">{error}</div>}

            {/* Monto */}
            <div>
              <label className="donate-form-label">Monto (ARS)</label>
              <div className="donate-amount-grid">
                {MONTOS_SUGERIDOS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => update('monto', String(m))}
                    className={`donate-amount-btn ${form.monto === String(m) ? 'active' : ''}`}
                  >
                    ${m.toLocaleString('es-AR')}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="Otro monto"
                value={form.monto}
                onChange={(e) => update('monto', e.target.value)}
                required
                className="donate-form-input"
              />
            </div>

            {/* Concepto */}
            <div>
              <label className="donate-form-label">
                Concepto <span className="donate-form-label-optional">(opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Ej: Donación mensual, Ayuda comunitaria..."
                value={form.concepto}
                onChange={(e) => update('concepto', e.target.value)}
                maxLength={255}
                className="donate-form-input"
              />
            </div>

            {/* Medio de pago */}
            <div>
              <label className="donate-form-label">Medio de pago</label>
              <div className="donate-payment-options">
                {PASARELAS.map((p) => (
                  <label
                    key={p.id}
                    className={`donate-payment-option ${form.pasarela === p.id ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="pasarela"
                      value={p.id}
                      checked={form.pasarela === p.id}
                      onChange={(e) => update('pasarela', e.target.value)}
                      className="sr-only"
                    />
                    <span className="donate-payment-icon">{p.icon}</span>
                    <div className="donate-payment-text">
                      <div className="donate-payment-label">{p.label}</div>
                      <div className="donate-payment-desc">{p.desc}</div>
                    </div>
                    <div className={`donate-payment-radio ${form.pasarela === p.id ? 'selected' : ''}`}>
                      {form.pasarela === p.id && <div className="donate-payment-radio-dot" />}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Datos del donante */}
            <div>
              <label className="donate-form-label">
                Datos del donante <span className="donate-form-label-optional">(opcional)</span>
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={form.donanteNombre}
                  onChange={(e) => update('donanteNombre', e.target.value)}
                  maxLength={150}
                  className="donate-form-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.donanteEmail}
                  onChange={(e) => update('donanteEmail', e.target.value)}
                  maxLength={255}
                  className="donate-form-input"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={form.donanteTelefono}
                  onChange={(e) => update('donanteTelefono', e.target.value)}
                  maxLength={50}
                  className="donate-form-input"
                />
                <div className="donate-doc-grid">
                  <select
                    value={form.donanteTipoDocumento}
                    onChange={(e) => update('donanteTipoDocumento', e.target.value)}
                    className="donate-doc-select"
                  >
                    <option value="">Doc.</option>
                    <option value="DNI">DNI</option>
                    <option value="CUIT">CUIT</option>
                    <option value="CUIL">CUIL</option>
                    <option value="RUT">RUT</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                  <input
                    type="text"
                    placeholder="N° documento"
                    value={form.donanteNumeroDocumento}
                    onChange={(e) => update('donanteNumeroDocumento', e.target.value)}
                    maxLength={50}
                    className="col-span-2 donate-form-input"
                  />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="donate-submit-btn">
              {loading ? (
                <span className="donate-submit-spinner">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Procesando...
                </span>
              ) : (
                'Donar ahora'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value, badge }) {
  return (
    <div className="donate-info-row">
      <span className="donate-info-label">{label}</span>
      {badge ? (
        <span className="donate-info-badge">{value}</span>
      ) : (
        <span className="donate-info-value">{value}</span>
      )}
    </div>
  )
}
