import { SafeAreaView, ScrollView } from '@/components/ThemeWidget';
import { ThemeType } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import { useUnistyles } from 'react-native-unistyles';

export default function Forgot() {
  const { theme } = useUnistyles();
  const styles = createStyles(theme);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.logoSection}>
          <Text>Logo</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    logoSection: {
      marginTop: ms(10),
      marginBottom: ms(40),
      width: s(150),
      height: vs(50),
      backgroundColor: '#6D7278',
    },
    buttonSection: {
      marginTop: ms(20),
    },
    actionSection: {
      marginTop: ms(15),
    },
    actionText: {
      color: theme.primary,
      fontSize: ms(15),
      lineHeight: ms(21)
    }
  })
}