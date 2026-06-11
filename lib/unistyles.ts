import { Colors, ColorsType, THEME } from '@/constants/Colors';
import { StyleSheet } from 'react-native-unistyles';

type AppThemes = {
  [K in keyof ColorsType]: ColorsType[K];
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: Colors,
  settings: {
    initialTheme: THEME.LIGHT,
  },
})
