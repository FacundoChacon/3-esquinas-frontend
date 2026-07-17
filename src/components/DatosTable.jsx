/**
 * DatosTable.jsx — Tabla de datos de control con CRUD
 *
 * Soporte dark mode. Datos del endpoint GET /api/datos.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useState, useEffect, useCallback } from 'react'
import { datosService } from '../services/apiService'
import { useDarkMode } from '../context/DarkModeContext'

const EMPTY_FORM = { descripcion: '', valor: '', categoria: '' }

export default function DatosTable() {
  const { dark } = useDarkMode()
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [filterCat, setFilterCat] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      let res = filterCat ? await datosService.getByCategoria(filterCat) : await datosService.getAll(page, 10)
      if (Array.isArray(res)) { setData(res); setTotalPages(1) }
      else { setData(res.content || []); setTotalPages(res.totalPages || 1) }
    } catch { setData([]) } finally { setLoading(false) }
  }, [page, filterCat])

  useEffect(() => { fetchData() }, [fetchData])

  const handleOpenNew = () => { setForm(EMPTY_FORM); setEditingId(null); setShowForm(true); setError('') }
  const handleEdit = (row) => { setForm({ descripcion: row.descripcion || '', valor: row.valor || '', categoria: row.categoria || '' }); setEditingId(row.id); setShowForm(true); setError('') }
  const handleCancel = () => { setShowForm(false); setEditingId(null); setForm(EMPTY_FORM); setError('') }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.descripcion.trim()) { setError('La descripción es obligatoria'); return }
    setSaving(true); setError('')
    try {
      editingId ? await datosService.actualizar(editingId, form) : await datosService.crear(form)
      handleCancel(); fetchData()
    } catch (err) { setError(err.message || 'Error al guardar') } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este registro?')) return
    try { await datosService.eliminar(id); fetchData() } catch (err) { alert(err.message || 'Error al eliminar') }
  }

  const inputCls = `w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
    dark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-200 text-gray-900'
  }`

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button onClick={handleOpenNew} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Nuevo registro
        </button>
        <select value={filterCat} onChange={(e) => { setFilterCat(e.target.value); setPage(0) }}
          className={`text-sm border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
            dark ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200 text-gray-700 bg-white'
          }`}>
          <option value="">Todas las categorías</option>
          <option value="general">General</option>
          <option value="proyectos">Proyectos</option>
          <option value="finanzas">Finanzas</option>
          <option value="donantes">Donantes</option>
        </select>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className={`rounded-xl shadow-2xl w-full max-w-md ${dark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`px-6 py-4 border-b ${dark ? 'border-gray-700' : 'border-gray-100'}`}>
              <h3 className={`text-base font-bold ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{editingId ? 'Editar registro' : 'Nuevo registro'}</h3>
            </div>
            <form onSubmit={handleSave} className="px-6 py-4 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Descripción *</label>
                <input type="text" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className={inputCls} placeholder="Descripción del registro" autoFocus />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Valor</label>
                <input type="text" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} className={inputCls} placeholder="Valor (opcional)" />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Categoría</label>
                <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className={inputCls}>
                  <option value="">Sin categoría</option>
                  <option value="general">General</option>
                  <option value="proyectos">Proyectos</option>
                  <option value="finanzas">Finanzas</option>
                  <option value="donantes">Donantes</option>
                </select>
              </div>
              {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg text-sm">{error}</div>}
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={handleCancel} className={`px-4 py-2 text-sm rounded-lg transition-colors ${dark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>Cancelar</button>
                <button type="submit" disabled={saving} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 rounded-lg transition-colors">
                  {saving ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={`rounded-xl overflow-hidden ${dark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
        <div className={`grid grid-cols-4 gap-0 text-[10px] font-semibold uppercase tracking-wider px-5 py-2.5 border-b ${
          dark ? 'bg-gray-700/50 text-gray-400 border-gray-700' : 'bg-gray-50 text-gray-500 border-gray-100'
        }`}>
          <span>Descripción</span><span>Valor</span><span>Categoría</span><span className="text-right">Acciones</span>
        </div>

        {loading ? (
          <div className={`px-5 py-8 text-center text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Cargando...</div>
        ) : data.length === 0 ? (
          <div className={`px-5 py-8 text-center text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>No hay registros</div>
        ) : (
          data.map((row, i) => (
            <div key={row.id || i} className={`grid grid-cols-4 gap-0 text-xs px-5 py-3 transition-colors items-center ${
              dark ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50'
            } ${i < data.length - 1 ? `border-b ${dark ? 'border-gray-700' : 'border-gray-50'}` : ''}`}>
              <span className={`font-medium truncate ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{row.descripcion}</span>
              <span className={dark ? 'text-gray-400' : 'text-gray-600'}>{row.valor || '—'}</span>
              <span>{row.categoria && <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${dark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{row.categoria}</span>}</span>
              <span className="text-right space-x-2">
                <button onClick={() => handleEdit(row)} className="text-gray-400 hover:text-emerald-500 transition-colors" title="Editar">
                  <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                </button>
                <button onClick={() => handleDelete(row.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Eliminar">
                  <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                </button>
              </span>
            </div>
          ))
        )}

        {!filterCat && totalPages > 1 && (
          <div className={`flex items-center justify-between px-5 py-3 border-t ${dark ? 'border-gray-700' : 'border-gray-50'}`}>
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className={`text-xs disabled:opacity-30 ${dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>← Anterior</button>
            <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Página {page + 1} de {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className={`text-xs disabled:opacity-30 ${dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>Siguiente →</button>
          </div>
        )}
      </div>
    </div>
  )
}
