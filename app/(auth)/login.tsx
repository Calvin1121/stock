import IconFont from '@/components/iconfont';
import { SafeAreaView, View } from '@/components/ThemeWidget';
import { ThemeType } from '@/constants/Colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

export default function LoginPage() {
  const { theme } = useUnistyles();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.langSection}>
        <TouchableOpacity>
          <IconFont name='lang-dark' size={29} />
        </TouchableOpacity>
      </View>
      <View style={styles.formSection}>
        <Text>123</Text>
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    container: {
      flex: 1
    },
    langSection: {
      alignItems: 'flex-end'
    },
    formSection: {
      flex: 1,
    }
  })
}
