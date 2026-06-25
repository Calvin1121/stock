import IconFont from "@/components/iconfont"
import { sampleBars } from '@/components/klineMock'
import KLineWeb from '@/components/KLineWeb'
import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget"
import { Button } from "@/components/ui"
import { Header } from "@/components/useCommon"
import { ThemeType } from "@/constants/Colors"
import { useGlobalStore } from "@/lib/globalStore"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { NativeStackHeaderProps, usePathname } from "expo-router"
import * as ScreenOrientation from 'expo-screen-orientation'
import { get } from "lodash"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { DimensionValue, StyleSheet, Text, View, ViewStyle } from "react-native"
import { ms } from "react-native-size-matters"
const orderPriceOptions = [
    { label: 'market.orderBook', value: 'market.orderBookKeys' },
    { label: 'market.priceVol', value: 'market.priceVolKeys' }
]
const keyMap = {
    'market.orderBookKeys': ['buy', 'buyCount', 'price', 'saleCount', 'sale'],
    'market.priceVolKeys': ['time', 'dealPrice', 'dealVol']
}

export default function MarketPage() {
    const pathname = usePathname()
    const fullScreenMap = useGlobalStore(s => s.fullScreenMap)
    const setFullScreenMap = useGlobalStore(s => s.setFullScreenMap)
    const { theme } = useTheme()
    const { t } = useTranslation('home')
    const [orderPriceOption, setOrderPriceOption] = useState(orderPriceOptions[0].value)
    const isOrderBook = useMemo(() => orderPriceOption === orderPriceOptions?.[0].value, [orderPriceOption])
    const styles = useMemo(() => createStyles(theme), [theme])
    const isFullScreen = useMemo(() => get(fullScreenMap, pathname), [fullScreenMap, pathname])
    const [isCollected, setIsCollected] = useState(false)
    const collectIcon = !isCollected ? 'icon-48-CollectionDefault' : 'a-icon-48-CollectionSelectedsvg'
    const infos = [['open', 'high', 'vol'], ['last', 'low', 'TO']]
    const tabRenderKeys = useMemo(() => (get(keyMap, orderPriceOption) || []) as string[], [orderPriceOption])
    const mockData = [
        { buy: '1', sale: '1', buyCount: '15.2383', saleCount: '15.2383', buyPrice: '8245.65', salePrice: '-8245.65', buyPercent: '20%', salePercent: '20%', dealVol: '15.2383', time: '06/12 04:30:56', dealPrice: '8245.65' },
        { buy: '1', sale: '1', buyCount: '15.2383', saleCount: '15.2383', buyPrice: '8245.65', salePrice: '-8245.65', buyPercent: '40%', salePercent: '40%', dealVol: '15.2383', time: '06/12 04:30:56', dealPrice: '8245.65' }
    ]
    const getOrderBookRowStyle = useCallback((index: number) => {
        const tabLength = tabRenderKeys.length
        const middleIndex = tabLength % 3
        const _index = index + 1;
        const isFirst = !index
        const isLast = _index === tabLength
        if (!middleIndex) return {}
        if (index < middleIndex)
            return { width: isFirst ? ms(25) : ms(55), ...commonStyles.rowStart }
        if (index > middleIndex)
            return { width: isLast ? ms(25) : ms(55), ...commonStyles.rowEnd }
        return { ...commonStyles.flex1, ...commonStyles.center }
    }, [tabRenderKeys])
    const getPriceRowStyle = useCallback((key_index: number) => {
        const itemStyle: ViewStyle = { ...commonStyles.flex1, ...commonStyles.rowCenter }
        if (!key_index) Object.assign(itemStyle, commonStyles.rowStart)
        if (key_index === tabRenderKeys.length - 1) Object.assign(itemStyle, commonStyles.rowEnd)
        return itemStyle
    }, [tabRenderKeys])
    const onFullScreen = useCallback(async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    }, [])
    const onExitFullScreen = useCallback(async () => {
        setFullScreenMap(pathname, false)
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }, [])
    useEffect(() => {
        return () => {
            onExitFullScreen()
        }
    }, [])
    useEffect(() => {
        if(isFullScreen)
            onFullScreen()
    }, [onFullScreen, isFullScreen])
    const orderBookRender = (key: string, key_index: number, item: any, index: number) => {
        const isPrice = key === 'price'
        const itemStyle = getOrderBookRowStyle(key_index)
        if (isPrice)
            return <View style={[itemStyle, styles.orderAndPriceContentItemPrices, commonStyles.rowCenter]} key={`${key}_${item}_${index}`}>
                {['buyPrice', 'salePrice'].map((priceKey, p_i) => {
                    const priceValue = get(item, priceKey) || ''
                    const width = (get(item, !p_i ? 'buyPercent' : 'salePercent') || 0) as DimensionValue
                    const priceColor = priceValue > 0 ? theme.success : theme.error
                    const percentStyle = { backgroundColor: priceColor, width }
                    if (p_i) Object.assign(percentStyle, { left: 0 })
                    else Object.assign(percentStyle, { right: 0 })
                    return <View style={[styles.orderAndPriceContentItemPrice, !p_i ? commonStyles.rowEnd : commonStyles.rowStart]} key={`${key}_${item}_${index}_${priceKey}`}>
                        <Text style={[styles.orderAndPriceContentItemPriceText, { color: priceColor }]}>{Math.abs(priceValue)}</Text>
                        <View style={[styles.orderAndPriceContentItemPricePercent, percentStyle]} />
                    </View>
                })}
            </View>
        return <View style={[itemStyle]} key={`${key}_${item}_${index}`}>
            <Text style={[styles.orderAndPriceContentItemText]}>{get(item, key) || ''}</Text>
        </View>
    }
    const priceVolRender = (key: string, key_index: number, item: any, index: number) => {
        const itemStyle = getPriceRowStyle(key_index)
        return <View style={[itemStyle, styles.priceVolItem]} key={`${key}_${item}_${index}`}>
            <Text style={[styles.orderAndPriceContentItemText]}>{get(item, key) || ''}</Text>
        </View>
    }
    return <>
        <SafeAreaView>
            <ScrollView style={commonStyles.flex1}>
                {!isFullScreen && <View style={[commonStyles.mainLayoutPadding, styles.breifSection]}>
                    <View style={[commonStyles.rowCenter]}>
                        <View style={[commonStyles.flex1]}><Text style={styles.breifTitle}>Maruha Nichiro Corporation</Text></View>
                        <TouchableOpacity onPress={() => setIsCollected(prev => !prev)}>
                            <IconFont color={theme.primaryText} size={ms(24)} name={collectIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={[commonStyles.rowStart, styles.stockNoLabel]}>
                        <View style={styles.stockLabel}><Text style={styles.stockLabelText}>US</Text></View>
                        <Text style={styles.stockNo}>AAPL34</Text>
                    </View>
                    <View><Text style={[styles.priceText, styles.upStyle]}>1309.00</Text></View>
                    <View style={[commonStyles.rowStart, styles.trendChange]}>
                        <Text style={[styles.trendChangeText, styles.upStyle]}>+0.00</Text>
                        <Text style={[styles.trendChangeText, styles.upStyle]}>+0.00%</Text>
                    </View>
                    <View style={[styles.infoSection]}>
                        {infos.map((info, index) => <View key={index} style={[commonStyles.flex1, commonStyles.rowBetween, styles.infoSection]}>
                            {info.map(it => {
                                const isLast = ['vol', 'TO'].includes(it)
                                const rowStyle = isLast ? commonStyles.rowEnd : commonStyles.rowStart
                                const itemStyle = isLast ? styles.lastItem : styles.nonLastItem
                                return <View key={`${index}_${it}`} style={[rowStyle, itemStyle]}>
                                    <Text style={[styles.infoLabel]}>{t(`market.${it}`)}</Text>
                                    <Text style={[styles.infoValue]}>{isLast ? 0 : 1309.00}</Text>
                                </View>
                            })}
                        </View>)}
                    </View>
                </View>}
                {<KLineWeb height={360} bars={sampleBars} />}
                <View style={[styles.orderAndPrice,]}>
                    <View style={[styles.orderAndPriceTabs, commonStyles.rowCenter]}>
                        {orderPriceOptions.map((item) => <View style={[commonStyles.flex1, commonStyles.rowCenter]} key={item.value}>
                            <TouchableOpacity onPress={() => setOrderPriceOption(item.value)}>
                                <Text style={[styles.orderAndPriceTabText, item.value === orderPriceOption ? styles.orderAndPriceTabActiveText : null]}>{t(item.label)}</Text>
                            </TouchableOpacity>
                        </View>)}
                    </View>
                    {<View style={styles.orderAndPriceContent}>
                        <View style={[styles.orderAndPriceContentTitle,]}>
                            {tabRenderKeys?.map((item, index) => {
                                const params = ['buyCount', 'saleCount', 'dealVol'].includes(item) ? { unit: t(`${orderPriceOption}.unit`) } :
                                    ['price', 'dealPrice'].includes(item) ? { currency: t(`${orderPriceOption}.currency`) } : undefined
                                const itemStyle: ViewStyle = isOrderBook ? getOrderBookRowStyle(index) : getPriceRowStyle(index)
                                return <View style={[itemStyle]} key={`${item}_${index}`}>
                                    <Text style={[styles.orderAndPriceContentTitleText]}>{t(`${orderPriceOption}.${item}`, params)}</Text>
                                </View>
                            })}
                        </View>
                        <View style={styles.orderAndPriceContentList}>
                            {mockData.map((item, index) => <View style={styles.orderAndPriceContentItem} key={`${index}_${item}_${index}`}>
                                {tabRenderKeys?.map((key, key_index) => {
                                    if (isOrderBook) return orderBookRender(key, key_index, item, index)
                                    return priceVolRender(key, key_index, item, index)
                                })}
                            </View>)}
                        </View>
                    </View>}
                </View>
            </ScrollView>
            {!isFullScreen && <View style={[styles.buttons]}>
                <View style={commonStyles.flex1}>
                    <Button type="success">{t('market.long')}</Button>
                </View>
                <View style={commonStyles.flex1}>
                    <Button type="danger">{t('market.short')}</Button>
                </View>
            </View>}
        </SafeAreaView>
    </>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        breifSection: {
            gap: ms(10)
        },
        breifTitle: {
            color: theme.primaryText,
            fontSize: ms(16),
            lineHeight: ms(22.5),
            paddingRight: ms(15)
        },
        stockNoLabel: {
            gap: ms(5)
        },
        stockLabel: {
            backgroundColor: theme.card,
            borderRadius: ms(2),
            paddingHorizontal: ms(6),
        },
        stockLabelText: {
            color: theme.primary,
            fontSize: ms(10),
            lineHeight: ms(13.5)
        },
        stockNo: {
            color: theme.secondaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5)
        },
        downStyle: {
            color: theme.error
        },
        upStyle: {
            color: theme.success
        },
        priceText: {
            fontSize: ms(16),
            lineHeight: ms(22.5)
        },
        trendChange: {
            gap: ms(15)
        },
        trendChangeText: {
            fontSize: ms(12),
            lineHeight: ms(17)
        },
        infoSection: {
            gap: ms(10)
        },
        infoItem: {
            gap: ms(15),
        },
        nonLastItem: {
            flex: 2,
            gap: ms(10)
        },
        lastItem: {
            flex: 1,
            gap: ms(10)
        },
        infoLabel: {
            color: theme.secondaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5),
        },
        infoValue: {
            color: theme.primaryText,
            fontWeight: 500,
            fontSize: ms(13),
            lineHeight: ms(17.5),
        },
        orderAndPrice: {

        },
        orderAndPriceTabs: {
            paddingVertical: ms(15),
        },
        orderAndPriceTabText: {
            fontSize: ms(18),
            lineHeight: ms(25),
            color: theme.secondaryText
        },
        orderAndPriceTabActiveText: {
            color: theme.primary
        },
        orderAndPriceContent: {
            paddingHorizontal: ms(15)
        },
        orderAndPriceContentTitle: {
            ...commonStyles.flexRow,
            gap: ms(10)
        },
        orderAndPriceContentTitleText: {
            color: theme.secondaryText,
            fontSize: ms(11),
            lineHeight: ms(15)
        },
        orderAndPriceContentList: {
            paddingVertical: ms(3)
        },
        orderAndPriceContentItem: {
            ...commonStyles.flexRow
        },
        orderAndPriceContentItemText: {
            color: theme.primaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5)
        },
        priceVolItem: {
            paddingVertical: ms(3)
        },
        orderAndPriceContentItemPrices: {
            gap: ms(5)
        },
        orderAndPriceContentItemPrice: {
            ...commonStyles.relative,
            ...commonStyles.flex1,
        },
        orderAndPriceContentItemPriceText: {
            paddingVertical: ms(3)
        },
        orderAndPriceContentItemPricePercent: {
            ...commonStyles.absolute,
            height: '100%',
            opacity: 0.2,
            top: 0,
            bottom: 0
        },
        buttons: {
            ...commonStyles.mainLayoutPadding,
            flexDirection: 'row',
            gap: ms(15),
            backgroundColor: theme.card
        }
    })
}

export const MarketHeaderRight = () => {
    const { theme } = useTheme()
    const pathname = usePathname();
    const setFullScreenMap = useGlobalStore(s => s.setFullScreenMap)
    const onFullScreen = useCallback(() => {
        setFullScreenMap(pathname, true)
    }, [pathname, setFullScreenMap])
    return <View style={[commonStyles.alignEnd]}>
        <TouchableOpacity onPress={onFullScreen} style={{ marginRight: ms(15) }}>
            <IconFont color={theme.primaryText} size={ms(24)} name="a-icon-48-Fullscreen" />
        </TouchableOpacity>
    </View>

}

export const MarketHeader = (props: NativeStackHeaderProps) => {
    const pathname = usePathname();
    const fullScreenMap = useGlobalStore(s => s.fullScreenMap)
    const isFullScreen = useMemo(() => get(fullScreenMap, pathname), [fullScreenMap, pathname])
    if (isFullScreen) return null
    return <Header {...props} />
}