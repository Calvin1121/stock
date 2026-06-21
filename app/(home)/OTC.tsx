import IconFont from "@/components/iconfont"
import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget"
import { Button } from "@/components/ui"
import { Divider } from "@/components/ui/divider"
import { ThemeType } from "@/constants/Colors"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { router } from "expo-router"
import { get } from "lodash"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, Text, View } from "react-native"
import { ms, s, vs } from "react-native-size-matters"

export default function OTCPage() {
    const { theme } = useTheme()
    const { t } = useTranslation('home')
    const styles = useMemo(() => createSyles(theme), [theme])
    const listRenderKey = ['issuePrice', 'minPurchaseQuantity', 'startTime', 'endTime', 'IPOTime']
    const list = [
        { name: 'Japan Physical Gold ETF Japan Physical Gold ETF Japan Physical Gold ETF', id: '1540', issuePrice: '21340 円', minPurchaseQuantity: 500, startTime: '2025/10/01 00:00:00', endTime: '2025/10/01 00:00:00', IPOTime: '2026/11/11 13:00:00' },
        { name: 'Japan Physical Gold ETF Japan Physical Gold ETF Japan Physical Gold ETF', id: '1541', issuePrice: '21340 円', minPurchaseQuantity: 500, startTime: '2025/10/01 00:00:00', endTime: '2025/10/01 00:00:00', IPOTime: '2026/11/11 13:00:00' }

    ]
    return <SafeAreaView>
        <ScrollView style={commonStyles.mainLayoutPadding}>
            <View style={styles.banner}></View>
            <View style={styles.list}>
                {list.map(item => <View key={item.id} style={styles.item}>
                    <View style={[styles.nameSubscription, commonStyles.rowBetween]}>
                        <View style={[commonStyles.flex1]}>
                            <Text style={[styles.stockName]}>{item.name}</Text>
                        </View>
                        <Button onPress={() => router.push({pathname: '/(home)/OTC-detail', params: {id: item.id}})} textStyle={styles.subscribeBtnText} style={[styles.subscribeBtn]}>{t('OTC.subscribe')}</Button>
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

function createSyles(theme: ThemeType) {
    return StyleSheet.create({
        banner: {
            width: '100%',
            height: vs(120),
            borderRadius: ms(10),
            backgroundColor: theme.primary
        },
        list: {

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
        subscribeBtn: {
            minWidth: s(60),
            height: vs(25),
            borderRadius: ms(25)
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
            fontSize: ms(13)
        },
        itemValueField: {
            color: theme.primaryText,
            fontSize: ms(13),
            fontWeight: 500
        }
    })
}

export const OTCHeaderRight = () => {
    const { theme } = useTheme()
    return <View style={[commonStyles.alignEnd]}>
        <TouchableOpacity style={{ marginRight: ms(15) }}>
            <IconFont color={theme.primaryText} size={ms(29)} name="a-icon-48-Historicalrecords" />
        </TouchableOpacity>
    </View>
}