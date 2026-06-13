import en from './en';
import zh from './zh';

export const resources = {
  en,
  zh,
} as const;

export type Language = keyof typeof resources;
export type Namespace = keyof typeof resources['en'];
