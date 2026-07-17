/**
 * DashboardPage.jsx — Página principal del dashboard
 *
 * Muestra KPIs, gráfico de ingresos y tabla de donaciones.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useAuth } from '../context/AuthContext'
import KpiCards from '../components/KpiCards'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <h1 className="text-xl font-bold text-gray-900">Panel de administración</h1>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Bienvenido, {user?.nombre || user?.email || 'administrador'} · 3 Esquinas
      </p>

      <KpiCards />
    </div>
  )
}
