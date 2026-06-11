import { StyleSheet, Text, View } from 'react-native';

export default function IPOScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>IPO</Text>
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
