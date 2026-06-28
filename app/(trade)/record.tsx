import { SafeAreaView, ScrollView } from "@/components/ThemeWidget"
import { ThemeType } from "@/constants/Colors"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { useLocalSearchParams } from "expo-router"
import { get } from "lodash"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, Text, View } from "react-native"
import { ms } from "react-native-size-matters"

export default function RecordPage() {
    const { type } = useLocalSearchParams()
    const { t } = useTranslation('assets')
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const data = {
        stockName: '+200.00000000 NGN',
        type: t(`records.tabs.${type}`),
        status: '已完成',
        blockTradeId: 'oxaeyhhd388dhweAdhoxaeyhhd388dhweAdh',
        time: '10:20:10 10/15/2020',
        quantity: '500',
        price: '200.000 NGN',
        fee: '1.00000000 NGN',
        withdrawAddress: 'oxaeyhhd388dhweAdhoxaeyhhd388dhweAdh'
    }
    const fields = useMemo(() => {
        if (type === 'trade')
            return ['stockName', 'type', 'time', 'quantity', 'price']
        if (type === 'withdraw')
            return ['type', 'status', 'withdrawAddress', 'fee', 'blockTradeId', 'time']
        if (type === 'recharge')
            return ['type', 'status', 'blockTradeId', 'time']
    }, [type])
    return <SafeAreaView>
        <ScrollView style={[commonStyles.mainLayoutPadding]}>
            <View style={[styles.fieldItem]}><Text style={[styles.tradeAmount]}>+305.00000000 NGN</Text></View>
            {fields?.map(field => <View key={field} style={[styles.fieldItem, commonStyles.rowBetween, styles.borderTop]}>
                <Text style={[styles.fieldLabel]}>{t(`record.${field}`)}</Text>
                <Text style={[styles.fieldValue]}>{get(data, field)}</Text>
            </View>)}
        </ScrollView>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        tradeAmount: {
            fontSize: ms(21),
            color: theme.primaryText
        },
        fieldItem: {
            paddingVertical: ms(15),
            gap: ms(30),
            overflow: 'hidden',
        },
        fieldLabel: {
            fontSize: ms(15),
            lineHeight: ms(21),
            color: theme.secondaryText,
        },
        fieldValue: {
            fontSize: ms(15),
            lineHeight: ms(21),
            color: theme.primaryText,
            flex: 1,
            flexShrink: 1,
            flexWrap: 'wrap',
            textAlign: 'right'
        },
        borderTop: {
            borderTopColor: theme.backgroundDivide,
            borderTopWidth: ms(1)
        }
    })
}