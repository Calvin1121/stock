import IconFont from "@/components/iconfont";
import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget";
import { Button, FormControl, Input } from "@/components/ui";
import { usePlatform, useUploadPhoto } from "@/components/useCommon";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { identifyKeyboardType } from "@/utils/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardTypeOptions, StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";
import z from "zod";

const verificationSchema = z.object({
    realName: z.string().min(1, 'verifications.baseInfo.realName.required'),
    idNo: z.string().min(1, 'verifications.baseInfo.idNo.required'),
    topSide: z.string().min(1, 'verifications.identifyInfo.topSide.required'),
    btmSide: z.string().min(1, 'verifications.identifyInfo.btmSide.required')
})
type VerificationSchema = z.infer<typeof verificationSchema>;

export default function VerificationPage() {
    const { t } = useTranslation('profile')
    const { platformOs } = usePlatform()
    const { onTrigger } = useUploadPhoto()
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const { handleSubmit, control, formState: { errors, isDirty, isValid }, } = useForm<VerificationSchema>({
        resolver: zodResolver(verificationSchema),
        defaultValues: { realName: '', idNo: '', topSide: '', btmSide: '' },
        mode: 'onChange'
    })
    const onUpload = (key: string) => {
        onTrigger()
    }
    return <SafeAreaView>
        <ScrollView style={[commonStyles.flex1]}>
            <View style={[commonStyles.mainLayoutPadding]}>
                <View style={[styles.baseInfo]}>
                    <Text style={[styles.infoTitle]}>{t('verifications.baseInfo.title')}</Text>
                    <Text style={[styles.baseInfoTips]}>{t('verifications.baseInfo.tips')}</Text>
                    <Controller control={control} name="realName" render={({ field: { value, onChange, onBlur } }) =>
                        <FormControl required reserveErrorSpace>
                            <Input
                                placeholder={t('verifications.baseInfo.realName.placeholder')}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        </FormControl>}>
                    </Controller>
                    <Controller control={control} name="idNo" render={({ field: { value, onChange, onBlur } }) =>
                        <FormControl required reserveErrorSpace>
                            <Input
                                placeholder={t('verifications.baseInfo.idNo.placeholder')}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType={(get(identifyKeyboardType, platformOs) || 'default') as KeyboardTypeOptions}
                            />
                        </FormControl>}>
                    </Controller>
                </View>
                <View style={[styles.identifyInfo]}>
                    <Text style={[styles.infoTitle]}>{t('verifications.identifyInfo.title')}</Text>
                    {['topSide', 'btmSide'].map(key => <React.Fragment key={key}>
                        <View style={[styles.identifyInfoTitle, commonStyles.rowStart]}>
                            <IconFont size={ms(24)} name="icon-ID-front-dark" />
                            <Text style={[styles.identifyInfoTitleText]}>{t(`verifications.identifyInfo.${key}.title`)}</Text>
                        </View>
                        <TouchableOpacity onPress={() => onUpload(key)} style={[styles.uploadArea, commonStyles.alignCenter, commonStyles.justifyCenter]}>
                            <IconFont name="icon-32-plus" size={ms(41)} />
                        </TouchableOpacity>
                    </React.Fragment>)}
                </View>
            </View>
        </ScrollView>
        <View style={[commonStyles.mainLayoutPadding]}>
            <Button disabled={false}>{t('verifications.confirmBtn')}</Button>
        </View>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        baseInfo: {},
        infoTitle: {
            fontSize: ms(18),
            lineHeight: ms(25),
            color: theme.primaryText
        },
        baseInfoTips: {
            fontSize: ms(13),
            lineHeight: ms(18),
            color: theme.secondaryText,
            marginTop: ms(10),
            marginBottom: ms(30)
        },
        identifyInfo: {
        },
        identifyInfoTitle: {
            marginTop: ms(15)
        },
        identifyInfoTitleText: {
            fontSize: ms(13),
            lineHeight: ms(17.5),
            color: theme.primaryText,
            marginLeft: ms(15)
        },
        uploadArea: {
            width: '100%',
            height: ms(208.5),
            borderRadius: ms(15),
            backgroundColor: theme.card,
            marginTop: ms(15)
        },
    })
}