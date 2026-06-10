import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background,
          borderTopColor: Colors[colorScheme].tabIconDefault,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: t('home:title'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="ipo"
        options={{
          title: t('ipo:title'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>📈</Text>,
        }}
      />
      <Tabs.Screen
        name="assets"
        options={{
          title: t('assets:title'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>💼</Text>,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: t('news:title'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>📰</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile:title'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}
