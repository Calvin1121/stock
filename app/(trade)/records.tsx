import IconFont from "@/components/iconfont"
import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget"
import { ActionSheetItem, useActionSheet } from "@/components/ui"
import { ThemeType } from "@/constants/Colors"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { router } from "expo-router"
import { get } from "lodash"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, Text, View } from "react-native"
import { ms, vs } from "react-native-size-matters"

export default function RecordsPage() {
    const i18nKey = 'assets'
    const { theme } = useTheme()
    const { t } = useTranslation(i18nKey)
    const tabs = ['trade', 'recharge', 'withdraw']
    const filterKeys = ['all', 'commissionEntrustingSales', 'IPOTransactionIncome', 'IPOTransactionSubscription', 'commissionSales', 'frozen', 'fee']
    const [tab, setTab] = useState(tabs[0])
    const { show } = useActionSheet();
    const [filter, setFilter] = useState(filterKeys[0])
    const styles = useMemo(() => createStyles(theme), [theme])
    const isFilter = useMemo(() => tab === 'trade', [tab])
    const onTradeFilter = useCallback(() => {
        const items: ActionSheetItem[] = filterKeys.map(item => ({ label: t(`records.filters.${item}`), value: item, onPress: () => setFilter(item) }))
        show({ items, activeItem: { value: filter } as ActionSheetItem })
    }, [show, t, filter, setFilter])
    const rechargeStatusMap = {
        complete: theme.success,
        pending: theme.warning
    }
    const TradeRecord = () => <View style={[styles.listItem]}>
        <Text style={[styles.tradeName]}>手续费-Maruha Nichiro Corporation（NGN）</Text>
        <View style={[commonStyles.rowBetween]}>
            <Text style={[styles.tradeAmount]}>-0.00000000</Text>
            <Text style={[styles.tradeDate]}>17:31:19 06/18/2026</Text>
        </View>
    </View>
    const RechargeRecord = () => <View style={[styles.listItem]}>
        <View style={[commonStyles.rowBetween]}>
            <Text style={[styles.tradeName]}>充值（NGN）</Text>
            <Text style={[styles.rechargeStatus, {color: get(rechargeStatusMap, 'pending')}]}>充值中</Text>
        </View>
        <View style={[commonStyles.rowBetween]}>
            <Text style={[styles.tradeAmount]}>-0.00000000</Text>
            <Text style={[styles.tradeDate]}>10:20 10/15</Text>
        </View>
    </View>
    const WithdrawRecord = () => <View style={[styles.listItem]}>
        <View style={[commonStyles.rowBetween]}>
            <Text style={[styles.tradeName]}>提现（NGN）</Text>
            <Text style={[styles.rechargeStatus, {color: get(rechargeStatusMap, 'pending')}]}>提现中</Text>
        </View>
        <View style={[commonStyles.rowBetween]}>
            <Text style={[styles.tradeAmount]}>-0.00000000</Text>
            <Text style={[styles.tradeDate]}>10:20 10/15</Text>
        </View>
    </View>
    const onRenderRecord = useCallback((item: any) => {
        switch (tab) {
            case 'trade':
                return <TradeRecord />;
            case 'recharge':
                return <RechargeRecord />;
            case 'withdraw':
                return <WithdrawRecord />;
            default:
                break;
        }
    }, [tab])
    return <SafeAreaView>
        <View style={[styles.tabsContainer, commonStyles.rowBetween, commonStyles.alignCenter]}>
            <View style={[commonStyles.flexRow, commonStyles.alignCenter, styles.tabsContent]}>
                {tabs.map((item) => (<TouchableOpacity key={item} onPress={() => setTab(item)}>
                    <Text style={[styles.tabText, tab === item && styles.tabTextActive]}>
                        {t(`records.tabs.${item}`)}
                    </Text>
                </TouchableOpacity>))}
            </View>
            {isFilter && (<TouchableOpacity onPress={onTradeFilter} style={[styles.filter, commonStyles.flexRow, commonStyles.alignCenter]}>
                <Text style={styles.filterText}>{t(`records.filters.${filter}`)}</Text>
                <IconFont name="icon-36-filter" size={ms(18)} color={theme.secondaryText} />
            </TouchableOpacity>)}
        </View>
        <ScrollView style={[commonStyles.flex1]}>
            <View style={styles.listContent}>{new Array(5).fill(0).map((_, index) =>
                <TouchableOpacity onPress={() => router.push({pathname: '/(trade)/record', params: {type: tab}})} key={index}>{onRenderRecord(index)}</TouchableOpacity>
            )}</View>
        </ScrollView>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        tabsContainer: {
            paddingHorizontal: ms(15),
            paddingTop: ms(7.5)
        },
        tabsContent: {
            gap: ms(10),
        },
        tabText: {
            fontSize: ms(18),
            lineHeight: ms(25),
            color: theme.secondaryText
        },
        tabTextActive: {
            color: theme.primary
        },
        filter: {
            borderRadius: vs(20),
            borderWidth: ms(1),
            borderColor: theme.secondaryText,
            paddingHorizontal: ms(8),
            paddingVertical: ms(1.5),
            gap: ms(6),
        },
        filterText: {
            color: theme.secondaryText,
            fontSize: ms(15),
            lineHeight: ms(21),
        },
        listContent: {
            paddingHorizontal: ms(15)
        },
        listItem: {
            paddingVertical: ms(15),
            borderBottomColor: theme.backgroundDivide,
            borderBottomWidth: ms(1),
            gap: ms(15)
        },
        tradeName: {
            fontSize: ms(15),
            lineHeight: ms(21),
            color: theme.primaryText
        },
        tradeAmount: {
            fontSize: ms(18),
            lineHeight: ms(25),
            color: theme.primaryText
        },
        tradeDate: {
            fontSize: ms(15),
            lineHeight: ms(21),
            color: theme.secondaryText
        },
        rechargeStatus: {
            fontSize: ms(15),
            lineHeight: ms(21),
        }
    })
}