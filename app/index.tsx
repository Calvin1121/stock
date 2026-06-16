import { TouchableOpacity } from '@/components/ThemeWidget';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LaunchPage() {
  const router = useRouter();

  useEffect(() => {
    console.log('LaunchPage mounted, navigating to /home');
    // Dummy startup logic: after 5s decide where to go.
    // Replace this with real auth check (e.g. read from secure storage).
    // const timer = setTimeout(() => {
    //   const isLoggedIn = false; // TODO: replace with real check
    //   if (isLoggedIn) router.replace('/home');
    //   else 
    // router.replace('/register');
    // }, 5000);

    // return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Preparing your app...</Text>
        <TouchableOpacity onPress={() => router.replace('/home')}>
          <Text style={styles.tiny}>Tap to continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0f172a',
  },
  main: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 8,
  },
  tiny: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
