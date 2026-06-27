import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget";
import { Divider } from "@/components/ui";
import { ScrollTabs } from "@/components/ui/scroll-tabs";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { dateFormat, timeFormat } from "@/utils/consts";
import dayjs from 'dayjs';
import { router } from "expo-router";
import { get } from "lodash";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function IPOHistoryPage() {
    const i18nKey = 'ipo'
    const { t, i18n } = useTranslation(i18nKey)
    const i18nData = i18n.getResourceBundle(i18n.language, i18nKey)
    const tabs = useMemo(() => {
        const historyTabs = get(i18nData, 'history.tabs')
        return Object.keys(historyTabs).map(value => ({ value, label: get(historyTabs, value) }))
    }, [i18nData])
    const [tab, setTab] = useState<string>(tabs[0].value)
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const statusColorMap = {
        submitted: theme.primary,
        winner: theme.success,
        canceled: theme.secondaryText,
        No: theme.error,
        paid: theme.warning
    }
    const list = [
        { stockName: 'TES2', stockLabel: 'US', stockId: 'AAPL34', publishPrice: '1 USD', deadline: '2026-06-18 00:00:00', status: 'submitted' },
        { stockName: 'TES2', stockLabel: 'US', stockId: 'AAPL34', publishPrice: '1 USD', deadline: '2026-06-18 00:00:00', status: 'winner' },
        { stockName: 'TES2', stockLabel: 'US', stockId: 'AAPL34', publishPrice: '1 USD', deadline: '2026-06-18 00:00:00', status: 'No' },
        { stockName: 'TES2', stockLabel: 'US', stockId: 'AAPL34', publishPrice: '1 USD', deadline: '2026-06-18 00:00:00', status: 'canceled' },
        { stockName: 'TES2', stockLabel: 'US', stockId: 'AAPL34', publishPrice: '1 USD', deadline: '2026-06-18 00:00:00', status: 'paid' },
        { stockName: 'TES2', stockLabel: 'US', stockId: 'AAPL34', publishPrice: '1 USD', deadline: '2026-06-18 00:00:00', status: 'submitted' },
    ]
    return <SafeAreaView>
        <ScrollTabs tabs={tabs} tab={tab} onTab={item => setTab(item.value)} />
        <ScrollView style={[commonStyles.flex1, styles.container]}>
            <View>
                {list.map((item, index) => {
                    const status = get(item, 'status')
                    const statusColor = get(statusColorMap, status)
                    const deadline = get(item, 'deadline')
                    const date = deadline ? dayjs(deadline).format(get(dateFormat, i18n.language)) : ''
                    const time = deadline ? dayjs(deadline).format(get(timeFormat, i18n.language)) : ''
                    return <TouchableOpacity onPress={() => router.push({pathname:'/(ipo)/history-detail', params: {status}})} style={[styles.listItem, commonStyles.rowCenter, styles.borderBottom]} key={index}>
                        <View style={[{width: '24%'}, commonStyles.justifyEnd, styles.fieldItem]}>
                            <Text style={[styles.fieldText]}>{item.stockName}</Text>
                            <View style={[styles.labelAndId, commonStyles.rowStart]}>
                                <View style={styles.stockLabel}><Text style={styles.stockLabelText}>US</Text></View>
                                <Text style={styles.fieldValue}>{get(item, 'stockId')}</Text>
                            </View>
                        </View>
                        <View style={[{width: '20%'}, commonStyles.alignEnd, styles.fieldItem]}>
                            <Text style={[styles.fieldText]}>{item.publishPrice}</Text>
                            <Text style={styles.fieldValue}>{50}</Text>
                        </View>
                        <View style={[{width: '31%'}, commonStyles.alignEnd, styles.fieldItem]}>
                            <Text style={[styles.fieldText]}>{date}</Text>
                            <Text style={styles.fieldValue}>{time}</Text>
                        </View>
                        <View style={[{width: '25%'}, commonStyles.alignEnd]}>
                            <Text style={[styles.statusText, { color: statusColor }]}>{status && t(`history.tabs.${status}`)}</Text>
                        </View>
                    </TouchableOpacity>
                })}
            </View>
            <Divider />
        </ScrollView>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        container: {
            borderTopLeftRadius: ms(25),
            borderTopRightRadius: ms(25),
            backgroundColor: theme.card,
            paddingHorizontal: ms(15)
        },
        listItem: {
            paddingVertical: ms(15)
        },
        statusText: {
            fontSize: ms(15),
            lineHeight: ms(21)
        },
        fieldText: {
            color: theme.primaryText,
            fontSize: ms(15),
            lineHeight: ms(21)
        },
        fieldValue: {
            color: theme.secondaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5)
        },
        labelAndId: {
            gap: ms(5),
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
        fieldItem: {
            gap: ms(10)
        },
        borderBottom: {
            borderBottomWidth: ms(1),
            borderBottomColor: theme.cardDivide
        }
    })
}