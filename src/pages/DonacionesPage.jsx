/**
 * DonacionesPage.jsx — Página de donaciones
 *
 * Listado completo de donaciones con paginación.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import DonationsTable from '../components/DonationsTable'

export default function DonacionesPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Donaciones</h1>
      <p className="text-sm text-gray-500 mb-6">Historial de donaciones recibidas</p>

      <DonationsTable />
    </div>
  )
}
