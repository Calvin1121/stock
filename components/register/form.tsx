import { ThemeType } from "@/constants/Colors";
import { commonStyles } from "@/styles/util";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms, s, vs } from "react-native-size-matters";
import { useUnistyles } from "react-native-unistyles";
import IconFont from "../iconfont";
import { TouchableOpacity } from "../ThemeWidget";
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
    const { theme } = useUnistyles();
    const styles = useMemo(() => createStyles(theme), [theme])
    const onSuffixPress = (key: string) => {
        onPrefixSuffixTap?.(key)
    }
    const onSuffixNode = (key: string) => {
        if(['smsCode', 'emailCode'].includes(key)) {
            return <TouchableOpacity onPress={() => onSuffixPress(key)}>
                <Text style={styles.getVerifyCode}>{t(`register.${key}.getVerifyCode`)}</Text>
            </TouchableOpacity>
        }
    }
    const onPrefixNode = (key: string) => {
        if(key === 'phoneType') {
            return <TouchableOpacity onPress={() => router.push('/country-code')} style={commonStyles.rowStart}>
                <Text style={styles.countryName}>中国大陆</Text>
                <Text style={styles.countryCode}>+86</Text>
                <IconFont style={styles.countryIcon} color={styles.countryIcon.color} size={ms(10)} name="a-icon-24-Lightgraydrop-down" />
                <View style={styles.divied}></View>
            </TouchableOpacity>
        }
    }
    return <>
        {formKeys.map((key) => <Controller control={control} key={key} name={key} render={({ field: { value, onChange, onBlur } }) => {
            const require = key !== 'invitationCode'
            const passwordToggle = ['password', 'comfirmPassword'].includes(key)
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