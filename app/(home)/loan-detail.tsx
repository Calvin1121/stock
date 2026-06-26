import { SafeAreaView, ScrollView } from "@/components/ThemeWidget";
import { Button } from "@/components/ui";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { get } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function LoanDetailPage() {
    const { t } = useTranslation('home');
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const data = {
        status: 'inProgress',
        loanNo: '2064528270499540993',
        loanAmount: '1000 NGN',
        loanTerm: '10天',
        loanRate: '100.00%',
        dailyInterestRate: '10.00%',
        loanTime: '2026-06-10 10:01:11'
    }
    const fields = ['status', 'loanNo', 'loanAmount', 'loanTerm', 'loanRate', 'dailyInterestRate', 'loanTime']
    const statusColorMap = {
        reviewing: theme.warning,
        reject: theme.secondaryText,
        inProgress: theme.primary,
        expired: theme.error,
        repaid: theme.primaryText
    }
    return <SafeAreaView>
        <ScrollView style={commonStyles.mainLayoutPadding}>
            <View>
                {fields.map(((key, index) => {
                    const isStatus = key === 'status'
                    const value = get(data, key)
                    return <View style={[commonStyles.rowBetween, styles.fieldItem, index? styles.borderTop: null]} key={key}>
                    <Text style={styles.fieldLabel}>{t(`loanDetail.${key}`)}</Text>
                    {!isStatus && <Text style={[styles.fieldValue]}>{value}</Text>}
                    {isStatus && <Text style={[styles.fieldValue, {color: get(statusColorMap, value)}]}>{t(`loanHistory.tabs.${value}`)}</Text>}
                </View>
                }))}
            </View>
        </ScrollView>
        <View style={[commonStyles.mainLayoutPadding]}>
            <Button>{t('loanDetail.repay')}</Button>
        </View>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        fieldItem: {
            paddingVertical: ms(15)
        },
        fieldLabel: {
            color: theme.secondaryText,
            fontSize: ms(15),
            lineHeight: ms(21),
        },
        fieldValue: {
            color: theme.primaryText,
            fontSize: ms(15),
            lineHeight: ms(21),
        },
        borderTop: {
            borderTopWidth: ms(1),
            borderTopColor: theme.backgroundDivide
        }
    })
}