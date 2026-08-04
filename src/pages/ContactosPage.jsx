/**
 * ContactosPage.jsx — Bandeja de mensajes de contacto
 *
 * Lista los mensajes enviados desde el formulario del landing
 * (GET /api/contactos). Permite marcar como leído y eliminar (soft delete).
 * Requiere rol ADMIN.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useState, useEffect, useCallback } from 'react'
import { contactService } from '../services/apiService'
import { useDarkMode } from '../context/DarkModeContext'
import { formatDate } from '../utils/formatters'

export default function ContactosPage() {
  const { dark } = useDarkMode()
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [noLeidos, setNoLeidos] = useState(0)
  const [loading, setLoading] = useState(true)
  const [actionError, setActionError] = useState('')
  const mode = dark ? 'dark' : 'light'
  const size = 20

  const fetchData = useCallback(async (signal) => {
    setLoading(true)
    const aborted = () => signal && signal.aborted
    try {
      const res = await contactService.listar(page, size)
      if (!aborted()) {
        if (Array.isArray(res)) { setData(res); setTotalPages(1) }
        else { setData(res.content || []); setTotalPages(res.totalPages || 1) }
      }
    } catch {
      if (!aborted()) setData([])
    } finally {
      if (!aborted()) setLoading(false)
    }
  }, [page, size])

  const fetchNoLeidos = useCallback(async () => {
    try {
      const res = await contactService.contarNoLeidos()
      setNoLeidos((res && res.count) || 0)
    } catch {
      setNoLeidos(0)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller.signal)
    return () => controller.abort()
  }, [fetchData])

  useEffect(() => {
    fetchNoLeidos()
  }, [fetchNoLeidos])

  const handleMarcarLeido = async (id) => {
    setActionError('')
    try {
      await contactService.marcarLeido(id)
      fetchNoLeidos()
      fetchData()
    } catch (err) {
      setActionError(err.message || 'Error al marcar el mensaje como leído')
    }
  }

  const handleEliminar = async (id) => {
    setActionError('')
    if (!window.confirm('¿Eliminar este mensaje?')) return
    try {
      await contactService.eliminar(id)
      fetchNoLeidos()
      fetchData()
    } catch (err) {
      setActionError(err.message || 'Error al eliminar el mensaje')
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-1">
        <h1 className={`text-xl font-bold ${dark ? 'text-gray-100' : 'text-gray-900'}`}>Mensajes de contacto</h1>
        {noLeidos > 0 && (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            {noLeidos} sin leer
          </span>
        )}
      </div>
      <p className={`text-sm mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Formularios enviados desde el sitio</p>

      <div className={`donations-table ${mode}`}>
        <div className={`donations-table-header ${mode}`}>
          <h3 className={`donations-table-title ${mode}`}>Bandeja de mensajes</h3>
        </div>

        {actionError && <div className={`mx-4 mt-3 px-3 py-2 rounded-lg text-sm bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400`}>{actionError}</div>}

        <div className={`contactos-table-head ${mode}`}>
          <span>Fecha</span><span>Nombre</span><span>Email</span><span>Asunto</span><span>Mensaje</span><span className="text-right">Estado</span><span className="text-right">Acciones</span>
        </div>

        {loading ? (
          <div className={`donations-table-empty ${mode}`}>Cargando mensajes...</div>
        ) : data.length === 0 ? (
          <div className={`donations-table-empty ${mode}`}>No hay mensajes de contacto</div>
        ) : (
          data.map((row, i) => (
            <div key={row.id || i} className={`contactos-table-row ${mode} ${i < data.length - 1 ? `donations-table-row-border ${mode}` : ''}`}>
              <span className={dark ? 'text-gray-400' : 'text-gray-500'}>{formatDate(row.creadoEn)}</span>
              <span className={`font-medium truncate ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{row.nombre || '—'}</span>
              <span className={`truncate ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{row.email || '—'}</span>
              <span className={`truncate font-medium ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{row.asunto || '—'}</span>
              <span className={`truncate ${dark ? 'text-gray-400' : 'text-gray-600'}`} title={row.mensaje}>{row.mensaje || '—'}</span>
              <span className="text-right">
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${row.leido
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                  {row.leido ? 'Leído' : 'Sin leer'}
                </span>
              </span>
              <span className="text-right space-x-2 whitespace-nowrap">
                {!row.leido && (
                  <button onClick={() => handleMarcarLeido(row.id)} className={`text-[11px] font-medium px-2 py-1 rounded-md transition-colors ${dark ? 'text-emerald-400 hover:bg-emerald-900/40' : 'text-emerald-700 hover:bg-emerald-50'}`} title="Marcar como leído">
                    Leído
                  </button>
                )}
                <button onClick={() => handleEliminar(row.id)} className={`text-[11px] font-medium px-2 py-1 rounded-md transition-colors ${dark ? 'text-red-400 hover:bg-red-900/40' : 'text-red-700 hover:bg-red-50'}`} title="Eliminar mensaje">
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
