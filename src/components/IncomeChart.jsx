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

function formatMonth(mes) {
  if (!mes) return ''
  const [, month] = mes.split('-')
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return months[parseInt(month, 10) - 1] || mes
}

export default function IncomeChart() {
  const { dark } = useDarkMode()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const mode = dark ? 'dark' : 'light'

  useEffect(() => {
    let cancelled = false
    dashboardService.getIngresos()
      .then((res) => { if (!cancelled && Array.isArray(res)) setData(res) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const max = Math.max(...data.map((d) => Number(d.total) || 0), 1)

  if (loading) {
    return (
      <div className={`chart-container ${mode}`}>
        <div className={`chart-loading-bar ${mode}`} />
        <div className={`h-40 rounded-xl animate-pulse ${dark ? 'bg-gray-700' : 'bg-gray-50'}`} />
      </div>
    )
  }

  return (
    <div className={`chart-container ${mode}`}>
      <h3 className={`chart-title ${mode}`}>Ingresos mensuales</h3>

      {data.length === 0 ? (
        <div className={`h-40 flex items-center justify-center text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Sin datos de ingresos</div>
      ) : (
        <div className="chart-bars">
          {data.map((item, i) => {
            const pct = Math.max((Number(item.total) || 0) / max * 100, 2)
            return (
              <div key={item.mes || i} className="flex-1 flex flex-col items-center gap-1.5 min-w-0 group relative">
                <div className="chart-tooltip">
                  {formatMonth(item.mes)}: ${Number(item.total || 0).toLocaleString('es-AR')}
                </div>
                <div
                  className="chart-bar"
                  style={{ height: `${pct}%`, opacity: 0.4 + (i / data.length) * 0.6 }}
                />
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
          Total: ${data.reduce((sum, d) => sum + (Number(d.total) || 0), 0).toLocaleString('es-AR')}
        </span>
      </div>
    </div>
  )
}
