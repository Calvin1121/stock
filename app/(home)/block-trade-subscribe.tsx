import { SafeAreaView, ScrollView } from "@/components/ThemeWidget";
import { Button, Input } from "@/components/ui";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { get } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { ms } from "react-native-size-matters";

export default function BlockTradeSubscribePage() {
    const { t } = useTranslation('home')
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const fields = ['marketPrice', 'priceDiff', 'publishPrice', 'discountRate', 'buyCount']
    const infoFields = ['openDate', 'closeDate', 'matchDate', 'IPODate', 'IPOPrice', 'stockCount', 'confirmPrice']
    const data = {
        tradeName: 'White Hawk Minerals Corp',
        tradeShortName: 'WHK',
        marketPrice: '9.50',
        priceDiff: '15.50',
        publishPrice: '25.00',
        discountRate: '123.88%', 
        buyCount: '25560000',
        openDate: '2026-06-10',
        closeDate: '2026-06-17',
        matchDate: '2026-06-17',
        IPODate: '2026-06-18',
        IPOPrice: '6.70',
        stockCount: '',
        confirmPrice: '15.00'
    }

    return <SafeAreaView>
        <ScrollView style={[commonStyles.flex1]}>
            <View style={[styles.mainContainer]}>
                <View><Text style={[styles.tradeNameText]}>{data.tradeName}</Text></View>
                <View><Text style={[styles.tradeShortNameText]}>{data.tradeShortName}</Text></View>
                <View style={[styles.fieldItems]}>
                    {fields.map((field, f_i) => {
                        const isFirst = f_i % 3 === 0
                        const isLast = f_i % 3 === 2
                        const itemRowStyle: ViewStyle = isLast ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }
                        const itemPaddingStyle = isFirst ? { paddingRight: ms(5) } : isLast ? { paddingLeft: ms(5) } : { paddingHorizontal: ms(2.5) }
                        const value = get(data, field)
                        const isRate = field === 'discountRate'
                        const isDiff = field === 'priceDiff'
                        const colorStyle = isRate || isDiff ? { color: parseFloat(value) > 0 ? theme.success : theme.error } : undefined
                        const priceUnit = ['marketPrice', 'priceDiff', 'publishPrice'].includes(field) ? { priceUnit: t('blockTrade.priceUnit') } : undefined
                        return <View key={`${field}_${f_i}`} style={[styles.fieldItem, itemRowStyle, itemPaddingStyle]}>
                            <Text style={[styles.fieldLabel]}>{t(`blockTrade.${field}`, priceUnit)}</Text>
                            <Text style={[styles.fieldValue, colorStyle]}>{value}</Text>
                        </View>
                    })}
                </View>
                <View style={[styles.infoItems]}>
                    {infoFields.map((field, index) => {
                        const isStockCount = field === 'stockCount'
                        const rowStyle = isStockCount ? commonStyles.flexColumn : commonStyles.rowBetween
                        const value = get(data, field)
                        const isCurrency = ['IPOPrice', 'confirmPrice'].includes(field)
                        return <View key={field} style={[styles.infoItem, rowStyle, index ? styles.borderTop : null]}>
                            <Text style={[styles.infoItemLabel]}>{t(`blockTrade.subscribe.${field}`)}</Text>
                            {!isStockCount && <Text style={[styles.infoItemValue]}>{value}{isCurrency ? ` ${t('blockTrade.subscribe.currency')}` : ''}</Text>}
                            {isStockCount && <Input
                                containerStyle={styles.stockCountInput}
                                variant="outline"
                                placeholder={t('OTC.purchaseQuantity')} />
                            }
                        </View>
                    })}
                </View>
            </View>
        </ScrollView>
        <View style={[commonStyles.mainLayoutPadding]}>
            <Button>{t('blockTrade.subscribe.submit')}</Button>
        </View>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        mainContainer: {
            paddingHorizontal: ms(15),
            paddingTop: ms(20)
        },
        tradeNameText: {
            color: theme.primaryText,
            fontSize: ms(21),
            lineHeight: ms(29.5)
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
        infoItems: {

        },
        infoItem: {
            paddingVertical: ms(15)
        },
        infoItemLabel: {
            color: theme.secondaryText,
            fontSize: ms(15),
            lineHeight: ms(21)
        },
        infoItemValue: {
            color: theme.primaryText,
            fontSize: ms(15),
            lineHeight: ms(21),
            fontWeight: 500
        },
        stockCountInput: {
            marginTop: ms(15),
            paddingHorizontal: ms(16),
            borderColor: theme.card,
            backgroundColor: theme.card
        },
        borderTop: {
            borderTopWidth: ms(1),
            borderTopColor: theme.backgroundDivide
        },
    })
}