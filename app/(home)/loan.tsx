import IconFont from "@/components/iconfont";
import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget";
import { ActionSheetItem, Button, FormControl, Input, Popup, useActionSheet } from "@/components/ui";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { SignatureInk, type SignatureInkHandle } from 'react-native-signature-ink';
import { ms } from "react-native-size-matters";
import z from "zod";


const loanSchema = z.object({
    loanTerm: z.string().min(1, 'loan.loanForm.loanTerm.require'),
    loanAmount: z.string().min(1, 'loan.loanForm.loanAmount.require')
})
type LoanFormValues = z.infer<typeof loanSchema>;
export default function LoanPage() {
    const { t } = useTranslation('home');
    const [isSignature, setIsSignature] = useState(false)
    const ref = useRef<SignatureInkHandle>(null);
    const { theme } = useTheme()
    const { show } = useActionSheet();
    const [loanTerm, setLoanTerm] = useState<{ value: string } | null>(null)
    const styles = useMemo(() => createStyles(theme), [theme])
    const formKeys = Object.keys(loanSchema.shape) as (keyof LoanFormValues)[];
    const { control, setValue, handleSubmit, formState: { isDirty, isValid } } = useForm<LoanFormValues>({
        resolver: zodResolver(loanSchema),
        defaultValues: formKeys.reduce((acc, key) => ({ ...acc, [key]: '' }), {}) as LoanFormValues,
        mode: 'onChange',
    })
    const termoptions = ['10', '2', '3', '4', '21'].map(term => ({
        label: t('loan.loanForm.loanTerm.termOption', { term }),
        value: term,
        onPress: () => setLoanTerm({ value: term })
    }))
    const rateKeys = ['loanRate', 'totalLoanAmount', 'dailyInterestRate']
    const onSelectTerm = useCallback(() => {
        show({
            dragHandler: false,
            items: termoptions,
            activeItem: loanTerm as ActionSheetItem
        })
    }, [loanTerm])
    const onSubmit = (data: LoanFormValues) => {
        console.log('submit', data);
    }
    useEffect(() => {
        setValue('loanTerm', loanTerm?.value || '', {
            shouldDirty: true,
            shouldValidate: true,
        })
    }, [loanTerm])
    const popupFooter = <View style={[commonStyles.rowCenter, styles.popupBtns]}>
        <View style={commonStyles.flex1}>
            <Button>{t('loan.signature.openmore')}</Button>
        </View>
        <View style={commonStyles.flex1}>
            <Button>{t('loan.signature.confirm')}</Button>
        </View>
    </View>
    return <>
        <SafeAreaView>
            <ScrollView style={commonStyles.mainLayoutPadding}>
                <View style={styles.form}>
                    {formKeys.map((key) => {
                        return <Controller key={key} control={control} name={key} render={({ field: { value, onChange, onBlur } }) => {
                            const isTerm = key === 'loanTerm'
                            const _value = isTerm && value ? t('loan.loanForm.loanTerm.termOption', { term: value }) : value
                            const suffix = isTerm ? <IconFont onPress={onSelectTerm} {...styles.iconStyle} size={ms(18)} name="icon-32-arrow-left" /> :
                                <Text style={styles.currencyStyle}>{t(`loan.currency`)}</Text>
                            return <FormControl style={styles.formLabel} labelStyle={styles.formLabel} label={t(`loan.loanForm.${key}.label`)} hideRequiredMark required>
                                <Input readOnly={isTerm}
                                    onPress={isTerm ? onSelectTerm : undefined}
                                    editable={true}
                                    placeholder={t(`loan.loanForm.${key}.placeholder`)}
                                    onChangeText={onChange}
                                    value={_value}
                                    containerStyle={styles.inputStyle}
                                    variant="outline"
                                    onBlur={onBlur}
                                    suffix={suffix} />
                            </FormControl>
                        }} />
                    })}
                </View>
                <View><Text style={[styles.loanAmountAvailableText]}>{t('loan.loanForm.loanAmountAvailable.label', { amount: '--', currency: t(`loan.currency`) })}</Text></View>
                <View style={[styles.rateItems]}>
                    {rateKeys.map((key, index) => <View style={[commonStyles.rowBetween, styles.rateItem, index < rateKeys.length - 1 ? styles.borderBottom : null]} key={key}>
                        <Text style={[styles.rateLabel]}>{t(`loan.loanForm.${key}.label`)}</Text>
                        <Text style={[styles.rateValue]}>{'0.00'}</Text>
                    </View>)}
                </View>
            </ScrollView>
            <View style={[commonStyles.mainLayoutPadding]}>
                <Button
                    disabled={(!isDirty || !isValid) && false}
                    onPress={() => setIsSignature(true)}
                // onPress={handleSubmit(onSubmit)}
                >{t('loan.loanForm.confirm')}</Button>
            </View>
        </SafeAreaView>
        <Popup
            enableGestureClose={false}
            onClose={() => setIsSignature(false)}
            visible={isSignature}
            close={() => <TouchableOpacity onPress={() => setIsSignature(false)}><Text style={styles.signatureCancelText}>{t('loan.signature.cancel')}</Text></TouchableOpacity>}
            footer={popupFooter}
            title={t('loan.signature.title')}>
            <View style={styles.popupBody}>
                <View style={styles.tncs}>
                    <Text style={styles.tncText}>{t('loan.signature.tnc1')}</Text>
                    <Text style={styles.tncText}>{t('loan.signature.tnc2')}</Text>
                </View>
                <SignatureInk
                    ref={ref}
                    style={styles.signature} />
            </View>
        </Popup>
    </>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        form: {},
        formLabel: {
            color: theme.secondaryText,
            fontSize: ms(15),
            marginBottom: ms(15)
        },
        inputStyle: {
            paddingHorizontal: ms(16),
            borderColor: theme.card,
            backgroundColor: theme.card

        },
        iconStyle: {
            color: theme.secondaryText
        },
        currencyStyle: {
            color: theme.primaryText
        },
        loanAmountAvailableText: {
            fontSize: ms(15),
            lineHeight: ms(21),
            color: theme.primaryText
        },
        borderBottom: {
            borderBottomWidth: ms(1),
            borderBottomColor: theme.backgroundDivide
        },
        rateItems: {
            marginTop: ms(15)
        },
        rateItem: {
            paddingVertical: ms(15)
        },
        rateLabel: {
            fontSize: ms(15),
            lineHeight: ms(21),
            color: theme.secondaryText
        },
        rateValue: {
            fontSize: ms(15),
            lineHeight: ms(21),
            color: theme.primaryText
        },
        signatureCancelText: {
            fontSize: ms(13),
            color: theme.secondaryText
        },
        popupBody: {

        },
        tncs: {
            gap: ms(15)
        },
        tncText: {
            fontSize: ms(14),
            lineHeight: ms(19.5),
            color: theme.secondaryText
        },
        signature: {
            height: ms(165),
            backgroundColor: theme.signatureBackground,
            borderRadius: ms(10),
            marginTop: ms(10)
        },
        popupBtns: {
            gap: ms(15)
        }
    })
}

export const LoanHeaderRight = () => {
    const { t } = useTranslation('home')
    const { theme } = useTheme()
    const styles = useMemo(() => createHeaderStyles(theme), [theme])
    return <View style={[commonStyles.alignEnd]}>
        <TouchableOpacity onPress={() => router.push('/(home)/loan-history')} style={styles.rightTextContent}>
            <Text style={styles.historyText}>{t('loan.historyText')}</Text>
        </TouchableOpacity>
    </View>
}
function createHeaderStyles(theme: ThemeType) {
    return StyleSheet.create({
        rightTextContent: {
            marginRight: ms(15)
        },
        historyText: {
            color: theme.secondaryText,
            fontSize: ms(13),
        }
    })
}