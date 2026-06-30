import { SafeAreaView, ScrollView } from "@/components/ThemeWidget";
import { Button, FormControl, Input } from "@/components/ui";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { pwdRegex } from "@/utils/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import z from "zod";


const changePWDSchema = z.object({
    oldPassword: z.string().min(1, 'changePWD.oldPassword.required'),
    newPassword: z.string().min(1, 'changePWD.newPassword.required').refine((value) => pwdRegex.test(value), { message: 'changePWD.newPassword.invalid' }),
    confirmPassword: z.string().min(1, 'changePWD.confirmPassword.required'),
}).superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'changePWD.confirmPassword.invalid',
            path: ['confirmPassword'],
        });
    }
})
type ChangePWDFormValues = z.infer<typeof changePWDSchema>;
export default function ChangePWDPage() {
    const { t } = useTranslation('profile')
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const formKeys = Object.keys(changePWDSchema.shape) as (keyof ChangePWDFormValues)[]
    const { handleSubmit, control, formState: { errors, isDirty, isValid }, } = useForm<ChangePWDFormValues>({
        resolver: zodResolver(changePWDSchema),
        defaultValues: formKeys.reduce((acc, key) => ({ ...acc, [key]: '' }), {}) as ChangePWDFormValues,
        mode: 'onChange'
    })

    return <SafeAreaView>
        <ScrollView>
            <View style={[styles.form]}>
                {formKeys.map((key) => <Controller control={control} name={key} key={key} render={({ field: { value, onChange, onBlur } }) => {
                    return <FormControl error={t(get(errors, key)?.message || '')} reserveErrorSpace required>
                        <Input passwordToggle placeholder={t(`changePWD.${key}.placeholder`)} onChangeText={onChange} onBlur={onBlur} value={value} />
                    </FormControl>
                }} />)}
            </View>
        </ScrollView>
        <View style={[commonStyles.mainLayoutPadding]}>
            <Button disabled={!isDirty || !isValid}>{t('changePWD.confirmBtn')}</Button>
        </View>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        form: {
            paddingHorizontal: ms(15)
        }
    })
}