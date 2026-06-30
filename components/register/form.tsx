import { ThemeType } from "@/constants/Colors";
import { useLanguageStore } from "@/lib/languageStore";
import { useRegisterStore } from "@/lib/registerStore";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { countryCodes } from "@/utils/country-codes";
import { useRouter } from "expo-router";
import { find, get } from 'lodash';
import React, { useCallback, useMemo } from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms, s, vs } from "react-native-size-matters";
import IconFont from "../iconfont";
import { TouchableOpacity, VerifyCode } from "../ThemeWidget";
import { FormControl, Input } from "../ui";

interface RegisterFormBaseProps {
    formKeys: string[]
    errors: FieldErrors<any>
    control: any
    onPrefixSuffixTap?: (key: string) => void
}

export const RegisterFormBase: React.FC<RegisterFormBaseProps> = ({ formKeys, errors, control, onPrefixSuffixTap }) => {
    const { t } = useTranslation('auth');
    const router = useRouter()
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme])
    const lang = useLanguageStore(s => s.language)
    const countryCodeList = countryCodes.map(code => code.items)?.flat()
    const countryCode = useRegisterStore(s => s.countryCode)

    const onSuffixNode = useCallback((key: string) => {
        if('verifyCode' === key) {
            return <VerifyCode
                onTap={() => onPrefixSuffixTap?.(key)}
                title={t(`register.${key}.getVerifyCode`)} />
        }
    }, [t, onPrefixSuffixTap])
    const onPrefixNode = useCallback((key: string) => {
        if(key === 'phoneType') {
            const countryName = get(find(countryCodeList, {code: countryCode}), lang)
            return <TouchableOpacity onPress={() => router.push('/country-code')} style={commonStyles.rowStart}>
                <Text style={styles.countryName}>{countryName}</Text>
                <Text style={styles.countryCode}>{countryCode}</Text>
                <IconFont style={styles.countryIcon} color={styles.countryIcon.color} size={ms(10)} name="a-icon-24-Lightgraydrop-down" />
                <View style={styles.divied}></View>
            </TouchableOpacity>
        }
    }, [router, countryCode, lang])
    return <>
        {formKeys.map((key) => <Controller control={control} key={key} name={key} render={({ field: { value, onChange, onBlur } }) => {
            const require = key !== 'invitationCode'
            const passwordToggle = ['password', 'confirmPassword'].includes(key)
            const placeholder = `register.${key}.placeholder`;
            const errorMsg = errors[key]?.message ? t(errors[key].message as string) : undefined;
            const suffix = onSuffixNode(key)
            const prefix = onPrefixNode(key)
            return <FormControl error={errorMsg} reserveErrorSpace required={require}>
                <Input
                    placeholder={t(placeholder)}
                    passwordToggle={passwordToggle}
                    suffix={suffix}
                    prefix={prefix}
                    onChangeText={(text) => {
                        onChange(text)
                    }}
                    onBlur={onBlur}
                    value={value} />
            </FormControl>
        }} />)}
    </>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        getVerifyCode: {
            color: theme.primary,
            fontSize: ms(13)
        },
        countryName: {
            color: theme.secondaryText,
            fontSize: ms(13)
        },
        countryCode: {
            color: theme.secondaryText,
            fontSize: ms(13),
        },
        countryIcon: {
            color: theme.secondaryText,
            marginLeft: ms(4), 
        },
        divied: {
            width: s(1),
            height: vs(15),
            backgroundColor: theme.secondaryText,
            marginHorizontal: ms(15),
        }
    })
}