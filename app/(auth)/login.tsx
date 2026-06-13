import IconFont from '@/components/iconfont';
import { SafeAreaView, View } from '@/components/ThemeWidget';
import { useActionSheet } from '@/components/ui/action-sheet-context';
import { ThemeType } from '@/constants/Colors';
import i18n from '@/lib/i18n';
import { Language, useLanguageStore } from '@/lib/languageStore';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

export default function LoginPage() {
  const { theme } = useUnistyles();
  const styles = createStyles(theme);
  const { show } = useActionSheet();
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const { t } = useTranslation('auth');
  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }, [])
  const onChangeLang = useCallback(() => {
    show({
      title: t('lang.select'),
      items: [
        { label: t('lang.en'), value: 'en', onPress: (item) => handleLanguageChange(item.value as Language) },
        { label: t('lang.zh'), value: 'zh', onPress: (item) => handleLanguageChange(item.value as Language) },
      ],
    })
  }, [handleLanguageChange, show, t])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.langSection}>
        <TouchableOpacity onPress={onChangeLang}>
          <IconFont name='lang-dark' size={29} />
        </TouchableOpacity>
      </View>
      <View style={styles.formSection}>
        <Text>123</Text>
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    container: {
      flex: 1
    },
    langSection: {
      alignItems: 'flex-end'
    },
    formSection: {
      flex: 1,
    }
  })
}
