import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

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

  const value = useMemo(() => ({ dark, toggle }), [dark, toggle])

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const ctx = useContext(DarkModeContext)
  if (!ctx) throw new Error('useDarkMode debe usarse dentro de un <DarkModeProvider>')
  return ctx
}
