/**
 * DonationsTable.jsx — Tabla de donaciones recientes
 *
 * Muestra las últimas donaciones con 5 columnas: Fecha, Donante,
 * Concepto, Monto, Estado. Con paginación.
 * Datos del endpoint GET /api/dashboard/donantes.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useState, useEffect } from 'react'
import { dashboardService } from '../services/apiService'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatCurrency(value) {
  const num = Number(value) || 0
  return '$' + num.toLocaleString('es-AR')
}

const ESTADO_STYLES = {
  confirmado: 'bg-emerald-50 text-emerald-700',
  pendiente: 'bg-amber-50 text-amber-700',
  fallido: 'bg-red-50 text-red-700',
}

function getEstadoStyle(estado) {
  return ESTADO_STYLES[estado?.toLowerCase()] || 'bg-gray-50 text-gray-600'
}

export default function DonationsTable({ compact = false }) {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const size = compact ? 5 : 10

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    dashboardService
      .getDonantes(page, size)
      .then((res) => {
        if (!cancelled) {
          if (Array.isArray(res)) {
            setData(res)
            setTotalPages(1)
          } else {
            setData(res.content || [])
            setTotalPages(res.totalPages || 1)
          }
        }
      })
      .catch(() => {
        if (!cancelled) setData([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [page, size])

  return (
    <div className="rounded-xl bg-white border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50">
        <h3 className="text-sm font-bold text-gray-900">Últimos ingresos</h3>
      </div>

      {/* Header de columnas */}
      <div className="grid grid-cols-5 gap-0 text-[10px] font-semibold uppercase tracking-wider px-5 py-2.5 bg-gray-50 text-gray-500 border-b border-gray-100">
        <span>Fecha</span>
        <span>Donante</span>
        <span>Concepto</span>
        <span className="text-right">Monto</span>
        <span className="text-right">Estado</span>
      </div>

      {/* Filas */}
      {loading ? (
        <div className="px-5 py-8 text-center text-sm text-gray-400">
          Cargando donaciones...
        </div>
      ) : data.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-gray-400">
          No hay donaciones registradas
        </div>
      ) : (
        <div>
          {data.map((row, i) => (
            <div
              key={row.id || i}
              className={`grid grid-cols-5 gap-0 text-xs px-5 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                i < data.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              <span className="text-gray-500">{formatDate(row.creadoEn)}</span>
              <span className="font-medium text-gray-900 truncate">{row.donanteNombre || 'Anónimo'}</span>
              <span className="text-gray-600 truncate">{row.concepto || '—'}</span>
              <span className="text-right font-semibold text-gray-900">{formatCurrency(row.monto)}</span>
              <span className="text-right">
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${getEstadoStyle(row.estado)}`}>
                  {row.estado || '—'}
                </span>
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {!compact && totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          <span className="text-xs text-gray-400">
            Página {page + 1} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  )
}
