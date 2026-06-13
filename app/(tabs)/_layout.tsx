import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { ThemeType } from '@/constants/Colors';
import { BottomTabNavigationOptions } from 'expo-router/build/react-navigation/bottom-tabs/types';
import { useMemo } from 'react';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
const iconSize = 20;

export default function TabLayout() {
  const { theme } = useUnistyles();
  const styles = useMemo(() => createStyles(theme), [theme])
  const { t } = useTranslation();
  const tabs = ['home', 'ipo', 'assets', 'news', 'profile'];
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    ...styles.screenStyle
  }
  const tabBarIcon = ({ focused }: { focused: boolean }) => {
    return (
      <View style={[styles.tabIconStyle(focused)]} />
    );
  };
  return (
    <Tabs screenOptions={screenOptions}>
      {tabs.map((tab) => {
        const options: BottomTabNavigationOptions = {
          title: t(`tab:${tab}`),
          ...styles.tabBarStyle,
          tabBarIcon,
        }
        return <Tabs.Screen
          options={options}
          name={tab} />
      })}
    </Tabs>)
}
function createStyles(theme: ThemeType) {
  const tabTheme = theme.tab
  return {
    screenStyle: {
      tabBarStyle: {
        backgroundColor: tabTheme.background,
        borderTopColor: tabTheme.border,
        boxShadow: tabTheme.boxShadow,
        paddingTop: 2,
      },
      tabBarLabelStyle: {
        lineHeight: 20,
        fontSize: 10,
      },
      tabBarIconStyle: {
        width: iconSize,
        height: iconSize,
      }
    },
    tabIconStyle: (focused: boolean) => ({
      width: iconSize,
      height: iconSize,
      backgroundColor: focused ? tabTheme.textActive : tabTheme.textInactive,
      borderRadius: 4,
    }),
    tabBarStyle: {
      tabBarActiveTintColor: tabTheme.textActive,
      tabBarInactiveTintColor: tabTheme.textInactive,
    }
  }
}