export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}
const theme = {
    text: '#000',
    background: '#11121A',
    tabBackground: '#1b1c28',
    tabBorder: 'transparent',
    tabBoxShadow: '0px 0px 10px #151721',
    tabTextActive: '#4D8EFF',
    tabTextInactive: '#A5A5A5',
    tint: '#000',
    tabIconDefault: '#ccc',
    tabIconSelected: '#fff',
  }
export const Colors = {
  [THEME.LIGHT]: theme,
  [THEME.DARK]: theme,
};

export type ColorsType = typeof Colors;
