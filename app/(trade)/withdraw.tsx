import IconFont from "@/components/iconfont"
import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget"
import { ActionSheetItem, Button, FormControl, Input, useActionSheet } from "@/components/ui"
import { ThemeType } from "@/constants/Colors"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { StyleSheet, Text, View } from "react-native"
import { ms } from "react-native-size-matters"
import z from "zod"

const withdrawSchema = z.object({
    selectCurrency: z.string().min(1, 'withdraw.selectCurrency.label'),
    currencyType: z.string().min(1, 'withdraw.selectCurrency.label'),
    withdrawAddress: z.string().min(1, 'withdraw.withdrawAddress.label'),
    quantity: z.string().min(1, 'withdraw.quantity.label')
})
type WithdrawFormValues = z.infer<typeof withdrawSchema>;

export default function WithdrawPage() {
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const { t } = useTranslation('assets')
    const [selectCurrency, setSelectCurrency] = useState<{ value: string; label: string } | undefined>()
    const { show } = useActionSheet();
    const currencyOptions = ['NGN'].map((value) => ({ value, label: value, onPress: () => setSelectCurrency({ value, label: value }) }))
    const { control, setValue, handleSubmit, formState: { isDirty, isValid } } = useForm<WithdrawFormValues>({
        resolver: zodResolver(withdrawSchema),
        defaultValues: { selectCurrency: '', currencyType: '', withdrawAddress: '', quantity: '' },
        mode: 'onChange',
    })
    const onSetSelectCurrency = useCallback(() => {
        show({
            items: currencyOptions,
            activeItem: selectCurrency as ActionSheetItem
        })
    }, [selectCurrency])
    useEffect(() => {
        if (selectCurrency?.value)
            setValue('selectCurrency', selectCurrency.value, {
                shouldDirty: true,
                shouldValidate: true,
            })
    }, [selectCurrency])
    return <SafeAreaView>
        <ScrollView style={[commonStyles.flex1]}>
            <View style={[styles.form]}>
                <Controller control={control} name="selectCurrency" render={({ field: { value, onChange, onBlur } }) =>
                    <Input onPress={() => onSetSelectCurrency()} suffix={<TouchableOpacity onPress={() => onSetSelectCurrency()} style={[commonStyles.flexRow]}>
                        <Text style={[styles.selectCurrencyText]}>{t('withdraw.selectCurrency.label')}</Text>
                        <IconFont color={styles.selectCurrencyText.color} name='icon-32-arrow-left' size={ms(18)} />
                    </TouchableOpacity>} readOnly placeholder="" value={value} variant="outline" onBlur={onBlur} onChangeText={onChange} containerStyle={styles.inputStyle} />}></Controller>
                <View style={[commonStyles.rowStart, styles.buttons]}>
                    <Button textStyle={styles.currencyBtnText} containerStyle={styles.currencyBtn} variant="outline">比特币</Button>
                    <Button textStyle={styles.currencyBtnText} containerStyle={styles.currencyBtn} type="info" variant="outline">以太坊</Button>
                </View>
                <Controller control={control} name="withdrawAddress" render={({ field: { value, onChange, onBlur } }) =>
                    <FormControl label={t(`withdraw.withdrawAddress.label`)} labelStyle={styles.formLabel} hideRequiredMark required>
                        <Input
                            placeholder={t(`withdraw.withdrawAddress.placeholder`)}
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur} />
                    </FormControl>}>
                </Controller>
                <Controller control={control} name="quantity" render={({ field: { value, onChange, onBlur } }) =>
                    <FormControl label={t(`withdraw.quantity.label`)} labelStyle={styles.formLabel} hideRequiredMark required>
                        <Input
                            placeholder={t(`withdraw.quantity.placeholder`)}
                            onChangeText={onChange}
                            value={value}
                            suffix={<View style={[commonStyles.flexRow]}>
                                {selectCurrency?.label && <View style={[styles.quantityAll]}><Text style={[styles.quantityText]}>{selectCurrency.label}</Text></View>}
                                <TouchableOpacity><Text style={[styles.quantityText, styles.quantityAllText]}>{t('withdraw.quantity.all')}</Text></TouchableOpacity>
                            </View>}
                            onBlur={onBlur} />
                    </FormControl>}>
                </Controller>
                <Text style={[styles.availableAmountText]}>{t('withdraw.availableAmount', { anount: '233,232.09', currency: 'NGN' })}</Text>
            </View>
            <View style={[styles.tips]}>
                <Text style={[styles.tipsText]}>{t('withdraw.tips')}</Text>
            </View>
        </ScrollView>
        <View style={[commonStyles.mainLayoutPadding]}>
            <View style={[commonStyles.rowBetween, styles.incomeAmount]}>
                <Text style={[styles.incomeAmountLabelText]}>{t('withdraw.incomeAmount')}</Text>
                <Text style={[styles.incomeAmountValueText]}>0.00000000  ETH</Text>
            </View>
            <Button>{t('withdraw.withdrawBtn')}</Button>
        </View>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        form: {
            paddingTop: ms(15),
            paddingHorizontal: ms(15)
        },
        inputStyle: {
            paddingHorizontal: ms(16),
            borderColor: theme.card,
            backgroundColor: theme.card
        },
        selectCurrencyText: {
            fontSize: ms(13),
            lineHeight: ms(17.5),
            color: theme.info
        },
        currencyBtn: {
            minWidth: ms(95),
            height: ms(36)
        },
        currencyBtnText: {
            fontSize: ms(12)
        },
        buttons: {
            marginTop: ms(15),
            gap: ms(15),
        },
        formLabel: {
            color: theme.secondaryText,
            fontSize: ms(13),
            marginTop: ms(30)
        },
        quantityText: {
            fontSize: ms(12),
            lineHeight: ms(17),
            color: theme.secondaryText
        },
        quantityAll: {
            paddingRight: ms(15),
            marginRight: ms(15),
            borderRightWidth: ms(1),
            borderRightColor: theme.cardDivide
        },
        quantityAllText: {
            color: theme.primary,
        },
        availableAmountText: {
            fontSize: ms(10),
            lineHeight: ms(13.5),
            color: theme.secondaryText,
        },
        tips: {
            backgroundColor: theme.card,
            paddingTop: ms(10),
            paddingHorizontal: ms(15),
            paddingBottom: ms(25),
            marginTop: ms(30)
        },
        tipsText: {
            fontSize: ms(10),
            lineHeight: ms(14),
            color: theme.secondaryText
        },
        incomeAmount: {
            paddingBottom: ms(6)
        },
        incomeAmountLabelText: {
            fontSize: ms(13),
            lineHeight: ms(17.5),
            color: theme.secondaryText
        },
        incomeAmountValueText: {
            fontSize: ms(13),
            lineHeight: ms(17.5),
            color: theme.primaryText
        }
    })
}

export const WithdrawHeaderRight = () => {
    const { theme } = useTheme()
    return <View style={[commonStyles.alignEnd]}>
        <TouchableOpacity onPress={() => router.push('/(trade)/withdraw-records')} style={{ marginRight: ms(15) }}>
            <IconFont color={theme.primaryText} size={ms(29)} name="a-icon-48-Historicalrecords" />
        </TouchableOpacity>
    </View>
}