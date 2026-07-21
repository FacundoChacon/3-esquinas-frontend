/**
 * DashboardPage.jsx — Página principal del dashboard
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useAuth } from '../context/AuthContext'
import { useDarkMode } from '../context/DarkModeContext'
import KpiCards from '../components/KpiCards'
import IncomeChart from '../components/IncomeChart'
import DonationsTable from '../components/DonationsTable'

export default function DashboardPage() {
  const { user } = useAuth()
  const { dark } = useDarkMode()

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <h1 className={`text-xl font-bold ${dark ? 'text-gray-100' : 'text-gray-900'}`}>Panel de administración</h1>
      </div>
      <p className={`text-sm mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
        Bienvenido, {user?.nombre || user?.email || 'administrador'} · 3 Esquinas
      </p>

      <KpiCards />
      <div className="mt-6"><IncomeChart /></div>
      <div className="mt-6"><DonationsTable compact /></div>
    </div>
  )
}
