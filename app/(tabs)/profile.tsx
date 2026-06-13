import { View } from '@/components/ThemeWidget';
import { Input } from '@/components/ui/input';
import { THEME } from '@/constants/Colors';
import { useThemeStore } from '@/lib/themeStore';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  const { setTheme } = useThemeStore();
  const [value, setValue] = useState('')
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={() => setTheme(THEME.DARK)}>
        <Text>Dark</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme(THEME.LIGHT)}>
        <Text>Light</Text>
      </TouchableOpacity>
      <Input isSearch value={value} onChangeText={setValue} variant='rounded' />
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
