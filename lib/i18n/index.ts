import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { storage } from '@/lib/storage';
import { resources } from './resources';

const STORAGE_KEY = 'app_language';

function getStoredLanguage(): string {
  const stored = storage.getString(STORAGE_KEY);
  if (stored === 'en' || stored === 'zh') {
    return stored;
  }
  return 'en'; // 默认英文
}

const initialLanguage = getStoredLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'en',
  ns: ['home', 'ipo', 'assets', 'news', 'profile'],
  defaultNS: 'home',
  interpolation: {
    escapeValue: false,
  },
});

// 监听语言变化，自动保存到存储
i18n.on('languageChanged', (lng) => {
  storage.set(STORAGE_KEY, lng);
});

export default i18n;
