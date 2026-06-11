import { useThemeStore, type ThemeName } from './themeStore';

/**
 * 从后端 API 获取用户的主题偏好
 * @param userId 用户 ID
 * @returns Promise<ThemeName>
 */
export async function fetchUserThemePreference(userId: string): Promise<ThemeName> {
  try {
    // 示例：调用后端 API 获取用户主题偏好
    // const response = await fetch(`/api/users/${userId}/theme-preference`);
    // const data = await response.json();
    // return data.theme as ThemeName;
    
    // 暂时返回 'system'
    console.log(`Fetching theme preference for user ${userId}`);
    return 'system';
  } catch (error) {
    console.error('Failed to fetch theme preference:', error);
    return 'system';
  }
}

/**
 * 向后端发送主题偏好更新
 * @param userId 用户 ID
 * @param theme 新的主题名称
 * @returns Promise<boolean> 是否成功
 */
export async function updateUserThemePreference(
  userId: string,
  theme: ThemeName
): Promise<boolean> {
  try {
    // 示例：调用后端 API 更新用户主题偏好
    // const response = await fetch(`/api/users/${userId}/theme-preference`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ theme }),
    // });
    // return response.ok;
    
    console.log(`Updating theme preference for user ${userId} to ${theme}`);
    return true;
  } catch (error) {
    console.error('Failed to update theme preference:', error);
    return false;
  }
}

/**
 * 同步本地主题状态与后端（通常在应用启动时调用）
 * @param userId 用户 ID
 */
export async function syncThemePreference(userId: string): Promise<void> {
  try {
    const theme = await fetchUserThemePreference(userId);
    useThemeStore.getState().setTheme(theme);
  } catch (error) {
    console.error('Failed to sync theme preference:', error);
  }
}

/**
 * 当本地主题变化时，向后端发送同步请求
 * @param userId 用户 ID
 * @param theme 新的主题名称
 */
export async function syncThemeChangeToBackend(
  userId: string,
  theme: ThemeName
): Promise<void> {
  const success = await updateUserThemePreference(userId, theme);
  if (!success) {
    console.warn(`Failed to sync theme change to backend for user ${userId}`);
  }
}
