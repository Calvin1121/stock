import { Colors } from '@/constants/Colors';
import { useThemeStore } from '@/lib/themeStore';

export function useTheme() {
  const resolvedThemeName = useThemeStore((s) => s.resolvedThemeName);
  const theme = Colors[resolvedThemeName];
  
  return { theme };
}
