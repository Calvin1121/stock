import { SafeAreaView, ScrollView } from "@/components/ThemeWidget";
import { Button, Input } from "@/components/ui";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { get } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function IPOSubscribePage() {
    const { t } = useTranslation('ipo')
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const data = { stockName: 'TES2', stockLabel: 'US', stockId: 'AAPL34', publishPrice: '1 USD', deadline: '2026-06-18 00:00:00', frozenAmount: '0.00', amount: '0.00' }
    const infoFields = ['publishPrice', 'deadline', 'buyCount', 'amount', 'frozenAmount']
    return <SafeAreaView>
        <ScrollView style={commonStyles.flex1}>
            <View style={commonStyles.mainLayoutPadding}>
                <View style={commonStyles.flex1}><Text style={[styles.nameText]}>{data.stockName}</Text></View>
                <View style={[styles.labelAndId, commonStyles.rowStart]}>
                    <View style={styles.stockLabel}><Text style={styles.stockLabelText}>US</Text></View>
                    <Text style={styles.stockIdText}>{get(data, 'stockId')}</Text>
                </View>
                <View style={[styles.infoItems]}>
                    {infoFields.map((field, index) => {
                        const isBuyCount = field === 'buyCount'
                        const rowStyle = isBuyCount ? commonStyles.flexColumn : commonStyles.rowBetween
                        const value = get(data, field)
                        return <View key={field} style={[styles.infoItem, rowStyle, index ? styles.borderTop : null]}>
                            <Text style={[styles.infoItemLabel]}>{t(`subscribe.${field}`)}</Text>
                            {!isBuyCount && <Text style={[styles.infoItemValue]}>{value}</Text>}
                            {isBuyCount && <Input
                                containerStyle={styles.stockCountInput}
                                variant="outline"
                                placeholder={t('subscribe.buyCount')} />
                            }
                        </View>
                    })}
                </View>
            </View>
        </ScrollView>
        <View style={commonStyles.mainLayoutPadding}>
            <Button>{t('subscribe.confirm')}</Button>
        </View>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        nameText: {
            color: theme.primaryText,
            fontSize: ms(21),
            lineHeight: ms(29.5)
        },
        labelAndId: {
            gap: ms(5),
            marginBottom: ms(10)
        },
        stockLabel: {
            backgroundColor: theme.stockLabel,
            borderRadius: ms(2),
            paddingHorizontal: ms(6),
        },
        stockLabelText: {
            color: theme.primary,
            fontSize: ms(10),
            lineHeight: ms(13.5)
        },
        stockIdText: {
            color: theme.secondaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5)
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