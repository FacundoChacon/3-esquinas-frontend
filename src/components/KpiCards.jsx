/**
 * KpiCards.jsx — Tarjetas de indicadores clave (KPIs)
 *
 * Muestra 4 cards: Total recaudado, Donantes activos,
 * Cupones emitidos, Última donación.
 * Soporte dark mode.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useState, useEffect } from 'react'
import { dashboardService } from '../services/apiService'
import { useDarkMode } from '../context/DarkModeContext'

const FALLBACK_KPIS = {
  totalRecaudado: 0,
  donantesRegistrados: 0,
  cuponesEmitidos: 0,
  ultimaDonacion: null,
}

function formatCurrency(value) {
  const num = Number(value) || 0
  return '$' + num.toLocaleString('es-AR')
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const KPI_CONFIGS = [
  {
    key: 'totalRecaudado',
    label: 'Total recaudado',
    color: '#10b981',
    bgClass: 'bg-emerald-50 dark:bg-emerald-900/30',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    format: formatCurrency,
    dataKey: 'totalRecaudado',
  },
  {
    key: 'donantesActivos',
    label: 'Donantes activos',
    color: '#3b82f6',
    bgClass: 'bg-blue-50 dark:bg-blue-900/30',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    format: (v) => v,
    dataKey: 'donantesRegistrados',
  },
  {
    key: 'cuponesEmitidos',
    label: 'Cupones emitidos',
    color: '#f59e0b',
    bgClass: 'bg-amber-50 dark:bg-amber-900/30',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
      </svg>
    ),
    format: (v) => v,
    dataKey: 'cuponesEmitidos',
  },
  {
    key: 'ultimaDonacion',
    label: 'Última donación',
    color: '#8b5cf6',
    bgClass: 'bg-violet-50 dark:bg-violet-900/30',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    format: formatDate,
    dataKey: 'ultimaDonacion',
  },
]

export default function KpiCards() {
  const { dark } = useDarkMode()
  const [kpis, setKpis] = useState(FALLBACK_KPIS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    dashboardService
      .getKpis()
      .then((data) => { if (!cancelled) setKpis(data) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const mode = dark ? 'dark' : 'light'

  if (loading) {
    return (
      <div className="kpi-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`kpi-card ${mode}`}>
            <div className={`h-3 rounded w-24 mb-3 ${dark ? 'bg-gray-700' : 'bg-gray-100'}`} />
            <div className={`h-7 rounded w-20 mb-2 ${dark ? 'bg-gray-700' : 'bg-gray-100'}`} />
            <div className={`h-2 rounded w-16 ${dark ? 'bg-gray-700' : 'bg-gray-50'}`} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="kpi-grid">
      {KPI_CONFIGS.map((cfg) => (
        <div key={cfg.key} className={`kpi-card ${mode}`}>
          <div className="kpi-card-header">
            <span className={`kpi-card-label ${mode}`}>{cfg.label}</span>
            <div className={`kpi-card-icon ${cfg.bgClass}`} style={{ color: cfg.color }}>
              {cfg.icon}
            </div>
          </div>
          <div className={`kpi-card-value ${mode}`} style={{ color: cfg.color }}>
            {cfg.format(kpis[cfg.dataKey])}
          </div>
          {error && <div className="text-[10px] text-amber-500 mt-1">Datos de demostración</div>}
        </div>
      ))}
    </div>
  )
}
