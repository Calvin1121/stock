import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget";
import { ScrollTabs } from "@/components/ui/scroll-tabs";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { router } from "expo-router";
import { get } from "lodash";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";


export default function LoanHistoryPage() {
    const { t } = useTranslation('home');
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const tabs = useMemo(() => [
        { label: t('loan.history.tabs.reviewing'), value: 'reviewing' },
        { label: t('loan.history.tabs.reject'), value: 'reject' },
        { label: t('loan.history.tabs.inProgress'), value: 'inProgress' },
        { label: t('loan.history.tabs.expired'), value: 'expired' },
        { label: t('loan.history.tabs.repaid'), value: 'repaid' }
    ], [t])
    const [tab, setTab] = useState(tabs[0].value)
    const onSetTab = (tab: string) => {
        setTab(tab)
    }
    const statusColorMap = {
        reviewing: theme.warning,
        reject: theme.secondaryText,
        inProgress: theme.primary,
        expired: theme.error,
        repaid: theme.primaryText
    }
    const loanFields = ['loanTerm', 'createTime', 'loanTime']
    const mockData = [
        { loanAmount: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { loanAmount: '1000 NGN', status: 'reject', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { loanAmount: '1000 NGN', status: 'inProgress', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { loanAmount: '1000 NGN', status: 'expired', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { loanAmount: '1000 NGN', status: 'repaid', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { loanAmount: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { loanAmount: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { loanAmount: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { loanAmount: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { loanAmount: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
    ]
    return <SafeAreaView>
        <ScrollTabs tabs={tabs} tab={tab} onTab={item => setTab(item.value)} />
        <ScrollView style={[commonStyles.flex1]}>
            <View style={[styles.loanList]}>
                {mockData.map((item, index) => <TouchableOpacity onPress={() => router.push({ pathname: '/(home)/loan-detail', params: { id: '1' } })} style={[styles.loanItem]} key={index}>
                    <View style={[styles.loanAmountAndStatus, commonStyles.rowBetween]}>
                        <Text style={[styles.loanAmountStatusText]}>{item.loanAmount}</Text>
                        <Text style={[styles.loanAmountStatusText, { color: get(statusColorMap, item.status) }]}>{t(`loan.history.tabs.${item.status}`)}</Text>
                    </View>
                    {loanFields.map((key) => <View style={[styles.fieldItem, commonStyles.rowBetween]} key={`${index}_${key}`}>
                        <Text style={styles.fieldLabel}>{t(`loan.history.${key}`)}</Text>
                        <Text style={styles.fieldValue}>{get(item, key) || '--'}</Text>
                    </View>)}
                </TouchableOpacity>)}
            </View>
        </ScrollView>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        loanList: {
            paddingHorizontal: ms(15),
            paddingVertical: ms(7.5),
            gap: ms(15)
        },
        loanItem: {
            backgroundColor: theme.card,
            borderRadius: ms(10),
            paddingVertical: ms(20),
            paddingHorizontal: ms(15),
            gap: ms(10)
        },
        loanAmountAndStatus: {
            gap: ms(15),
            paddingBlock: ms(5)
        },
        loanAmountStatusText: {
            fontSize: ms(15),
            lineHeight: ms(21),
            color: theme.primaryText
        },
        fieldItem: {
            gap: ms(15)
        },
        fieldLabel: {
            color: theme.secondaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5),
        },
        fieldValue: {
            color: theme.primaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5),
        }
    })
}
