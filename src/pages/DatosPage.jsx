/**
 * DatosPage.jsx — Página de control de datos
 *
 * CRUD completo de registros de datos de control.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import DatosTable from '../components/DatosTable'

export default function DatosPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Control de datos</h1>
      <p className="text-sm text-gray-500 mb-6">Gestión de registros de control</p>

      <DatosTable />
    </div>
  )
}
