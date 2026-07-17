import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DarkModeProvider } from './context/DarkModeContext'
import { setAccessTokenGetter } from './services/apiService'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import DonacionesPage from './pages/DonacionesPage'
import DatosPage from './pages/DatosPage'

function TokenBridge() {
  const { accessToken } = useAuth()
  useEffect(() => {
    setAccessTokenGetter(() => accessToken)
  }, [accessToken])
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ============================================= */}
          {/* RUTAS PROTEGIDAS — ADMIN SOLO                 */}
          {/* ============================================= */}

          <Route element={<ProtectedRoute roles={['ADMIN']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<DashboardPage />} />
              <Route path="/admin/donaciones" element={<DonacionesPage />} />
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
