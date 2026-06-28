import { SafeAreaView, ScrollView } from "@/components/ThemeWidget";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { get } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function WithdrawRecordPage() {
    const { t } = useTranslation('assets')
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const data = {
        type: '提币',
        status: '失败',
        time: '10:20:10 10/15/2020',
        withdrawAddress: 'oxaeyhhd388dhweAdhoxaeyhhd388dhweAdh',
        blockchainTradeId: 'oxaeyhhd388dhweAdhoxaeyhhd388dhweAdh',
        errorReason: '提币地址不对'
    }
    const statusMap = {
        success: theme.success,
        confirming: theme.primary,
        reviewing: theme.warning,
        error: theme.error
    }

    const fields = ['type', 'status', 'withdrawAddress', 'blockchainTradeId', 'time', 'errorReason']
    return <SafeAreaView>
        <ScrollView style={[commonStyles.mainLayoutPadding]}>
            <View style={[styles.fieldItem]}><Text style={[styles.tradeAmount]}>+305.00000000 NGN</Text></View>
            {fields?.map(field => <View key={field} style={[styles.fieldItem, commonStyles.rowBetween, styles.borderTop]}>
                <Text style={[styles.fieldLabel]}>{t(`withdraw.record.${field}`)}</Text>
                <Text style={[styles.fieldValue, field === 'status' ? { color: get(statusMap, 'error') } : null]}>{get(data, field)}</Text>
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