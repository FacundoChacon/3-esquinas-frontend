/**
 * IncomeChart.jsx — Gráfico de barras de ingresos mensuales
 *
 * Muestra los últimos 12 meses de ingresos en un gráfico de barras CSS.
 * Datos reales del endpoint GET /api/dashboard/ingresos.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useState, useEffect } from 'react'
import { dashboardService } from '../services/apiService'

function formatMonth(mes) {
  if (!mes) return ''
  const [year, month] = mes.split('-')
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return months[parseInt(month, 10) - 1] || mes
}

function formatShortCurrency(value) {
  const num = Number(value) || 0
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`
  return `$${num}`
}

export default function IncomeChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    dashboardService
      .getIngresos()
      .then((res) => {
        if (!cancelled && Array.isArray(res)) setData(res)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const max = Math.max(...data.map((d) => Number(d.total) || 0), 1)

  if (loading) {
    return (
      <div className="rounded-xl bg-white border border-gray-100 p-5">
        <div className="h-4 bg-gray-100 rounded w-36 mb-4 animate-pulse" />
        <div className="h-40 bg-gray-50 rounded-xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white border border-gray-100 p-5">
      <h3 className="text-sm font-bold text-gray-900 mb-4">Ingresos mensuales</h3>

      {data.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
          Sin datos de ingresos
        </div>
      ) : (
        <div className="flex items-end gap-1.5 h-44 px-1 pt-2">
          {data.map((item, i) => {
            const pct = Math.max((Number(item.total) || 0) / max * 100, 2)
            return (
              <div key={item.mes || i} className="flex-1 flex flex-col items-center gap-1.5 min-w-0 group relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {formatMonth(item.mes)}: ${Number(item.total || 0).toLocaleString('es-AR')}
                </div>
                <div
                  className="w-full rounded-t-md bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
                  style={{ height: `${pct}%`, opacity: 0.4 + (i / data.length) * 0.6 }}
                />
                <span className="text-[9px] text-gray-400 truncate w-full text-center">
                  {formatMonth(item.mes)}
                </span>
              </div>
            )
          })}
        </div>
      )}

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
        <span className="text-[11px] text-gray-400">Últimos {data.length} meses</span>
        <span className="text-[11px] font-medium text-emerald-600">
          Total: ${data.reduce((sum, d) => sum + (Number(d.total) || 0), 0).toLocaleString('es-AR')}
        </span>
      </div>
    </div>
  )
}
