/**
 * DashboardPage.jsx — Página principal del dashboard
 *
 * Muestra KPIs, gráfico de ingresos y tabla de donaciones.
 * Contenido real se implementa en los objetivos siguientes.
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <h1 className="text-xl font-bold text-gray-900">Panel de administración</h1>
      </div>
      <p className="text-sm text-gray-500 mb-6">Bienvenido, administrador · 3 Esquinas</p>

      <div className="text-center py-16 text-gray-400">
        <p>Dashboard — Próximamente (Objetivo 2-4)</p>
      </div>
    </div>
  )
}
