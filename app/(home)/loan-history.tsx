import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { get } from "lodash";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

const tabs = [
    { label: 'loanHistory.tabs.reviewing', value: 'reviewing' },
    { label: 'loanHistory.tabs.reject', value: 'reject' },
    { label: 'loanHistory.tabs.pending', value: 'pending' },
    { label: 'loanHistory.tabs.expired', value: 'expired' },
    { label: 'loanHistory.tabs.repaid', value: 'repaid' }
]
export default function LoanHistoryPage() {
    const { t } = useTranslation('home');
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const [tab, setTab] = useState(tabs[0].value)
    const onSetTab = (tab: string) => {
        setTab(tab)
    }
    const statusColorMap = {
        reviewing: theme.warning,
        reject: theme.secondaryText,
        pending: theme.primary,
        expired: theme.error,
        repaid: theme.primaryText
    }
    const loanFields = ['loanTerm', 'createTime', 'loanTime']
    const mockData = [
        { name: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { name: '1000 NGN', status: 'reject', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { name: '1000 NGN', status: 'pending', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { name: '1000 NGN', status: 'expired', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { name: '1000 NGN', status: 'repaid', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { name: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { name: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { name: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { name: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
        { name: '1000 NGN', status: 'reviewing', loanTerm: '10天', createTime: '2026-04-28 00:45:57', loanTime: '2026-04-28 00:45:57' },
    ]
    return <SafeAreaView>
        <View style={styles.tabs}>
            <ScrollView style={styles.tabsScrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.tabsWrapper}>
                    {tabs.map((item, index) => <View style={[index ? styles.tab : null]} key={item.value}>
                        <TouchableOpacity onPress={() => onSetTab(item.value)}>
                            <Text style={[styles.tabText, item.value === tab ? styles.tabActiveText : null]}>{t(item.label)}</Text>
                        </TouchableOpacity>
                    </View>)}
                </View>
            </ScrollView>
        </View>
        <ScrollView style={[commonStyles.flex1]}>
            <View style={[styles.loanList]}>
                {mockData.map((item, index) => <View style={[styles.loanItem]} key={index}>
                    <View style={[styles.nameAndStatus, commonStyles.rowBetween]}>
                        <Text style={[styles.nameStatusText]}>{item.name}</Text>
                        <Text style={[styles.nameStatusText, { color: get(statusColorMap, item.status) }]}>{t(`loanHistory.tabs.${item.status}`)}</Text>
                    </View>
                    {loanFields.map((key) => <View style={[styles.fieldItem, commonStyles.rowBetween]} key={`${index}_${key}`}>
                        <Text style={styles.fieldLabel}>{t(`loanHistory.${key}`)}</Text>
                        <Text style={styles.fieldValue}>{get(item, key) || '--'}</Text>
                    </View>)}
                </View>)}
            </View>
        </ScrollView>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        tabs: {
            height: ms(45),
            paddingVertical: ms(7.5),
            overflow: 'hidden'
        },
        tab: {
            marginLeft: ms(30)
        },
        tabsScrollView: {
            ...commonStyles.flexRow,
            height: '100%',
        },
        tabsWrapper: {
            paddingHorizontal: ms(15),
            ...commonStyles.flexRow
        },
        tabText: {
            color: theme.secondaryText,
            fontSize: ms(18),
            lineHeight: ms(25)
        },
        tabActiveText: {
            color: theme.primary
        },
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
        nameAndStatus: {
            gap: ms(15),
            paddingBlock: ms(5)
        },
        nameStatusText: {
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
