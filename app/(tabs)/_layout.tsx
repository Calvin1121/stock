import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { BottomTabNavigationOptions } from 'expo-router/build/react-navigation/bottom-tabs/types';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

export default function TabLayout() {
  const { theme } = useUnistyles();
  const { t } = useTranslation();
  const iconSize = 20;
  const tabs = ['home', 'ipo', 'assets', 'news', 'profile'];
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: theme.tabBackground,
      borderTopColor: theme.tabBorder,
      boxShadow: theme.tabBoxShadow,
      paddingTop: 2,
    },
    tabBarLabelStyle: {
      lineHeight: 20,
      fontSize: 10,
    },
    tabBarIconStyle: {
      width: iconSize,
      height: iconSize,
    },
  }
  const tabBarIcon = ({ focused }: { focused: boolean }) => {
    return (
      <View
        style={{
          width: iconSize,
          height: iconSize,
          backgroundColor: focused ? theme.tabTextActive : theme.tabTextInactive,
          borderRadius: 4,
        }}
      />
    );
  };
  return (
    <Tabs screenOptions={screenOptions}>
    {tabs.map((tab) => {
      const options: BottomTabNavigationOptions = {
        title: t(`tab:${tab}`),
        tabBarActiveTintColor: theme.tabTextActive,
        tabBarInactiveTintColor: theme.tabTextInactive,
        tabBarIcon,
      } 
      return <Tabs.Screen
        options={options}
        name={tab} />
    })}
  </Tabs>)
}
