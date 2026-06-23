import IconFont from '@/components/iconfont';
import { SafeAreaView, ScrollView, TouchableOpacity } from '@/components/ThemeWidget';
import { MiniSparkline } from '@/components/ui';
import { SearchBar } from '@/components/ui/search-bar';
import StockItem from '@/components/ui/stock-item';
import { Header } from '@/components/useCommon';
import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { StockField } from '@/utils/consts';
import { router } from 'expo-router';
import { BottomTabHeaderProps } from 'expo-router/build/react-navigation/bottom-tabs';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';

export enum HomeTab {
  KSE = 'KSE',
  USS = 'USS'
}
export enum Category {
  OTC = 'OTC',
  blockTrade = 'blockTrade',
  preMarket = 'preMarket',
  creditLoan = 'creditLoan'
}
export default function HomeScreen() {
  const tabs = Object.keys(HomeTab).map(key => ({ value: key as HomeTab, label: `tabs.${key}` }))
  const [tab, setTab] = useState<HomeTab>(HomeTab.KSE)
  const { t } = useTranslation('home');
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme])
  const snapshots = [
    { name: 'TOPIX 1000 IN TOPIX 1000 IN', price: '3529.39', trend: '+0.00', change: '+0.00%' },
    { name: 'TOPIX 1000 IN...', price: '3529.39', trend: '+0.00', change: '+0.00%' },
    { name: 'TOPIX 1000 IN...', price: '3529.39', trend: '+0.00', change: '+0.00%' }
  ]
  const mains = Object.keys(StockField).map(key => ({ value: key as StockField, label: `mains.${key}` }))
  const mockData = [
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' }, { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' }, { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' }, { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '-30.65', trend: '-3.33', change: '-1.53%' }, { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' }, { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
    { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '-30.65', trend: '-3.33', change: '-1.53%' }
  ]
  const data = [
    100,
    120,
    110,
    140,
    130,
    125,
    150,
    145,
    155,
    135,
    120,
    140,
  ]
  const categories = Object.keys(Category).map(key => ({ value: key as Category, label: `category.${key}` }))
  const isUSS = tab === HomeTab.USS
  const onTabTap = (value: Category) => {
    switch (value) {
      case Category.OTC:
        return router.push('/(home)/OTC')
      case Category.preMarket:
        return router.push('/(home)/market')
    }
  }
  const getColStyle = useCallback((key: StockField) => {
    return key === StockField.symbol ? { flex: 1.5, ...commonStyles.rowStart } :
      [commonStyles.flex1, key === StockField.chg ? commonStyles.rowEnd : commonStyles.rowCenter]
  }, [])
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
      {isUSS && <View style={[styles.snapshots, commonStyles.rowCenter]}>
        {snapshots.map((snapshot, index) => {
          const _price = Number(snapshot.price)
          const _trend = Number(snapshot.trend)
          const _change = parseFloat(snapshot.change)
          const priceStyle = _price < 0 ? styles.downStyle : styles.upStyle
          const trendStyle = _trend < 0 ? styles.downStyle : styles.upStyle
          const changeStyle = _change < 0 ? styles.downStyle : styles.upStyle

          return <View style={[commonStyles.flex1, styles.snapshot]} key={index}>
            <View style={[styles.snapshotName]}><Text style={[styles.snapshotNameText]} numberOfLines={1}>{snapshot.name}</Text></View>
            <View style={[commonStyles.alignCenter]}><Text style={[styles.snapshotPrice, priceStyle]}>{snapshot.price}</Text></View>
            <View style={[commonStyles.rowCenter]}>
              <Text style={[styles.snapshotTrendChange, trendStyle]}>{snapshot.trend}</Text>
              <Text style={[styles.snapshotTrendChange, changeStyle]}>{snapshot.change}</Text>
            </View>
            <MiniSparkline color={!index ? styles.downStyle.color : styles.upStyle.color} width={s(105)} height={vs(33)} data={data} />
          </View>
        })}
      </View>}
      <View style={[commonStyles.flex1, commonStyles.flexRow, styles.categories]}>
        {categories.map(category => <View style={[commonStyles.columnCenter, commonStyles.flex1]} key={category.value}>
          <TouchableOpacity onPress={() => onTabTap(category.value)} style={commonStyles.columnCenter}>
            <View style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{t(category.label)}</Text>
          </TouchableOpacity>
        </View>)}
      </View>
      <View style={[styles.main]}>
        <View style={[commonStyles.rowBetween, commonStyles.mainLayoutPadding]}>
          <View style={commonStyles.rowCenter}>
            <Text style={styles.mainTitleText}>{t('title')}</Text>
            {/* <LinearGradient /> */}
          </View>
          <View>
            <TouchableOpacity onPress={() => router.push({pathname: '/(home)/more'})} style={commonStyles.rowCenter}>
              <Text style={styles.mainTitleMoreText}>{t('more')}</Text>
              <IconFont color={styles.mainTitleMoreText.color} size={18} name="icon-32-arrow-left" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainContent}>
          <View style={[commonStyles.rowBetween, styles.mainSegment, styles.divideBorder]}>
            {mains.map((main) => {
              const itemStyle = getColStyle(main.value)
              return <View style={itemStyle} key={main.value}><Text style={styles.mainSegmentText}>{t(main.label)}</Text></View>
            })}
          </View>
          <View style={commonStyles.flex1}>
            {mockData.map((item, index) => {
              return <View key={index} style={[commonStyles.rowBetween, styles.mainSegment, index === mockData?.length - 1 ? null : styles.divideBorder]}>
                {mains.map((main, m_index) => <React.Fragment key={`${index}_${main.value}_${m_index}`}><StockItem mainKey={main.value} {...item} /></React.Fragment>)}
              </View>
            })}
          </View>
        </View>
      </View>
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
    },
    snapshots: {
      padding: ms(15),
      gap: ms(12),
    },
    snapshot: {
      backgroundColor: theme.snapCard,
      borderRadius: ms(4),
      paddingBottom: ms(8),
      overflow: 'hidden'
    },
    snapshotName: {
      padding: ms(10),
    },
    snapshotNameText: {
      color: theme.primaryText,
      fontSize: ms(13),
      lineHeight: ms(17.5)
    },
    snapshotPrice: {
      fontSize: ms(18),
      lineHeight: ms(25),
      marginBottom: ms(2)
    },
    snapshotTrendChange: {
      fontSize: ms(10),
      lineHeight: ms(13.5),
      marginBottom: ms(15)
    },
    categories: {
      paddingVertical: ms(15)
    },
    categoryIcon: {
      width: 32,
      height: 32,
      backgroundColor: '#41D6F5',
      borderRadius: 5
    },
    categoryText: {
      color: theme.primaryText,
      marginTop: ms(7),
      fontSize: ms(10)
    },
    main: {
      // paddingVertical: ms(15)
    },
    mainTitleBorder: {
    },
    mainTitleText: {
      color: theme.primaryText,
      fontSize: ms(18),
      lineHeight: ms(25)
    },
    mainTitleMoreText: {
      color: theme.secondaryText,
      fontSize: ms(15),
      lineHeight: ms(21)
    },
    mainContent: {
      backgroundColor: theme.card,
      borderRadius: ms(25),
      paddingHorizontal: ms(15)
    },
    divideBorder: {
      borderBottomWidth: ms(1),
      borderBottomColor: theme.cardDivide
    },
    mainSegment: {
      paddingVertical: ms(10),
    },
    mainSegmentText: {
      color: theme.secondaryText,
      fontSize: ms(11),
      lineHeight: ms(15)
    },
    commonStyle: {
      color: theme.secondaryText
    },
    upStyle: {
      color: theme.success
    },
    downStyle: {
      color: theme.error
    },
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