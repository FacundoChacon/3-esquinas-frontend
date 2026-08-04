import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DarkModeProvider } from './context/DarkModeContext'
import { setAccessTokenGetter, setRefreshHandler } from './services/apiClient'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout'
import LandingPage from './pages/LandingPage'
import ConocenosPage from './pages/ConocenosPage'
import DonatePage from './pages/DonatePage'
import ColaborarPage from './pages/ColaborarPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import DonacionesPage from './pages/DonacionesPage'
import DatosPage from './pages/DatosPage'
import ContactosPage from './pages/ContactosPage'
import VoluntariosPage from './pages/VoluntariosPage'

function TokenBridge() {
  const { accessToken, refresh } = useAuth()
  useEffect(() => {
    setAccessTokenGetter(() => accessToken)
  }, [accessToken])
  useEffect(() => {
    setRefreshHandler(() => refresh)
  }, [refresh])
  return null
}

export default function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
      <TokenBridge />
      <BrowserRouter>
        <Routes>
          {/* ============================================= */}
          {/* RUTAS PÚBLICAS                                */}
          {/* ============================================= */}

          <Route path="/" element={<LandingPage />} />
          <Route path="/conocenos" element={<ConocenosPage />} />
          <Route path="/donar" element={<DonatePage />} />
          <Route path="/colaborar" element={<ColaborarPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ============================================= */}
          {/* RUTAS PROTEGIDAS — ADMIN SOLO                 */}
          {/* ============================================= */}

          <Route element={<ProtectedRoute roles={['ADMIN']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<DashboardPage />} />
              <Route path="/admin/donaciones" element={<DonacionesPage />} />
              <Route path="/admin/contactos" element={<ContactosPage />} />
              <Route path="/admin/voluntarios" element={<VoluntariosPage />} />
              <Route path="/admin/datos" element={<DatosPage />} />
            </Route>
          </Route>

          {/* ============================================= */}
          {/* 404                                            */}
          {/* ============================================= */}

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
      </DarkModeProvider>
    </AuthProvider>
  )
}
