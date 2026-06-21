import HomeContent from '@/components/home/content';
import IconFont from '@/components/iconfont';
import { SafeAreaView, ScrollView, TouchableOpacity } from '@/components/ThemeWidget';
import { SearchBar } from '@/components/ui/search-bar';
import { Header } from '@/components/useCommon';
import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { router } from 'expo-router';
import { BottomTabHeaderProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';

export enum HomeTab {
  KSE = 'KSE',
  USS = 'USS'
}

export default function HomeScreen() {
  const tabs = Object.keys(HomeTab).map(key => ({ value: key, label: `tabs.${key}` }))
  const [tab, setTab] = useState<HomeTab>(HomeTab.KSE)
  const { t } = useTranslation('home');
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme])
  return <SafeAreaView>
    <ScrollView>
      <View style={[styles.tabs, commonStyles.rowCenter]}>
        {tabs.map(item => {
          const isActive = tab === item.value;
          return <View style={[styles.tab, commonStyles.rowCenter]} key={item.value}>
            <TouchableOpacity style={commonStyles.relative} onPress={() => setTab(item.value)}>
              <Text style={[styles.tabContent, isActive ? styles.tabContentActive : null]}>{t(item.label)}</Text>
              {isActive && <IconFont style={[styles.tabIndicator, commonStyles.absolute]} color={styles.tabIndicator.color} size={ms(8)} name='icon-16-triangle' />}
            </TouchableOpacity>
          </View>
        })}
      </View>
      <HomeContent tab={tab} />
    </ScrollView>
  </SafeAreaView>
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    tabs: {
      paddingVertical: ms(15)
    },
    tab: {
      flex: 1
    },
    tabIndicator: {
      color: theme.primary,
      left: '50%',
      bottom: ms(-8),
      transform: [
        { translateX: '-50%' }
      ]
    },
    tabContent: {
      color: theme.secondaryText,
      fontSize: ms(18)
    },
    tabContentActive: {
      color: theme.primary,
    }
  })
}

export function HomeSearchBarHeader(props: BottomTabHeaderProps): React.ReactNode {
  const { options, ...rest } = props
  const { theme } = useTheme();
  const sideStyle = { width: ms(29), height: ms(29) }
  const { t } = useTranslation('home');
  const _props = {
    ...rest,
    options: {
      ...options,
      headerLeft: () => <View style={{ paddingLeft: ms(15) }}>
        <View style={{ ...sideStyle, backgroundColor: '#fff', borderRadius: ms(99) }}>
        </View>
      </View>,
      headerRight: () => <View style={{ paddingRight: ms(15) }}>
        <View style={sideStyle}>
          <IconFont color={theme.primaryText} size={29} name='icon-58-message' />
        </View>
      </View>,
      headerTitle: () => <View style={{ paddingHorizontal: ms(10) }}>
        <SearchBar onPress={() => router.push('/(home)/search')} placeholder={t('searchbar.placeholder')} editable={false} />
      </View>,
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: theme.background,
      }
    }
  } as any
  return <Header {..._props} />
}