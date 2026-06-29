import { storage } from '@/lib/storage';
import { create } from 'zustand';

const STORAGE_KEY = 'app_language';

export type Language = 'en' | 'zh';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

function getStoredLanguage(): Language {
  const stored = storage.getString(STORAGE_KEY);
  if (stored === 'en' || stored === 'zh') {
    return stored;
  }
  return 'zh'; // 默认中文
}

const storedLanguage = getStoredLanguage();

export const useLanguageStore = create<LanguageState>((set) => ({
  language: storedLanguage,
  setLanguage: (lang) => {
    storage.set(STORAGE_KEY, lang);
    set({ language: lang });
  },
}));
