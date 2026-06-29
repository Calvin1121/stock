import { Colors, ColorsType, THEME } from '@/constants/Colors'
import { storage } from '@/lib/storage'
import { create } from 'zustand'

const STORAGE_KEY = 'app_theme'

type ResolvedTheme = keyof ColorsType
export type ThemeName = ResolvedTheme | THEME.SYSTEM

interface ThemeState {
  themeName: ThemeName
  systemScheme: ResolvedTheme
  resolvedThemeName: ResolvedTheme
  setTheme: (name: ThemeName) => void
  setSystemScheme: (scheme: ResolvedTheme) => void
}

function getStoredTheme(): ThemeName {
  const stored = storage.getString(STORAGE_KEY)
  if (stored && stored in Colors) {
    return stored
  }
  return THEME.DARK
}

function resolveThemeName(theme: ThemeName, system: ResolvedTheme): ResolvedTheme {
  if (theme === THEME.SYSTEM) return system
  return theme
}

const storedTheme = getStoredTheme()
const initialTheme: ResolvedTheme = storedTheme !== THEME.SYSTEM ? storedTheme : THEME.DARK

export const useThemeStore = create<ThemeState>((set, get) => ({
  themeName: storedTheme,
  systemScheme: THEME.LIGHT,
  resolvedThemeName: initialTheme,
  setTheme: (name) => {
    storage.set(STORAGE_KEY, name)
    const { systemScheme } = get()
    const resolved = resolveThemeName(name, systemScheme)
    set({ themeName: name, resolvedThemeName: resolved })
  },
  setSystemScheme: (scheme) => {
    set({ systemScheme: scheme })
    const { themeName } = get()
    if (themeName === THEME.SYSTEM) {
      const resolved = resolveThemeName(THEME.SYSTEM, scheme)
      set({ resolvedThemeName: resolved })
    }
  },
}))
