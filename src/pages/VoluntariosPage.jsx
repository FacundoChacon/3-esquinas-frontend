/**
 * VoluntariosPage.jsx — Bandeja de voluntarios
 *
 * Lista las personas que completaron el formulario de colaboración
 * (GET /api/voluntarios, paginado). Permite eliminar (soft delete).
 * Requiere rol ADMIN.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useState, useEffect, useCallback } from 'react'
import { voluntarioService } from '../services/apiService'
import { useDarkMode } from '../context/DarkModeContext'
import { formatDate } from '../utils/formatters'

const COMO_SE_ENTERO_LABELS = {
  redes_sociales: 'Redes sociales',
  boca_a_boca: 'Boca a boca',
  evento: 'Evento',
  medios: 'Medios',
  internet: 'Internet',
  otro: 'Otro',
}

export default function VoluntariosPage() {
  const { dark } = useDarkMode()
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [actionError, setActionError] = useState('')
  const mode = dark ? 'dark' : 'light'
  const size = 20

  const fetchData = useCallback(async (signal) => {
    setLoading(true)
    const aborted = () => signal && signal.aborted
    try {
      const res = await voluntarioService.listar(page, size)
      if (!aborted()) {
        if (Array.isArray(res)) { setData(res); setTotalPages(1); setTotal(res.length) }
        else { setData(res.content || []); setTotalPages(res.totalPages || 1); setTotal(res.totalElements || 0) }
      }
    } catch {
      if (!aborted()) setData([])
    } finally {
      if (!aborted()) setLoading(false)
    }
  }, [page, size])

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller.signal)
    return () => controller.abort()
  }, [fetchData])

  const handleEliminar = async (id) => {
    setActionError('')
    if (!window.confirm('¿Eliminar este voluntario?')) return
    try {
      await voluntarioService.eliminar(id)
      fetchData()
    } catch (err) {
      setActionError(err.message || 'Error al eliminar el voluntario')
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-1">
        <h1 className={`text-xl font-bold ${dark ? 'text-gray-100' : 'text-gray-900'}`}>Voluntarios</h1>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          {total} registrados
        </span>
      </div>
      <p className={`text-sm mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Personas que completaron el formulario de colaboración</p>

      <div className={`donations-table ${mode}`}>
        <div className={`donations-table-header ${mode}`}>
          <h3 className={`donations-table-title ${mode}`}>Bandeja de voluntarios</h3>
        </div>

        {actionError && <div className={`mx-4 mt-3 px-3 py-2 rounded-lg text-sm bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400`}>{actionError}</div>}

        <div className={`voluntarios-table-head ${mode}`}>
          <span>Nombre</span><span>DNI</span><span>Teléfono</span><span>Email</span><span>¿Cómo se enteró?</span><span>Empresa</span><span>Alta</span><span className="text-right">Acciones</span>
        </div>

        {loading ? (
          <div className={`donations-table-empty ${mode}`}>Cargando voluntarios...</div>
        ) : data.length === 0 ? (
          <div className={`donations-table-empty ${mode}`}>No hay voluntarios registrados</div>
        ) : (
          data.map((row, i) => (
            <div key={row.id || i} className={`voluntarios-table-row ${mode} ${i < data.length - 1 ? `donations-table-row-border ${mode}` : ''}`}>
              <span className={`font-medium truncate ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
                {`${row.nombre || ''} ${row.apellido || ''}`.trim() || '—'}
              </span>
              <span className={`truncate ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{row.dni || '—'}</span>
              <span className={`truncate ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{row.telefono || '—'}</span>
              <span className={`truncate ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{row.email || '—'}</span>
              <span>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400`}>
                  {COMO_SE_ENTERO_LABELS[row.comoSeEntero] || '—'}
                </span>
              </span>
              <span className={`truncate ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{row.empresa || '—'}</span>
              <span className={`truncate ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{formatDate(row.creadoEn)}</span>
              <span className="text-right">
                <button onClick={() => handleEliminar(row.id)} className={`text-[11px] font-medium px-2 py-1 rounded-md transition-colors ${dark ? 'text-red-400 hover:bg-red-900/40' : 'text-red-700 hover:bg-red-50'}`} title="Eliminar voluntario">
                  Eliminar
                </button>
              </span>
            </div>
          ))
        )}

        {totalPages > 1 && (
          <div className={`table-pagination ${mode}`}>
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className={`table-pagination-btn ${mode}`}>← Anterior</button>
            <span className={`table-pagination-info ${mode}`}>Página {page + 1} de {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className={`table-pagination-btn ${mode}`}>Siguiente →</button>
          </div>
        )}
      </div>
    </div>
  )
}
