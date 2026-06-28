import { SafeAreaView, TouchableOpacity } from '@/components/ThemeWidget';
import { THEME, ThemeType } from '@/constants/Colors';
import i18n from '@/lib/i18n';
import { Language, useLanguageStore } from '@/lib/languageStore';
import { useThemeStore } from '@/lib/themeStore';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
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
    <View style={[commonStyles.alignCenter, commonStyles.justifyCenter, commonStyles.flex1]}>
      <TouchableOpacity onPress={() => setTheme(THEME.DARK)}>
        <Text style={{color: theme.primary}}>Dark</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme(THEME.LIGHT)}>
        <Text style={{color: theme.primary}}>Light</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLanguageChange('zh')}>
        <Text style={{color: theme.primary}}>Zh</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLanguageChange('en')}>
        <Text style={{color: theme.primary}}>En</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({

  })
}

