import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Register() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Register</Text>
      <Text style={{ marginBottom: 12 }}>Register page stub.</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: '#2563eb' }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
