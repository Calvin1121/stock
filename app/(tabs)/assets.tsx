import IconFont, { IconNames } from '@/components/iconfont';
import { SafeAreaView, ScrollView, TouchableOpacity } from '@/components/ThemeWidget';
import { Header } from '@/components/useCommon';
import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { router } from 'expo-router';
import { get } from 'lodash';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
const cardBg = require('@/assets/images/assets-card.png')

const cardFields = ['stockTotalAssets', 'enteringAssets', 'historicalIncome', 'cashBalance', 'frozenAmount', 'pendingSubscription'] as const;
const actionTabs = ['recharge', 'withdraw', 'exchange', 'records'] as const;
const stickyTabs = ['holdingStocks', 'orders'] as const;
const dataItemFieldMap = {
  symbolAndName: ['symbol', 'name'],
  priceAndQuantity: ['price', 'quantity'],
  currentPriceAndCost: ['currentPrice', 'cost'],
  profitAndLoss: ['profit', 'loss'],
  tradeType: ['tradeType']
} as const;
const mockFieldData = {
  symbol: '4311',
  name: 'Test',
  price: '12.34',
  quantity: '100',
  currentPrice: '12.34',
  cost: '12.34',
  profit: '12.34',
  loss: '12.34',
  tradeType: 'buy'
};

type InfoSectionProps = {
  isVisible: boolean
  onToggleVisibility: () => void
  t: (key: string, options?: Record<string, unknown>) => string
  styles: ReturnType<typeof createStyles>
}

type StickySectionProps = {
  selectedTab: string
  setSelectedTab: (value: string) => void
  subTabs: string[]
  t: (key: string, options?: Record<string, unknown>) => string
  styles: ReturnType<typeof createStyles>
  sticky: boolean
}

const InfoSection = memo(function InfoSection({ isVisible, onToggleVisibility, t, styles }: InfoSectionProps) {
  const { theme } = useTheme();
  const dailyReturnVolStyle = true ? theme.success : theme.error;
  const onPressTab = useCallback((tab: string) => {
    switch (tab) {
      case 'recharge':
        // router.push('/(trade)/recharge')
        break
      case 'withdraw':
        router.push('/(trade)/withdraw')
        break
      case 'exchange':
        router.push('/(trade)/exchange')
        break
      case 'records':
        router.push('/(trade)/records')
        break
    }
  }, [])

  return <View style={[styles.infoSection]}>
    <ImageBackground style={[styles.cardContainer]} source={cardBg}>
      <View style={[commonStyles.mainLayoutPadding]}>
        <View style={commonStyles.rowBetween}>
          <Text style={styles.expectTotalAssets}>{t('expectTotalAssets', { currency: t('currency') })}</Text>
          <TouchableOpacity onPress={onToggleVisibility}>
            <IconFont {...styles.visibleIcon} size={ms(21)} name={!isVisible ? 'icon-42-Trade-hidden' : 'icon-42-Trade-display'} />
          </TouchableOpacity>
        </View>
        <View style={[styles.expectTotalAssetsAndDailyReturn]}>
          <Text style={[styles.expectTotalAssetsText]}>{isVisible ? 0 : '***'}</Text>
          <View style={[styles.dailyReturn, commonStyles.rowStart]}>
            <Text style={[styles.dailyReturnText]}>{t('dailyReturn')}</Text>
            <Text style={[styles.dailyReturnText, { color: dailyReturnVolStyle }]}>{isVisible ? 0 : '***'}</Text>
          </View>
        </View>
        <View style={[styles.fieldItems]}>
          {cardFields.map((field, index) => {
            const isLast = index % 3 === 2
            return <View style={[styles.fieldItem, isLast ? commonStyles.alignEnd : commonStyles.alignStart]} key={field}>
              <Text style={[styles.fieldLabel]}>{t(field)}</Text>
              <Text style={[styles.fieldValue]}>{isVisible ? '514,517' : '***'}</Text>
            </View>
          })}
        </View>
      </View>
    </ImageBackground>
    <View style={[styles.tabs, commonStyles.rowCenter]}>
      {actionTabs.map((tab) => <View style={[commonStyles.flex1, commonStyles.columnCenter]} key={tab}>
        <TouchableOpacity onPress={() => onPressTab(tab)} style={[commonStyles.columnCenter]}>
          <IconFont name={`${tab}-dark` as IconNames} size={ms(29)} />
          <Text style={[styles.tabText]}>{t(`tabs.${tab}`)}</Text>
        </TouchableOpacity>
      </View>)}
    </View>
  </View>
});

const StickySection = memo(function StickySection({ t, styles, selectedTab, setSelectedTab, subTabs, sticky }: StickySectionProps) {
  return <View style={[styles.stickySection, !sticky && styles.stickySectionRound]}>
    <View style={[styles.stocksAndOrders]}>
      {stickyTabs.map((tab) => {
        return <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
          <Text style={[styles.stocksAndOrdersText, selectedTab === tab ? styles.stocksAndOrdersActiveText : null]}>{t(tab)}</Text>
        </TouchableOpacity>
      })}
    </View>
    <View style={[commonStyles.flexRow, styles.subTabs]}>
      {subTabs.map((subTab, index) => {
        return <View style={[get(styles, subTab), index ? commonStyles.alignEnd : commonStyles.alignStart]} key={subTab}>
          <Text style={[styles.subTabText]}>{t(`${selectedTab}Tabs.${subTab}`)}</Text>
        </View>
      })}
    </View>
  </View>
});

export default function AssetsScreen() {
  const { t } = useTranslation('assets')
  const { theme } = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  const [isVisible, setIsVisible] = useState(true)
  const [selectedTab, setSelectedTab] = useState('holdingStocks')
  const [infoSectionHeight, setInfoSectionHeight] = useState(0)
  const [sticky, setSticky] = useState(false)
  const handleToggleVisibility = useCallback(() => setIsVisible(prev => !prev), [])
  const subTabs = useMemo(() => {
    if (selectedTab === 'holdingStocks')
      return ['symbolAndName', 'priceAndQuantity', 'currentPriceAndCost', 'profitAndLoss']
    return ['symbolAndName', 'tradeType', 'priceAndQuantity', 'profitAndLoss']
  }, [selectedTab])
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!infoSectionHeight) return
    const isNowSticky = event.nativeEvent.contentOffset.y >= infoSectionHeight - 1
    setSticky(prevSticky => prevSticky === isNowSticky ? prevSticky : isNowSticky)
  }, [infoSectionHeight])
  const handleInfoLayout = useCallback((event: NativeSyntheticEvent<{ layout: { height: number } }>) => {
    setInfoSectionHeight(event.nativeEvent.layout.height)
  }, [])

  return <SafeAreaView>
    <AssetsHeader />
    <ScrollView
      style={commonStyles.flex1}
      stickyHeaderIndices={[1]}
      onScroll={handleScroll}
      scrollEventThrottle={15}
    >
      <View onLayout={handleInfoLayout}>
        <InfoSection isVisible={isVisible} onToggleVisibility={handleToggleVisibility} t={t} styles={styles} />
      </View>
      <StickySection sticky={sticky} subTabs={subTabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} t={t} styles={styles} />
      <View>
        {Array.from({ length: 50 }).map((_, index) => <View style={styles.dataItem} key={index}>
          <View style={[commonStyles.rowBetween]}>
            <Text style={styles.dataItemSymbol}>IPO</Text>
            <Text style={styles.dataItemDate}>2026-06-06 16:05:27</Text>
          </View>
          <View style={[commonStyles.flexRow]}>
            {subTabs.map((subTab, s_i) => {
              const itemFields = get(dataItemFieldMap, subTab, [])
              return <View style={[get(styles, subTab), s_i ? commonStyles.alignEnd : commonStyles.alignStart]} key={`${subTab}_${index}`}>
                {itemFields.map((field, f_i) => {
                  const isProfitAndLoss = subTab === 'profitAndLoss'
                  const isTradeType = subTab === 'tradeType'
                  const value = get(mockFieldData, field) as string | number
                  const valueStyle = isProfitAndLoss ? (+value > 0 ? theme.success : theme.error) : null
                  const colorStyle = valueStyle ? { color: valueStyle } : null
                  return <View style={[styles.subFieldLabelValue]} key={`${subTab}_${index}_${field}`}>
                    {!isTradeType && <Text style={[!f_i ? styles.subFieldLabel : styles.subFieldValue, colorStyle]}>{value}</Text>}
                    {isTradeType && <Text style={[styles.subFieldValue]}>{t(`tradeType.${value}`)}</Text>}
                  </View>
                })}
              </View>
            })}
          </View>
        </View>)}
      </View>
    </ScrollView>
  </SafeAreaView>
}
function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    infoSection: {
      paddingHorizontal: ms(15),
      paddingTop: ms(15)
    },
    cardContainer: {
      width: '100%',
      borderRadius: ms(15),
      overflow: 'hidden'
    },
    expectTotalAssets: {
      fontSize: ms(13),
      lineHeight: ms(17.5),
      color: theme.primaryText
    },
    visibleIcon: {
      color: theme.primaryText
    },
    expectTotalAssetsAndDailyReturn: {
      ...commonStyles.flexRow,
      marginTop: ms(10),
      alignItems: 'center',
      gap: ms(10)
    },
    expectTotalAssetsText: {
      fontSize: ms(28),
      lineHeight: ms(39),
      fontWeight: 600,
      color: theme.primaryText,
    },
    dailyReturn: {
      backgroundColor: 'rgba(27, 82, 178, 0.50)',
      paddingVertical: ms(2),
      paddingHorizontal: ms(6),
      borderRadius: ms(10),
      gap: ms(4)
    },
    dailyReturnText: {
      fontSize: ms(12),
      color: theme.primaryText,
    },
    fieldItems: {
      ...commonStyles.flexRow,
      flexWrap: 'wrap',
      rowGap: ms(10),
      marginTop: ms(15)
    },
    fieldItem: {
      width: '33.33%',
      gap: ms(3)
    },
    fieldLabel: {
      fontSize: ms(10),
      lineHeight: ms(13.5),
      color: 'rgba(255,255,255, .6)'
    },
    fieldValue: {
      fontSize: ms(12),
      lineHeight: ms(17),
      color: '#e6e6e6'
    },
    tabs: {
      paddingVertical: ms(25)
    },
    tabText: {
      fontSize: ms(13),
      lineHeight: ms(17.5),
      color: theme.secondaryText,
      marginTop: ms(4)
    },
    stickySection: {
      backgroundColor: theme.card,
      paddingHorizontal: ms(15),
      // borderTopLeftRadius: ms(25),
      // borderTopRightRadius: ms(25),
    },
    stickySectionRound: {
      borderTopLeftRadius: ms(25),
      borderTopRightRadius: ms(25)
    },
    stocksAndOrders: {
      ...commonStyles.rowStart,
      paddingVertical: ms(15),
      gap: ms(30),
      borderBottomWidth: ms(1),
      borderBottomColor: theme.cardDivide
    },
    stocksAndOrdersText: {
      fontSize: ms(18),
      lineHeight: ms(25),
      color: theme.secondaryText
    },
    stocksAndOrdersActiveText: {
      color: theme.primary
    },
    subTabs: {
      paddingVertical: ms(15),
    },
    subTabText: {
      fontSize: ms(11),
      lineHeight: ms(15),
      color: theme.secondaryText
    },
    symbolAndName: {
      width: '25%',
      paddingRight: ms(5)
    },
    priceAndQuantity: {
      width: '25%',
      paddingHorizontal: ms(2.5)
    },
    currentPriceAndCost: {
      width: '25%',
      paddingHorizontal: ms(2.5)
    },
    profitAndLoss: {
      width: '25%',
      paddingLeft: ms(5)
    },
    tradeType: {
      width: '25%',
      paddingHorizontal: ms(2.5)
    },
    dataItem: {
      padding: ms(15),
      backgroundColor: theme.card,
      marginTop: ms(5),
      gap: ms(15)
    },
    dataItemSymbol: {
      color: theme.primary,
      fontSize: ms(15.5),
      lineHeight: ms(21)
    },
    dataItemDate: {
      color: theme.primaryText,
      fontSize: ms(10),
      lineHeight: ms(13.5)
    },
    subFieldLabelValue: {
      gap: ms(4.5)
    },
    subFieldLabel: {
      color: theme.secondaryText,
      fontSize: ms(10),
      lineHeight: ms(13.5)
    },
    subFieldValue: {
      color: theme.primaryText,
      fontSize: ms(12),
      lineHeight: ms(17)
    },
  })
}

export function AssetsHeader(): React.ReactNode {
  const { theme } = useTheme()
  const { t } = useTranslation('assets')
  const styles = useMemo(() => createHeaderStyles(theme), [theme])
  const props = {
    options: {
      headerLeft: () => <View style={styles.leftHeader}>
        <Text style={[styles.titleText]}>{t('title')}</Text>
      </View>
    }
  }
  return <Header {...props} />
}
function createHeaderStyles(theme: ThemeType) {
  return StyleSheet.create({
    leftHeader: {
      paddingLeft: ms(15)
    },
    titleText: {
      color: theme.primaryText,
      fontSize: ms(18),
      lineHeight: ms(25)
    }
  })
}
