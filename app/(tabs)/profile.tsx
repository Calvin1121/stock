import { TouchableOpacity } from '@/components/ThemeWidget';
import { THEME } from '@/constants/Colors';
import { useThemeStore } from '@/lib/themeStore';
import { useTheme } from '@/lib/useTheme';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { setTheme } = useThemeStore();
  const [value, setValue] = useState('')
  const { theme} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={() => setTheme(THEME.DARK)}>
        <Text style={{color: theme.primary}}>Dark</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme(THEME.LIGHT)}>
        <Text style={{color: theme.primary}}>Light</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
