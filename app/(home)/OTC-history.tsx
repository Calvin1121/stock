import { SafeAreaView, ScrollView } from "@/components/ThemeWidget";
import { Divider } from "@/components/ui";
import { ScrollTabs } from "@/components/ui/scroll-tabs";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { get } from "lodash";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function OTCHistoryPage() {
    const { t } = useTranslation()
    const { theme } = useTheme()
    const styles = useMemo(() => creareStyles(theme), [theme])
    const tabs = useMemo(() => [
        { label: t('OTC.history.tabs.subscribed'), value: 'subscribed' },
        { label: t('OTC.history.tabs.inProgress'), value: 'inProgress' },
        { label: t('OTC.history.tabs.IPOSuccessful'), value: 'IPOSuccessful' }
    ], [t])

    const [tab, setTab] = useState(tabs[0].value)
    const listRenderKey = ['issuePrice', 'minPurchaseQuantity', 'startTime', 'endTime', 'IPOTime']
    const onSetTab = (tab: string) => {
        setTab(tab)
    }
    const list = [
        { name: 'Japan Physical Gold ETF Japan Physical Gold ETF Japan Physical Gold ETF', id: '1540', issuePrice: '21340 円', minPurchaseQuantity: 500, startTime: '2025/10/01 00:00:00', endTime: '2025/10/01 00:00:00', IPOTime: '2026/11/11 13:00:00' },
        { name: 'Japan Physical Gold ETF Japan Physical Gold ETF Japan Physical Gold ETF', id: '1541', issuePrice: '21340 円', minPurchaseQuantity: 500, startTime: '2025/10/01 00:00:00', endTime: '2025/10/01 00:00:00', IPOTime: '2026/11/11 13:00:00' }
    ]

    return <SafeAreaView>
        <ScrollTabs tabs={tabs} tab={tab} onTab={item => setTab(item.value)} />
        <ScrollView style={[commonStyles.flex1]}>
            <View style={styles.list}>
                {list.map(item => <View key={item.id} style={styles.item}>
                    <View style={[styles.nameSubscription, commonStyles.rowBetween]}>
                        <Text style={[styles.stockName]}>{item.name}</Text>
                    </View>
                    <View><Text style={[styles.itemId]}>{item.id}</Text></View>
                    {listRenderKey.map(key => <View style={[commonStyles.rowBetween, styles.itemField]} key={`${item.id}_${key}`}>
                        <Text style={[styles.itemLabelField]}>{t(`OTC.${key}`)}</Text>
                        <Text style={[styles.itemValueField]}>{get(item, key) || ''}</Text>
                    </View>)}
                </View>)}
            </View>
            <Divider />
        </ScrollView>
    </SafeAreaView>
}

function creareStyles(theme: ThemeType) {
    return StyleSheet.create({
        list: {
            paddingHorizontal: ms(15)
        },
        item: {
            backgroundColor: theme.card,
            borderRadius: ms(10),
            paddingVertical: ms(20),
            paddingHorizontal: ms(15),
            marginTop: ms(15)
        },
        nameSubscription: {
            marginBottom: ms(15)
        },
        stockName: {
            color: theme.primaryText,
            fontSize: ms(15),
            lineHeight: ms(21),
            fontWeight: 500
        },
        subscribeBtnText: {
            fontSize: ms(13)
        },
        itemId: {
            color: theme.secondaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5)
        },
        itemField: {
            gap: ms(10),
            marginTop: ms(15)
        },
        itemLabelField: {
            color: theme.secondaryText,
            fontSize: ms(13),
            lineHeight: ms(17)
        },
        itemValueField: {
            color: theme.primaryText,
            fontSize: ms(13),
            lineHeight: ms(17),
            fontWeight: 500
        }
    })
}