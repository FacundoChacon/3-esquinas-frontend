/**
 * DonationsTable.jsx — Tabla de donaciones recientes
 *
 * Soporte dark mode. Datos del endpoint GET /api/dashboard/donantes.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useState, useEffect } from 'react'
import { dashboardService } from '../services/apiService'
import { useDarkMode } from '../context/DarkModeContext'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatCurrency(value) {
  return '$' + (Number(value) || 0).toLocaleString('es-AR')
}

const ESTADO_STYLES = {
  confirmado: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  pendiente: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  fallido: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

function getEstadoStyle(estado) {
  return ESTADO_STYLES[estado?.toLowerCase()] || 'bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
}

export default function DonationsTable({ compact = false }) {
  const { dark } = useDarkMode()
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const size = compact ? 5 : 10

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    dashboardService.getDonantes(page, size)
      .then((res) => {
        if (!cancelled) {
          if (Array.isArray(res)) { setData(res); setTotalPages(1) }
          else { setData(res.content || []); setTotalPages(res.totalPages || 1) }
        }
      })
      .catch(() => { if (!cancelled) setData([]) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [page, size])

  return (
    <div className={`rounded-xl overflow-hidden ${dark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
      <div className={`px-5 py-4 border-b ${dark ? 'border-gray-700' : 'border-gray-50'}`}>
        <h3 className={`text-sm font-bold ${dark ? 'text-gray-100' : 'text-gray-900'}`}>Últimos ingresos</h3>
      </div>

      <div className={`grid grid-cols-5 gap-0 text-[10px] font-semibold uppercase tracking-wider px-5 py-2.5 border-b ${
        dark ? 'bg-gray-700/50 text-gray-400 border-gray-700' : 'bg-gray-50 text-gray-500 border-gray-100'
      }`}>
        <span>Fecha</span><span>Donante</span><span>Concepto</span><span className="text-right">Monto</span><span className="text-right">Estado</span>
      </div>

      {loading ? (
        <div className={`px-5 py-8 text-center text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Cargando donaciones...</div>
      ) : data.length === 0 ? (
        <div className={`px-5 py-8 text-center text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>No hay donaciones registradas</div>
      ) : (
        data.map((row, i) => (
          <div key={row.id || i} className={`grid grid-cols-5 gap-0 text-xs px-5 py-3 transition-colors items-center ${
            dark ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50'
          } ${i < data.length - 1 ? `border-b ${dark ? 'border-gray-700' : 'border-gray-50'}` : ''}`}>
            <span className={dark ? 'text-gray-400' : 'text-gray-500'}>{formatDate(row.creadoEn)}</span>
            <span className={`font-medium truncate ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{row.donanteNombre || 'Anónimo'}</span>
            <span className={dark ? 'text-gray-400' : 'text-gray-600'}>{row.concepto || '—'}</span>
            <span className={`text-right font-semibold ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{formatCurrency(row.monto)}</span>
            <span className="text-right">
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${getEstadoStyle(row.estado)}`}>{row.estado || '—'}</span>
            </span>
          </div>
        ))
      )}

      {!compact && totalPages > 1 && (
        <div className={`flex items-center justify-between px-5 py-3 border-t ${dark ? 'border-gray-700' : 'border-gray-50'}`}>
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
            className={`text-xs disabled:opacity-30 ${dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>← Anterior</button>
          <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Página {page + 1} de {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
            className={`text-xs disabled:opacity-30 ${dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>Siguiente →</button>
        </div>
      )}
    </div>
  )
}
