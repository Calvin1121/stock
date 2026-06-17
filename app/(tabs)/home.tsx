import { SafeAreaView, ScrollView, TouchableOpacity } from '@/components/ThemeWidget';
import { useTheme } from '@/lib/useTheme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <>
      {/* <View style={styles.container}>
        <Text style={styles.title}>Home</Text>

      </View> */}
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={{ color: theme.primary }}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
