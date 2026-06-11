import { Text, View } from '@/components/Themed';
import { useLanguageStore, type Language } from '@/lib/languageStore';
import { useThemeStore, type ThemeName } from '@/lib/themeStore';
import { useThemeSync } from '@/lib/useThemeSync';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

const THEME_OPTIONS: Array<{ key: ThemeName; label: string }> = [
  { key: 'system', label: 'System' },
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
  { key: 'green', label: 'Green' },
];

const LANGUAGE_OPTIONS: Array<{ key: Language; label: string }> = [
  { key: 'en', label: 'English' },
  { key: 'zh', label: '中文' },
];

export default function ProfileScreen() {
  // 从你的认证服务或状态管理获取 userId，这里暂时为 null
  const userId = null; // TODO: 从认证服务获取实际的 userId
  
  // 使用主题同步 hook（会自动处理后端同步）
  const { themeName, setTheme } = useThemeSync(userId);
  
  // 使用语言 store
  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  
  const systemScheme = useThemeStore((s) => s.systemScheme);
  const { theme } = useUnistyles();
  const { t } = useTranslation('profile');

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
  };

  const currentThemeDisplay =
    themeName === 'system' ? `System (${systemScheme})` : themeName;

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>{t('title')}</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('theme')}</Text>
        <Text style={[styles.description, { color: theme.text }]}>
          {t('theme_desc')}
        </Text>
        {THEME_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.themeOption,
              { borderColor: theme.tabIconDefault },
            ]}
            onPress={() => handleThemeChange(option.key)}>
            <View
              style={[
                styles.radioOuter,
                themeName === option.key && styles.radioOuterActive,
              ]}>
              {themeName === option.key && <View style={styles.radioInner} />}
            </View>
            <Text style={[styles.optionLabel, { color: theme.text }]}>
              {t(`theme_${option.key}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('language')}</Text>
        <Text style={[styles.description, { color: theme.text }]}>
          {t('language_desc')}
        </Text>
        {LANGUAGE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.themeOption,
              { borderColor: theme.tabIconDefault },
            ]}
            onPress={() => handleLanguageChange(option.key)}>
            <View
              style={[
                styles.radioOuter,
                language === option.key && styles.radioOuterActive,
              ]}>
              {language === option.key && <View style={styles.radioInner} />}
            </View>
            <Text style={[styles.optionLabel, { color: theme.text }]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text style={[styles.infoText, { color: theme.text }]}>
          {t('current_theme')}: {currentThemeDisplay}
        </Text>
      </View>
      <View style={[styles.infoBox, { marginBottom: 32 }]}>
        <Text style={[styles.infoText, { color: theme.text }]}>
          {t('current_language')}: {language === 'en' ? 'English' : '中文'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.7,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioOuterActive: {
    borderColor: '#000',
    borderWidth: 3,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  infoBox: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
