import zh from './zh';

export const resources = {
  en: zh, // Placeholder for English translations, can be customized later
  zh,
} as const;

export type Language = keyof typeof resources;
export type Namespace = keyof typeof resources['en'];
