import { SafeAreaView, ScrollView } from "@/components/ThemeWidget";
import { Button } from "@/components/ui";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { useLocalSearchParams } from "expo-router";
import { get } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function IPOHistoryDetailPage() {
    const params: Record<string, string> = useLocalSearchParams()
    const { theme } = useTheme()
    const { t } = useTranslation('ipo')
    const styles = useMemo(() => createStyles(theme), [theme])
    const data = { 
        stockName: 'TES2', 
        stockLabel: 'US', 
        stockId: 'AAPL34', 
        newStockPrice: '1 USD', 
        subscribeTime: '2026-06-18 00:00:00', 
        startTime: '2026-06-18 00:00:00', 
        endTime: '2026-06-18 00:00:00', 
        IPOTime: '2026-06-18 00:00:00', 
        status: params.status
    }
    const status = get(data, 'status')
    const isWinner = status === 'winner'
    const isPaymentField = ['winner', 'paid'].includes(status)
    const statusColorMap = {
        submitted: theme.primary,
        winner: theme.success,
        canceled: theme.secondaryText,
        No: theme.error,
        paid: theme.warning
    }
    const fields = useMemo(() => {
        const fields = ['newStockPrice', 'count', 'subscribeTime', 'startTime','endTime', 'IPOTime']
        if(isPaymentField) {
            fields.push(...['selectedPrice', 'selectedCount', 'payAmount', 'paidAmount', 'payingAmount'])
        }
        return fields
    }, [])
    return <SafeAreaView>
        <ScrollView>
            <View style={[styles.statusBar]}>
                <Text style={[styles.statusBarText, { color: get(statusColorMap, status) }]}>{t(`history.tabs.${status}`)}</Text>
            </View>
            <View style={[styles.fieldItems]}>
                <View style={[styles.fieldItem, styles.borderBottom]}>
                    <Text style={[styles.nameText]}>{data.stockName}</Text>
                    <View style={[styles.labelAndId, commonStyles.rowStart]}>
                        <View style={styles.stockLabel}><Text style={styles.stockLabelText}>US</Text></View>
                        <Text style={styles.stockIdText}>{get(data, 'stockId')}</Text>
                    </View>
                </View>
                {fields.map((field) => <View style={[styles.fieldItem, styles.borderBottom, commonStyles.rowBetween]} key={field}>
                    <Text style={[styles.fieldLabel]}>{t(`historyDetail.${field}`)}</Text>
                    <Text style={[styles.fieldValue]}>{get(data, field) || 0}</Text>
                </View>)}
            </View>
        </ScrollView>
        {isWinner && <View style={commonStyles.mainLayoutPadding}>
            <Button>{t('subscribe.confirm')}</Button>
        </View>}
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        statusBar: {
            paddingHorizontal: ms(15),
            paddingVertical: ms(10),
            backgroundColor: theme.ipoStatusBackground
        },
        statusBarText: {
            fontSize: ms(21),
            lineHeight: ms(27)
        },
        fieldValue: {
            color: theme.primaryText,
            fontSize: ms(15),
            lineHeight: ms(21)
        },
        fieldLabel: {
            color: theme.secondaryText,
            fontSize: ms(15),
            lineHeight: ms(21)
        },
        nameText: {
            fontSize: ms(21),
            lineHeight: ms(29.5),
            color: theme.primaryText
        },
        labelAndId: {
            gap: ms(5),
        },
        stockIdText: {
            color: theme.secondaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5)
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
        fieldItems: {
            paddingHorizontal: ms(15)
        },
        fieldItem: {
            paddingVertical: ms(15)
        },
        borderBottom: {
            borderBottomWidth: ms(1),
            borderBottomColor: theme.backgroundDivide
        },
    })
}