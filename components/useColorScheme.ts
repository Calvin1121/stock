import { useThemeStore } from '@/lib/themeStore'

export const useColorScheme = () => {
  return useThemeStore((s) => s.resolvedThemeName)
}
