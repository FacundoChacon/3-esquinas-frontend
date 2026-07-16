/**
 * App.jsx — Componente raíz de la aplicación
 * 
 * Configura el router principal y las rutas de la app.
 * - Rutas públicas: / (inicio), /login
 * - Rutas protegidas: /admin (dashboard)
 * 
 * Pertenece a: Estructura general del frontend
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'

// Importar páginas que se vayan creando en el futuro
// import HomePage from './pages/HomePage'
// import DashboardPage from './pages/DashboardPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ============================================= */}
          {/* RUTAS PÚBLICAS (no requieren autenticación)   */}
          {/* ============================================= */}
          
          {/* Página de inicio / landing page */}
          <Route path="/" element={<div className="p-8 text-center"><h1>3 Esquinas — Portal de Donaciones</h1><p>Próximamente</p></div>} />
          
          {/* Página de login */}
          <Route path="/login" element={<LoginPage />} />

          {/* ============================================= */}
          {/* RUTAS PROTEGIDAS (requieren autenticación)     */}
          {/* ============================================= */}
          
          {/* Grupo de rutas protegidas del admin */}
          <Route element={<ProtectedRoute />}>
            {/* Dashboard principal —placeholder */}
            <Route path="/admin" element={<div className="p-8 text-center"><h1>Dashboard</h1><p>Próximamente — Fase 5</p></div>} />
            
            {/* Otras rutas del admin que se agregarán en Fase 5 */}
            {/* <Route path="/admin/donaciones" element={<DonacionesPage />} /> */}
            {/* <Route path="/admin/datos" element={<DatosPage />} /> */}
          </Route>

          {/* Ruta 404 — página no encontrada */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300">404</h1>
                <p className="mt-4 text-gray-500">Página no encontrada</p>
                <a href="/" className="mt-4 inline-block text-emerald-600 hover:text-emerald-700 font-medium">
                  Volver al inicio
                </a>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
