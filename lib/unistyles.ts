import { StyleSheet, type UnistylesTheme } from 'react-native-unistyles'
import Colors from '@/constants/Colors'

declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: UnistylesTheme
    dark: UnistylesTheme
    green: UnistylesTheme
  }
}

StyleSheet.configure({
  themes: {
    light: Colors.light,
    dark: Colors.dark,
    green: Colors.green,
  },
  settings: {
    initialTheme: 'light',
  },
})
