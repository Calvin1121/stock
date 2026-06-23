import IconFont from "@/components/iconfont"
import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget"
import { Button } from "@/components/ui"
import { ThemeType } from "@/constants/Colors"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, Text, View } from "react-native"
import { ms } from "react-native-size-matters"

export default function MarketPage() {
    const { theme } = useTheme()
    const { t } = useTranslation('home')
    const styles = useMemo(() => createStyles(theme), [theme])
    const [isCollected, setIsCollected] = useState(false)
    const collectIcon = !isCollected ? 'icon-48-CollectionDefault' : 'a-icon-48-CollectionSelectedsvg'
    const infos = [['open', 'high', 'vol'], ['last', 'low', 'TO']]
    return <>
        <SafeAreaView>
            <ScrollView style={commonStyles.flex1}>
                <View style={[commonStyles.mainLayoutPadding, styles.breifSection]}>
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
                                const rowStyle = isLast? commonStyles.rowEnd : commonStyles.rowStart
                                const itemStyle = isLast? styles.lastItem: styles.nonLastItem
                                return <View key={`${index}_${it}`} style={[rowStyle, itemStyle]}>
                                <Text style={[styles.infoLabel]}>{t(`market.${it}`)}</Text>
                                <Text style={[styles.infoValue]}>{isLast? 0 : 1309.00}</Text>
                            </View>
                            })}
                        </View>)}
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.buttons]}>
                <View style={commonStyles.flex1}>
                    <Button type="success">{t('market.long')}</Button>
                </View>
                <View style={commonStyles.flex1}>
                    <Button type="danger">{t('market.short')}</Button>
                </View>
            </View>
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
    return <View style={[commonStyles.alignEnd]}>
        <TouchableOpacity style={{ marginRight: ms(15) }}>
            <IconFont color={theme.primaryText} size={ms(24)} name="a-icon-48-Fullscreen" />
        </TouchableOpacity>
    </View>

}