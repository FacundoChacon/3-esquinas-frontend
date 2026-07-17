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

  if (transferencia) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 sm:px-6 h-14 max-w-6xl mx-auto">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="w-8 h-8 rounded-lg object-contain" />
              <span className="text-sm font-bold text-gray-900">3 Esquinas</span>
            </Link>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Datos de transferencia</h2>
              <p className="text-sm text-gray-500 mt-1">
                Realizá la transferencia con estos datos y tu donación quedará registrada.
              </p>
            </div>

            <div className="space-y-3">
              <InfoRow label="Monto" value={`$${Number(transferencia.monto).toLocaleString('es-AR')}`} />
              <InfoRow label="Estado" value={transferencia.estado} badge />
              <InfoRow label="CVU" value={transferencia.cvu} />
              <InfoRow label="Alias" value={transferencia.alias} />
              <InfoRow label="Banco" value={transferencia.banco} />
              <InfoRow label="Titular" value={transferencia.titular} />
              <InfoRow label="CUIT" value={transferencia.cuit} />
              {transferencia.concepto && <InfoRow label="Concepto" value={transferencia.concepto} />}
            </div>

            <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs text-amber-700 leading-relaxed">
                Importante: incluí tu nombre o email en la descripción de la transferencia para que podamos identificar tu donación.
              </p>
            </div>

            <Link
              to="/"
              className="mt-5 w-full h-11 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 sm:px-6 h-14 max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/images/logo-3esquinas.png" alt="3 Esquinas" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-sm font-bold text-gray-900">3 Esquinas</span>
          </Link>
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Volver
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-start justify-center p-4 sm:py-10">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sumate con tu donación</h1>
            <p className="text-sm text-gray-500 mt-2">Elegí el monto y medio de pago. Tu aporte transforma vidas.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 space-y-5">

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Monto */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Monto (ARS)</label>
              <div className="flex gap-2 mb-2">
                {MONTOS_SUGERIDOS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => update('monto', String(m))}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                      form.monto === String(m)
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                    }`}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Concepto */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Concepto <span className="font-normal text-gray-400">(opcional)</span></label>
              <input
                type="text"
                placeholder="Ej: Donación mensual, Ayuda comunitaria..."
                value={form.concepto}
                onChange={(e) => update('concepto', e.target.value)}
                maxLength={255}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Medio de pago */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Medio de pago</label>
              <div className="space-y-2">
                {PASARELAS.map((p) => (
                  <label
                    key={p.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      form.pasarela === p.id
                        ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pasarela"
                      value={p.id}
                      checked={form.pasarela === p.id}
                      onChange={(e) => update('pasarela', e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-xl">{p.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900">{p.label}</div>
                      <div className="text-xs text-gray-500">{p.desc}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      form.pasarela === p.id ? 'border-emerald-500' : 'border-gray-300'
                    }`}>
                      {form.pasarela === p.id && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Datos del donante */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Datos del donante <span className="font-normal text-gray-400">(opcional)</span></label>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={form.donanteNombre}
                  onChange={(e) => update('donanteNombre', e.target.value)}
                  maxLength={150}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.donanteEmail}
                  onChange={(e) => update('donanteEmail', e.target.value)}
                  maxLength={255}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={form.donanteTelefono}
                  onChange={(e) => update('donanteTelefono', e.target.value)}
                  maxLength={50}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                />
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={form.donanteTipoDocumento}
                    onChange={(e) => update('donanteTipoDocumento', e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 text-sm bg-white"
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
                    className="col-span-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors"
            >
              {loading ? (
                <span className="flex items-center gap-2">
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
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      {badge ? (
        <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{value}</span>
      ) : (
        <span className="text-sm font-medium text-gray-900 text-right">{value}</span>
      )}
    </div>
  )
}
