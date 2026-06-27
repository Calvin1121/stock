import { SafeAreaView } from '@/components/ThemeWidget';
import { ThemeType } from '@/constants/Colors';
import i18n from '@/lib/i18n';
import { Language, useLanguageStore } from '@/lib/languageStore';
import { useThemeStore } from '@/lib/themeStore';
import { useTheme } from '@/lib/useTheme';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { setTheme } = useThemeStore();
  const [value, setValue] = useState('')
  const { theme } = useTheme();
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }, [])
  return <SafeAreaView>
    <View><Text style={{color: theme.primaryText}}>Test</Text></View>
  </SafeAreaView>
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({

  })
}

