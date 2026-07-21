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
  const mode = dark ? 'dark' : 'light'

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
    <div className={`donations-table ${mode}`}>
      <div className={`donations-table-header ${mode}`}>
        <h3 className={`donations-table-title ${mode}`}>Últimos ingresos</h3>
      </div>

      {/* Encabezados de columna */}
      <div className={`donations-table-head ${mode}`}>
        <span>Fecha</span><span>Donante</span><span>Concepto</span><span className="text-right">Monto</span><span className="text-right">Estado</span>
      </div>

      {loading ? (
        <div className={`donations-table-empty ${mode}`}>Cargando donaciones...</div>
      ) : data.length === 0 ? (
        <div className={`donations-table-empty ${mode}`}>No hay donaciones registradas</div>
      ) : (
        data.map((row, i) => (
          <div key={row.id || i} className={`donations-table-row ${mode} ${i < data.length - 1 ? `donations-table-row-border ${mode}` : ''}`}>
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
        <div className={`table-pagination ${mode}`}>
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className={`table-pagination-btn ${mode}`}>← Anterior</button>
          <span className={`table-pagination-info ${mode}`}>Página {page + 1} de {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className={`table-pagination-btn ${mode}`}>Siguiente →</button>
        </div>
      )}
    </div>
  )
}
