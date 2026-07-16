/**
 * main.jsx — Punto de entrada de la aplicación
 * 
 * Renderiza el componente raíz (App) en el DOM.
 * - StrictMode activado para desarrollo
 * - Importa estilos globales (index.css con Tailwind)
 * 
 * Pertenece a: Estructura general del frontend
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Renderizar la app en el elemento #root del index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
