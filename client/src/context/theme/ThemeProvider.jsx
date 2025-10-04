import { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

export const ThemeProvider = ({ children }) => {
  const themes = ['light', 'dark', 'blue']
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    themes.forEach(t => document.body.classList.toggle(t, t === theme))
  }, [theme])

  const toggleTheme = (selected) => setTheme(selected)

  const value = {
    theme,
    toggleTheme
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
