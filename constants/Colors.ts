import * as actionSheet from "./actionsheet.theme";
import * as button from "./button.theme";
import * as common from "./common.theme";
import * as header from "./header.theme";
import * as input from "./input.theme";
import * as searchbar from "./searchbar.theme";
import * as tab from "./tabbar.theme";

const themeMap = {
  header,
  input,
  tab,
  button,
  actionSheet,
  searchbar
}

type ThemeMap = typeof themeMap

type ThemeMapDark = {
  [K in keyof ThemeMap]: ThemeMap[K]['dark']
}

export type ThemeMapItemDark<Item extends keyof ThemeMap> = ThemeMap[Item]['dark']

type ThemeItem = typeof common.dark & ThemeMapDark

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export const Colors = Object.values(THEME)
  .filter(theme => theme !== THEME.SYSTEM)
  .reduce((acc, theme) => {
    const item = Object.entries(themeMap).reduce((prev, cur) => {
      const [key, value] = cur;
      return { ...prev, [key]: value[theme] }
    }, common[theme])
    return { ...acc, [theme]: item }
  }, {} as Record<Exclude<THEME, THEME.SYSTEM>, ThemeItem>);


export type ColorsType = typeof Colors;

export type ThemeType = typeof Colors[keyof typeof Colors];
