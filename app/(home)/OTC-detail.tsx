import { SafeAreaView, ScrollView } from "@/components/ThemeWidget";
import { Button, Input, Modal } from "@/components/ui";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { useLocalSearchParams } from "expo-router";
import { get } from "lodash";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function OTCDetailPage() {
    const data = { name: 'Japan Physical Gold ETF', id: '1540', issuePrice: '21340 円', minPurchaseQuantity: 500, startTime: '2025/10/01 00:00:00', endTime: '2025/10/01 00:00:00', IPOTime: '2026/11/11 13:00:00' }
    const { theme } = useTheme()
    const { t } = useTranslation('home')
    const OTCRenderKey = ['startTime', 'endTime', 'issuePrice', 'purchaseQuantity', 'amount', 'frozenAmount']
    const styles = useMemo(() => createStyles(theme), [theme])
    const { id } = useLocalSearchParams();
    const [isModalVisible, setIsModalVisible] = useState(false)
    const onClose = () => {
        setIsModalVisible(false)
    }
    const onConfirm = () => {
        setIsModalVisible(false)
    }
    return <>
        <SafeAreaView>
            <ScrollView style={{ ...styles.mainContent }}>
                <View style={[commonStyles.flex1, styles.itemPadding]}>
                    <View><Text style={[styles.stockName]}>{data.name}</Text></View>
                    <View><Text style={[styles.itemId]}>{data.id}</Text></View>
                </View>
                {OTCRenderKey.map(key => {
                    const isAmount = ['amount', 'frozenAmount'].includes(key)
                    const value = get(data, key) || (isAmount ? 0 : '')
                    if (key === 'purchaseQuantity')
                        return <View style={[commonStyles.columnStart, styles.itemField, styles.itemPadding, styles.borderTop]} key={`${data.id}_${key}`}>
                            <Text style={[styles.itemLabelField]}>{t(`OTC.${key}`)}</Text>
                            <Input containerStyle={styles.purchaseQuantityInput} variant="outline" placeholder={t('OTC.purchaseQuantity')} />
                        </View>
                    return <View style={[commonStyles.rowBetween, styles.itemField, styles.itemPadding, styles.borderTop]} key={`${data.id}_${key}`}>
                        <Text style={[styles.itemLabelField]}>{t(`OTC.${key}`)}</Text>
                        <Text style={[styles.itemValueField]}>{value}</Text>
                    </View>
                })}
            </ScrollView>
            <View style={[commonStyles.mainLayoutPadding]}>
                <Button onPress={() => setIsModalVisible(true)}>{t('OTC.detail.confirm')}</Button></View>
        </SafeAreaView>
        <Modal title={t('OTC.detail.confirmTitle')} children={t('OTC.detail.confirmContent')} visible={isModalVisible} onConfirm={onConfirm} onClose={onClose} />
    </>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        mainContent: {
            ...commonStyles.flex1,
            paddingHorizontal: ms(15),
        },
        itemPadding: {
            paddingVertical: ms(15),
        },
        borderTop: {
            borderTopWidth: ms(1),
            borderTopColor: theme.backgroundDivide
        },
        stockName: {
            color: theme.primaryText,
            fontSize: ms(21),
            lineHeight: ms(29.5),
            fontWeight: 500
        },
        itemId: {
            color: theme.secondaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5),
            marginTop: ms(4)
        },
        itemField: {
            gap: ms(10)
        },
        itemLabelField: {
            color: theme.secondaryText,
            fontSize: ms(15)
        },
        itemValueField: {
            color: theme.primaryText,
            fontSize: ms(15),
            fontWeight: 500
        },
        purchaseQuantityInput: {
            paddingHorizontal: ms(16),
            borderColor: theme.card,
            backgroundColor: theme.card
        }
    })
}