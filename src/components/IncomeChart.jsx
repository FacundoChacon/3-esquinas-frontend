/**
 * IncomeChart.jsx — Gráfico de barras de ingresos mensuales
 *
 * Soporte dark mode. Datos del endpoint GET /api/dashboard/ingresos.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useState, useEffect } from 'react'
import { dashboardService } from '../services/apiService'
import { useDarkMode } from '../context/DarkModeContext'
import { formatMonth } from '../utils/formatters'

export default function IncomeChart() {
  const { dark } = useDarkMode()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const mode = dark ? 'dark' : 'light'

  useEffect(() => {
    let cancelled = false
    dashboardService.getIngresos()
      .then((res) => { if (!cancelled && Array.isArray(res)) setData(res) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const max = Math.max(
    ...data.map((d) => Number(d.totalArs) || 0),
    ...data.map((d) => Number(d.totalUsd) || 0),
    1
  )

  if (loading) {
    return (
      <div className={`chart-container ${mode}`}>
        <div className={`chart-loading-bar ${mode}`} />
        <div className={`h-40 rounded-xl animate-pulse ${dark ? 'bg-gray-700' : 'bg-gray-50'}`} />
      </div>
    )
  }

  const totalArs = data.reduce((sum, d) => sum + (Number(d.totalArs) || 0), 0)
  const totalUsd = data.reduce((sum, d) => sum + (Number(d.totalUsd) || 0), 0)

  return (
    <div className={`chart-container ${mode}`}>
      <h3 className={`chart-title ${mode}`}>Ingresos mensuales</h3>

      <div className="flex items-center gap-4 mb-3 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> ARS
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-sky-500 inline-block" /> USD
        </span>
      </div>

      {error && <div className="text-xs text-amber-500 mb-2">Error al cargar datos: {error}</div>}
      {data.length === 0 ? (
        <div className={`h-40 flex items-center justify-center text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Sin datos de ingresos</div>
      ) : (
        <div className="chart-bars">
          {data.map((item, i) => {
            const pctArs = Math.max((Number(item.totalArs) || 0) / max * 100, item.totalArs > 0 ? 2 : 0)
            const pctUsd = Math.max((Number(item.totalUsd) || 0) / max * 100, item.totalUsd > 0 ? 2 : 0)
            return (
              <div key={item.mes || i} className="flex-1 flex flex-col items-center gap-1.5 min-w-0 group relative">
                <div className="chart-tooltip">
                  {formatMonth(item.mes)} — ARS: ${Number(item.totalArs || 0).toLocaleString('es-AR')} · USD: ${Number(item.totalUsd || 0).toLocaleString('es-AR')}
                </div>
                <div className="flex items-end gap-0.5">
                  <div
                    className="chart-bar"
                    style={{ height: `${pctArs}%`, background: '#10b981', opacity: 0.4 + (i / data.length) * 0.6 }}
                  />
                  <div
                    className="chart-bar"
                    style={{ height: `${pctUsd}%`, background: '#0ea5e9', opacity: 0.4 + (i / data.length) * 0.6 }}
                  />
                </div>
                <span className={`chart-month-label ${mode}`}>
                  {formatMonth(item.mes)}
                </span>
              </div>
            )
          })}
        </div>
      )}

      <div className={`chart-footer ${mode}`}>
        <span className={`chart-footer-period ${mode}`}>Últimos {data.length} meses</span>
        <span className="chart-footer-total">
          Total: ${totalArs.toLocaleString('es-AR')} ARS · US$ {totalUsd.toLocaleString('es-AR')} USD
        </span>
      </div>
    </div>
  )
}
