import IconFont from "@/components/iconfont"
import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget"
import { ActionSheetItem, Button, Input, useActionSheet } from "@/components/ui"
import { ThemeType } from "@/constants/Colors"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { useCallback, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, Text, View } from "react-native"
import QRCode from 'react-native-qrcode-svg'
import { ms, s } from "react-native-size-matters"


export default function ExchangePage() {
    const qrCodeRef = useRef(null)
    const { theme } = useTheme()
    const { t } = useTranslation('assets')
    const [exchangeItem, setExchangeItem] = useState<string[]>([])
    const { show } = useActionSheet()
    const styles = useMemo(() => createStyles(theme), [theme])
    const leftCurrency = useMemo(() => exchangeItem?.[0], [exchangeItem])
    const rightCurrency = useMemo(() => exchangeItem?.[1], [exchangeItem])
    const onSelectCurrency = useCallback((index: number) => {
        const onSelect = (item: string) => {
            const _exchangeItem = [...exchangeItem]
            _exchangeItem[index] = item
            setExchangeItem(_exchangeItem)
        }
        const valueKeys = ['NGN', 'USDT']
        const items = valueKeys.map((value) => ({ value, label: value, onPress: () => onSelect(value) }))
        show({
            items,
            activeItem: { value: exchangeItem?.[index] } as ActionSheetItem
        })
    }, [exchangeItem])
    const handleSaveQRCode = useCallback(async () => {
        console.log(12315)
    }, [])
    return <SafeAreaView>
        <View style={[styles.rate]}>
            <Text style={styles.rateText}>{t('exchange.rate')}  NGN/USD：0.000694</Text>
        </View>
        <ScrollView style={[commonStyles.flex1]}>
            <View style={[styles.mainContent]}>
                <View style={[commonStyles.rowStart, styles.selectCurrency]}>
                    <TouchableOpacity onPress={() => onSelectCurrency(0)} style={[commonStyles.flexRow, commonStyles.alignCenter]}>
                        <Text style={[styles.selectCurrencyText, leftCurrency ? styles.selectedCurrencyText : null]}>{leftCurrency || t('exchange.selectCurrency')}</Text>
                        <IconFont color={theme.primaryText} size={ms(12)} name="a-icon-24-Lightgraydrop-down" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}>
                        <IconFont size={ms(29)} name="exchange" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSelectCurrency(1)} style={[commonStyles.flexRow, commonStyles.alignCenter]}>
                        <Text style={[styles.selectCurrencyText, rightCurrency ? styles.selectedCurrencyText : null]}>{rightCurrency || t('exchange.selectCurrency')}</Text>
                        <IconFont color={theme.primaryText} size={ms(12)} name="a-icon-24-Lightgraydrop-down" />
                    </TouchableOpacity>
                </View>
                <View style={[commonStyles.flexColumn]}>
                    <Text style={[styles.infoItemLabel]}>{t(`exchange.quantity`)}</Text>
                    <Input
                        containerStyle={styles.quantity}
                        variant="outline"
                        placeholder={t('exchange.quantity')} />
                    <Text style={[styles.availableCountText]}>{t('exchange.availableCount', { count: '0.001 NGN' })}</Text>
                </View>
                <View style={[commonStyles.rowStart, styles.buttons]}>
                    <Button textStyle={styles.currencyBtnText} containerStyle={styles.currencyBtn} variant="outline">比特币</Button>
                    <Button textStyle={styles.currencyBtnText} containerStyle={styles.currencyBtn} type="info" variant="outline">比特币</Button>
                </View>
                <View style={[commonStyles.rowCenter]}>
                    <View style={[styles.qrcodeContent, commonStyles.rowCenter]}>
                        <QRCode
                            value="https://expo.dev"
                            size={s(190)}
                            getRef={(ref) => (qrCodeRef.current = ref)}
                        />
                    </View>
                </View>
                <View style={[commonStyles.columnCenter]}>
                    <Text style={styles.addressLabel}>{t('exchange.address')}</Text>
                    <Text style={styles.addressValue}>0x716add4060bf88da35f7475683c68c4c35c6cfc6</Text>
                </View>
                <Text style={styles.tips}>{t('exchange.tips')}</Text>
            </View>
        </ScrollView>
        <View style={[commonStyles.mainLayoutPadding, styles.buttons, commonStyles.rowCenter]}>
            <View style={[commonStyles.flex1]}><Button onPress={handleSaveQRCode} type="secondary">{t('exchange.saveQrcode')}</Button></View>
            <View style={[commonStyles.flex1]}><Button>{t('exchange.copytAddress')}</Button></View>
        </View>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        rate: {
            backgroundColor: theme.ipoStatusBackground,
            paddingHorizontal: ms(15),
            paddingVertical: ms(7)
        },
        rateText: {
            fontSize: ms(13),
            lineHeight: ms(17.5),
            color: theme.secondaryText
        },
        mainContent: {
            padding: ms(15),
            gap: ms(15)
        },
        selectCurrency: {
            gap: ms(30)
        },
        selectCurrencyText: {
            fontSize: ms(28),
            lineHeight: ms(39),
            color: theme.secondaryText
        },
        selectedCurrencyText: {
            color: theme.primaryText
        },
        infoItemLabel: {
            color: theme.secondaryText,
            fontSize: ms(15),
            lineHeight: ms(21)
        },
        quantity: {
            marginTop: ms(15),
            paddingHorizontal: ms(16),
            borderColor: theme.card,
            backgroundColor: theme.card
        },
        availableCountText: {
            color: theme.secondaryText,
            fontSize: ms(10),
            lineHeight: ms(13.5),
            marginTop: ms(5)
        },
        currencyBtn: {
            minWidth: ms(95),
            height: ms(36)
        },
        currencyBtnText: {
            fontSize: ms(12)
        },
        qrcodeContent: {
            width: s(200),
            height: s(200),
            backgroundColor: '#fff',
            marginVertical: ms(5)
        },
        buttons: {
            gap: ms(15)
        },
        addressLabel: {
            fontSize: ms(13),
            lineHeight: ms(17.5),
            color: theme.secondaryText
        },
        addressValue: {
            fontSize: ms(13),
            lineHeight: ms(17.5),
            color: theme.primaryText,
            marginTop: ms(15)
        },
        tips: {
            marginTop: ms(15),
            fontSize: ms(10),
            lineHeight: ms(14),
            color: theme.secondaryText
        }
    })
}

export const ExchangeHeaderRight = () => {
    const { theme } = useTheme()
    return <View style={[commonStyles.alignEnd]}>
        <TouchableOpacity style={{ marginRight: ms(15) }}>
            <IconFont color={theme.primaryText} size={ms(29)} name="a-icon-48-Historicalrecords" />
        </TouchableOpacity>
    </View>
}