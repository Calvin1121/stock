import { create } from 'zustand'
import { UnistylesRuntime } from 'react-native-unistyles'
import { storage } from '@/lib/storage'
import '@/lib/unistyles'

const STORAGE_KEY = 'app_theme'

export type ThemeName = 'light' | 'dark' | 'green' | 'system'
type ResolvedTheme = 'light' | 'dark' | 'green'

interface ThemeState {
  themeName: ThemeName
  systemScheme: ResolvedTheme
  resolvedThemeName: ResolvedTheme
  setTheme: (name: ThemeName) => void
  setSystemScheme: (scheme: ResolvedTheme) => void
}

function getStoredTheme(): ThemeName {
  const stored = storage.getString(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'green' || stored === 'system') {
    return stored
  }
  return 'system'
}

function resolveThemeName(theme: ThemeName, system: ResolvedTheme): ResolvedTheme {
  if (theme === 'system') return system
  return theme
}

const storedTheme = getStoredTheme()
const initialTheme: ResolvedTheme = storedTheme !== 'system' ? storedTheme : 'light'

UnistylesRuntime.setTheme(initialTheme)

export const useThemeStore = create<ThemeState>((set, get) => ({
  themeName: storedTheme,
  systemScheme: 'light',
  resolvedThemeName: initialTheme,
  setTheme: (name) => {
    storage.set(STORAGE_KEY, name)
    const { systemScheme } = get()
    const resolved = resolveThemeName(name, systemScheme)
    set({ themeName: name, resolvedThemeName: resolved })
    UnistylesRuntime.setTheme(resolved)
  },
  setSystemScheme: (scheme) => {
    set({ systemScheme: scheme })
    const { themeName } = get()
    if (themeName === 'system') {
      const resolved = resolveThemeName('system', scheme)
      set({ resolvedThemeName: resolved })
      UnistylesRuntime.setTheme(resolved)
    }
  },
}))
