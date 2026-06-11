import { syncThemeChangeToBackend, syncThemePreference } from '@/lib/themeApi';
import { useThemeStore, type ThemeName } from '@/lib/themeStore';
import { useCallback, useEffect } from 'react';

/**
 * Hook 用于在主题变化时自动同步到后端
 * @param userId 用户 ID（如果为 null/undefined，则跳过同步）
 */
export const useThemeSync = (userId?: string | null) => {
  const themeName = useThemeStore((s) => s.themeName);
  const setTheme = useThemeStore((s) => s.setTheme);

  // 在组件挂载时，从后端同步主题
  useEffect(() => {
    if (userId) {
      syncThemePreference(userId);
    }
  }, [userId]);

  // 当主题变化时，同步到后端
  const handleThemeChange = useCallback(
    (newTheme: ThemeName) => {
      setTheme(newTheme);
      if (userId) {
        syncThemeChangeToBackend(userId, newTheme);
      }
    },
    [setTheme, userId]
  );

  return {
    themeName,
    setTheme: handleThemeChange,
    originalSetTheme: setTheme,
  };
};

/**
 * Hook 用于获取当前解析后的主题
 */
export const useResolvedTheme = () => {
  return useThemeStore((s) => s.resolvedThemeName);
};

/**
 * Hook 用于获取系统主题
 */
export const useSystemTheme = () => {
  return useThemeStore((s) => s.systemScheme);
};
