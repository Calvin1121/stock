# 主题系统使用指南

## 概述

项目采用 `zustand` + `react-native-unistyles` 的组合来实现完整的主题管理系统，支持：
- 系统主题自动跟随
- 用户手动选择主题（Light/Dark/Green/System）
- 本地持久化存储
- 后端同步和推送

## 核心组件

### 1. ThemeStore (`lib/themeStore.ts`)

使用 zustand 管理全局主题状态：

```typescript
import { useThemeStore } from '@/lib/themeStore';

// 获取当前主题
const themeName = useThemeStore((s) => s.themeName);
const resolvedTheme = useThemeStore((s) => s.resolvedThemeName);

// 切换主题
useThemeStore.getState().setTheme('dark');
```

**State 属性：**
- `themeName`: 用户选择的主题名称（'light' | 'dark' | 'green' | 'system'）
- `resolvedThemeName`: 实际应用的主题（如果是 'system' 则解析为实际的 light/dark/green）
- `systemScheme`: 系统主题（light/dark）
- `setTheme(name)`: 设置主题
- `setSystemScheme(scheme)`: 设置系统主题

### 2. Unistyles 配置 (`lib/unistyles.ts`)

已配置三个主题，颜色定义来自 `constants/Colors.ts`：

```typescript
StyleSheet.configure({
  themes: {
    light: Colors.light,
    dark: Colors.dark,
    green: Colors.green,
  },
  settings: {
    initialTheme: 'light',
  },
})
```

### 3. 使用主题 Hooks

#### `useColorScheme()`

获取当前解析后的主题名称：

```typescript
import { useColorScheme } from '@/components/useColorScheme';

const theme = useColorScheme(); // 返回 'light' | 'dark' | 'green'
```

#### `useUnistyles()`

来自 `react-native-unistyles`，获取当前主题的所有样式属性：

```typescript
import { useUnistyles } from 'react-native-unistyles';

const { theme } = useUnistyles();
// theme.text, theme.background, theme.tint 等
```

#### `useThemeSync(userId?)`

用于自动处理主题与后端的同步（新增）：

```typescript
import { useThemeSync } from '@/lib/useThemeSync';

const { themeName, setTheme } = useThemeSync(userId);

// setTheme 会自动：
// 1. 更新本地主题
// 2. 持久化存储
// 3. 同步到后端
```

## 后端集成

### 1. 实现 API 端点

在你的后端实现以下端点：

```
GET /api/users/{userId}/theme-preference
  返回: { theme: 'light' | 'dark' | 'green' | 'system' }

PATCH /api/users/{userId}/theme-preference
  请求体: { theme: 'light' | 'dark' | 'green' | 'system' }
  返回: { success: boolean }
```

### 2. 修改 `lib/themeApi.ts`

将示例代码替换为实际的 API 调用：

```typescript
export async function fetchUserThemePreference(userId: string): Promise<ThemeName> {
  const response = await fetch(`YOUR_API_BASE/users/${userId}/theme-preference`);
  const data = await response.json();
  return data.theme;
}

export async function updateUserThemePreference(
  userId: string,
  theme: ThemeName
): Promise<boolean> {
  const response = await fetch(
    `YOUR_API_BASE/users/${userId}/theme-preference`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme }),
    }
  );
  return response.ok;
}
```

### 3. 在 Profile 中使用

```typescript
import { useThemeSync } from '@/lib/useThemeSync';

export default function ProfileScreen() {
  // 替换为实际的 userId（从认证服务获取）
  const userId = useAuthStore((s) => s.userId);
  
  // useThemeSync 会在组件挂载时从后端同步主题
  // 并在用户切换主题时自动上传到后端
  const { themeName, setTheme } = useThemeSync(userId);

  return (
    // ... UI
  );
}
```

## 在页面中应用主题

### 使用 Themed 组件

```typescript
import { Text, View } from '@/components/Themed';

// 这些组件会自动应用当前主题颜色
<Text>Hello</Text>
<View>...</View>
```

### 使用 useUnistyles 自定义样式

```typescript
import { useUnistyles } from 'react-native-unistyles';
import { StyleSheet } from 'react-native';

function MyComponent() {
  const { theme } = useUnistyles();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text }}>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## 主题切换流程

### 用户手动切换（在 Profile 中）

```
用户点击主题选项
  ↓
useThemeSync.setTheme(newTheme)
  ↓
更新 zustand store
  ↓
UnistylesRuntime.setTheme(resolved)
  ↓
本地存储保存
  ↓
syncThemeChangeToBackend() 调用 API
  ↓
后端保存用户偏好
```

### 后端推送主题变更

实现 WebSocket 或轮询机制：

```typescript
// 示例：在应用启动时同步
useEffect(() => {
  if (userId) {
    syncThemePreference(userId);
  }
}, [userId]);

// 或使用 WebSocket 监听后端推送
// ws.on('themeChanged', (theme) => {
//   useThemeStore.getState().setTheme(theme);
// });
```

## 添加新主题

1. 在 `constants/Colors.ts` 中定义新主题颜色
2. 在 `lib/unistyles.ts` 中注册新主题
3. 在 `lib/themeStore.ts` 中的 `ThemeName` 类型中添加新主题名称
4. 在 Profile 中的 `THEME_OPTIONS` 中添加新选项

## 调试

启用日志记录：

```typescript
// themeStore.ts
console.log('Theme changed to:', newTheme);

// useThemeSync.ts
console.log('Syncing with backend...', userId, newTheme);
```

检查 localStorage（web）或 MMKV（native）中的存储：

```typescript
// web
console.log(window.localStorage.getItem('app_theme'));

// native
import { storage } from '@/lib/storage';
console.log(storage.getString('app_theme'));
```
