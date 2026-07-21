/**
 * DarkModeContext.jsx — Context de modo oscuro
 *
 * Administra el estado del modo oscuro en toda la app.
 * Persiste la preferencia en localStorage.
 *
 * Pertenece a: Fase 5 — Dark mode
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const DarkModeContext = createContext(null)

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem('3eq-dark')
      if (stored !== null) return stored === 'true'
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    try { localStorage.setItem('3eq-dark', String(dark)) } catch {}
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggle = useCallback(() => setDark((d) => !d), [])

  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const ctx = useContext(DarkModeContext)
  if (!ctx) throw new Error('useDarkMode debe usarse dentro de un <DarkModeProvider>')
  return ctx
}
