import * as commonTheme from "./common.theme";
import * as headerTheme from "./header.theme";
import * as inputTheme from "./input.theme";
import * as tabbarTheme from "./tabbar.theme";


type ThemeItem =  typeof commonTheme.dark & {
  header: typeof headerTheme.dark,
  input: typeof inputTheme.dark,
  tab: typeof tabbarTheme.dark
}
export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}
export const Colors = Object.values(THEME)
  .filter(theme => theme !== THEME.SYSTEM)
  .reduce((acc, theme) => {
    const item = {
      ...commonTheme[theme],
      header: headerTheme[theme],
      input: inputTheme[theme],
      tab: tabbarTheme[theme],
    };
    return {...acc, [theme]: item};
  }, {} as Record<Exclude<THEME, THEME.SYSTEM>, ThemeItem>);
export type ColorsType = typeof Colors;

export type ThemeType = typeof Colors[keyof typeof Colors];
