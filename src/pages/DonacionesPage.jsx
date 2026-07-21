/**
 * DonacionesPage.jsx — Página de donaciones
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useDarkMode } from '../context/DarkModeContext'
import DonationsTable from '../components/DonationsTable'

export default function DonacionesPage() {
  const { dark } = useDarkMode()

  return (
    <div className="p-6">
      <h1 className={`text-xl font-bold mb-1 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>Donaciones</h1>
      <p className={`text-sm mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Historial de donaciones recibidas</p>
      <DonationsTable />
    </div>
  )
}
