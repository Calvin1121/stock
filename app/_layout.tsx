import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, NativeStackHeaderProps, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import 'react-native-reanimated';

import { LoadingProvider, ModalProvider, ToastProvider } from '@/components/ui';
import { ActionSheetProvider } from '@/components/ui/action-sheet-context';
import { ColorsType, THEME, ThemeType } from '@/constants/Colors';
import '@/lib/i18n';
import { useLanguageStore } from '@/lib/languageStore';
import { queryClient } from '@/lib/queryClient';
import { useThemeStore } from '@/lib/themeStore';
import { TFunction } from 'i18next';

export interface GlobalHeaderProps extends NativeStackHeaderProps {
  t: TFunction<"translation", undefined>
  theme: ThemeType
}

export {
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [appReady, setAppReady] = useState(false);
  
  // Subscribe to zustand stores to ensure they're ready
  const themeReady = useThemeStore((s) => s.resolvedThemeName);
  const languageReady = useLanguageStore((s) => s.language);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    // All systems ready: fonts loaded, theme initialized, language initialized
    if (loaded && themeReady && languageReady) {
      setAppReady(true);
    }
  }, [loaded, themeReady, languageReady]);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const systemColorScheme = useSystemColorScheme();
  const resolvedThemeName = useThemeStore((s) => s.resolvedThemeName);
  useEffect(() => {
    const scheme: keyof ColorsType = systemColorScheme === THEME.DARK ? THEME.DARK : THEME.LIGHT
    useThemeStore.getState().setSystemScheme(scheme)
  }, [systemColorScheme])
  // const { theme } = useTheme()
  // const { t } = useTranslation()
  // const pathname = usePathname()

  // const onHeader = useCallback((props: NativeStackHeaderProps) => {
  //   const _props = {...props, t, theme}
  //   if(pathname === '/home')
  //     return HomeSearchBarHeader(_props)
  //   if(pathname === '/ipo')
  //     return IPOHeader(_props)
  //   return null
  // }, [pathname, t, theme])
  return (
    <QueryClientProvider client={queryClient}>
      <ActionSheetProvider>
        <ToastProvider>
          <LoadingProvider>
            <ModalProvider>
              <ThemeProvider value={resolvedThemeName === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(tabs)" />
                </Stack>
              </ThemeProvider>
            </ModalProvider>
          </LoadingProvider>
        </ToastProvider>
      </ActionSheetProvider>
    </QueryClientProvider>
  );
}
