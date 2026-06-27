import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { Tabs } from 'expo-router';
import { BottomTabNavigationOptions } from 'expo-router/build/react-navigation/bottom-tabs/types';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
const iconSize = 20;

export default function TabLayout() {
  const {theme} = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  const { t } = useTranslation();
  const tabs = ['home', 'ipo', 'assets', 'news', 'profile'];
  const screenOptions: BottomTabNavigationOptions = useMemo(() => ({
    headerShown: false,
    ...styles.screenStyle
  }), [styles])
  const tabBarIcon = useCallback(({ focused }: { focused: boolean }) => {
    return (
      <View style={[styles.tabIconStyle(focused)]} />
    );
  }, [styles])
  const tabScreenOptions = useMemo(() => tabs.map((tab) => ({
    name: tab,
    options: {
      title: t(`tab:${tab}`),
      ...styles.tabBarStyle,
      tabBarIcon,
    } as BottomTabNavigationOptions
  })), [tabs, t, styles, tabBarIcon])

  return (
    <Tabs screenOptions={screenOptions}>
      {tabScreenOptions.map(({ name, options }) => (
        <Tabs.Screen
          key={name}
          options={options}
          name={name} />
      ))}
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