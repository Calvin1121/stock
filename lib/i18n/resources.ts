import enHome from './en/home';
import enIpo from './en/ipo';
import enAssets from './en/assets';
import enNews from './en/news';
import enProfile from './en/profile';

import zhHome from './zh/home';
import zhIpo from './zh/ipo';
import zhAssets from './zh/assets';
import zhNews from './zh/news';
import zhProfile from './zh/profile';

export const resources = {
  en: {
    home: enHome,
    ipo: enIpo,
    assets: enAssets,
    news: enNews,
    profile: enProfile,
  },
  zh: {
    home: zhHome,
    ipo: zhIpo,
    assets: zhAssets,
    news: zhNews,
    profile: zhProfile,
  },
} as const;

export type Language = keyof typeof resources;
export type Namespace = keyof typeof resources['en'];
