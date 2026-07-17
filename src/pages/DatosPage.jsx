/**
 * DatosPage.jsx — Página de control de datos
 *
 * Pertenece a: Fase 5 — Frontend Dashboard
 */
import { useDarkMode } from '../context/DarkModeContext'
import DatosTable from '../components/DatosTable'

export default function DatosPage() {
  const { dark } = useDarkMode()

  return (
    <div className="p-6">
      <h1 className={`text-xl font-bold mb-1 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>Control de datos</h1>
      <p className={`text-sm mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Gestión de registros de control</p>
      <DatosTable />
    </div>
  )
}
