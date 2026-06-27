import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget";
import { Button, Divider } from "@/components/ui";
import { ScrollTabs } from "@/components/ui/scroll-tabs";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { router } from "expo-router";
import { get } from "lodash";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { ms } from "react-native-size-matters";


export default function BlockTradePage() {
    const { t } = useTranslation('home')
    const { theme } = useTheme()
    const tabs = useMemo(() => [
        { label: t('blockTrade.tabs.subscribed'), value: 'subscribed' },
        { label: t('blockTrade.tabs.inProgress'), value: 'inProgress' },
        { label: t('blockTrade.tabs.IPOSuccessful'), value: 'IPOSuccessful' }
    ], [t])
    const [tab, setTab] = useState(tabs[0].value)
    const styles = useMemo(() => creareStyles(theme), [theme])
    const onSetTab = (tab: string) => {
        setTab(tab)
    }
    const isSubscribed = tab === 'subscribed'
    const mockData = [
        { tradeName: 'White Hawk Minerals Corp', tradeShortName: 'WHK', marketPrice: '9.50', priceDiff: '15.50', publishPrice: '25.00', discountRate: '123.88%', buyCount: '25560000', buyTime: '2026/11/11 至 2026/11/115' },
        { tradeName: 'First Carolina Financial Service Inc', tradeShortName: 'FCBM', marketPrice: '9.50', priceDiff: '15.50', publishPrice: '25.00', discountRate: '123.88%', buyCount: '25560000', buyTime: '2026/11/11 至 2026/11/115' },
    ]
    const fields = ['marketPrice', 'priceDiff', 'publishPrice', 'discountRate', 'buyCount']
    return <SafeAreaView>
        <ScrollTabs tabs={tabs} tab={tab} onTab={(item) => onSetTab(item.value)} />
        <ScrollView style={[commonStyles.flex1]}>
            <View style={[styles.tradeList]}>
                {mockData.map((item, index) => <TouchableOpacity style={[styles.tradeItem]} key={index}>
                    <View style={[styles.mainContent]}>
                        <View style={[styles.tradeNameAndStatus, commonStyles.rowBetween]}>
                            <View style={[styles.tradeName, commonStyles.flex1]}>
                                <Text style={[styles.tradeNameText]}>{item.tradeName}</Text>
                            </View>
                            {isSubscribed && <Button onPress={() => router.push('/block-trade-subscribe')} variant="solid" textStyle={commonStyles.subscribeBtnText} style={[commonStyles.subscribeBtn]}>{t('blockTrade.subscribeBtn')}</Button>}
                        </View>
                        <View><Text style={[styles.tradeShortNameText]}>{item.tradeShortName}</Text></View>
                        <View style={[styles.fieldItems]}>
                            {fields.map((field, f_i) => {
                                const isFirst = f_i % 3 === 0
                                const isLast = f_i % 3 === 2
                                const itemRowStyle: ViewStyle = isLast ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }
                                const itemPaddingStyle = isFirst ? { paddingRight: ms(5) } : isLast ? { paddingLeft: ms(5) } : { paddingHorizontal: ms(2.5) }
                                const value = get(item, field)
                                const isRate = field === 'discountRate'
                                const isDiff = field === 'priceDiff'
                                const colorStyle = isRate || isDiff ? { color: parseFloat(value) > 0 ? theme.success : theme.error } : undefined
                                const priceUnit = ['marketPrice', 'priceDiff', 'publishPrice'].includes(field) ? { priceUnit: t('blockTrade.priceUnit') } : undefined
                                return <View key={`${field}_${index}`} style={[styles.fieldItem, itemRowStyle, itemPaddingStyle]}>
                                    <Text style={[styles.fieldLabel]}>{t(`blockTrade.${field}`, priceUnit)}</Text>
                                    <Text style={[styles.fieldValue, colorStyle]}>{value}</Text>
                                </View>
                            })}
                        </View>
                    </View>
                    <View style={[styles.buyTime, commonStyles.rowBetween]}>
                        <Text style={[styles.fieldLabel, styles.buyTimeText]}>{t('blockTrade.buyTime')}</Text>
                        <Text style={[styles.fieldValue, styles.buyTimeText]}>{get(item, 'buyTime')}</Text>
                    </View>
                </TouchableOpacity>)}
            </View>
            <Divider />
        </ScrollView>
    </SafeAreaView>
}

function creareStyles(theme: ThemeType) {
    return StyleSheet.create({
        tradeList: {
            paddingHorizontal: ms(15),
            paddingVertical: ms(7.5),
            gap: ms(15)
        },
        tradeItem: {
            backgroundColor: theme.card,
            // paddingVertical: ms(20),
            borderRadius: ms(10),
        },
        mainContent: {
            padding: ms(15)
        },
        tradeNameAndStatus: {
            gap: ms(15)
        },
        tradeName: {

        },
        tradeNameText: {
            color: theme.primaryText,
            fontSize: ms(15),
            lineHeight: ms(21)
        },
        tradeShortNameText: {
            marginTop: ms(5),
            color: theme.secondaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5)
        },
        fieldItems: {
            ...commonStyles.flexRow,
            flexWrap: 'wrap',
            rowGap: ms(10),
            marginTop: ms(15),

        },
        fieldItem: {
            width: '33.33%',
            alignItems: 'flex-end'
        },
        fieldLabel: {
            color: theme.secondaryText,
            fontSize: ms(10),
            lineHeight: ms(13.5)
        },
        fieldValue: {
            color: theme.primaryText,
            fontSize: ms(15),
            lineHeight: ms(21),
            fontWeight: 500
        },
        buyTime: {
            borderTopColor: theme.cardDivide,
            borderTopWidth: ms(1),
            padding: ms(15)
        },
        buyTimeText: {
            fontSize: ms(13),
            lineHeight: ms(17.5),
        }
    })
}