import { IconDropdown } from '@/components/iconfont';
import { SafeAreaView, ScrollView, TouchableOpacity } from '@/components/ThemeWidget';
import { Button, FormControl, Input } from '@/components/ui';
import { ThemeType } from '@/constants/Colors';
import { pwdRegex, sixverifyCode } from '@/constants/utils';
import { commonStyles } from '@/styles/util';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { useUnistyles } from 'react-native-unistyles';
import z from 'zod';

export enum RegisterType {
  Phone = 'phone',
  Email = 'email'
}

const phomeSchema = z.object({
  account: z.string(),
  verifyCode: z.string().min(1, 'register.phoneType.verifyCode.require').refine((value) => sixverifyCode.test(value.toString()), { message: 'register.phoneType.verifyCode.invalid' }),
  invitationCode: z.string(),
  password: z.string().refine(value => pwdRegex.test(value), { message: 'register.password.invalid' }),
  comfirmPassword: z.string().min(1, 'register.comfirmPassword.require'),
}).superRefine((data, ctx) => {
  if (data.password !== data.comfirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'register.comfirmPassword.invalid',
      path: ['comfirmPassword'],
    });
  }
})
type RegisterFormValues = z.infer<typeof phomeSchema>;

export default function Register() {
  const { t } = useTranslation('auth');
  const tabs = Object.values(RegisterType).map(type => ({ label: `register.${type}`, value: type }))
  const [activeTab, setActiveTab] = useState(RegisterType.Phone)
  const { theme } = useUnistyles()
  const styles = useMemo(() => createStyles(theme), [theme])
  const formKeys = Object.keys(phomeSchema.shape) as (keyof RegisterFormValues)[]
  const { control, handleSubmit, formState: { errors }, clearErrors } = useForm<RegisterFormValues>({
    resolver: zodResolver(phomeSchema),
    defaultValues: formKeys.reduce((acc, key) => ({ ...acc, [key]: '' }), {}) as RegisterFormValues,
    mode: 'onChange'
  })
  const onSubmit = (data: RegisterFormValues) => {
    console.log('submit', data);
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[commonStyles.rowStart, styles.tabs]}>
          {tabs.map(tab => <View key={tab.value}>
            <TouchableOpacity onPress={() => setActiveTab(tab.value)}>
              <View style={commonStyles.relative}>
                <Text style={[styles.tab, tab.value === activeTab ? styles.tabActive : null]}>{t(tab.label)}</Text>
                {tab.value === activeTab && <IconDropdown color={styles.tabIndicator.color} style={styles.tabIndicator} size={ms(8)} />}
              </View>
            </TouchableOpacity>
          </View>)}
        </View>
        <View>
          {formKeys.map((key) => <Controller control={control} key={key} name={key} render={({ field: { value, onChange, onBlur } }) => {
            const require = key !== 'invitationCode'
            const passwordToggle = ['password', 'comfirmPassword'].includes(key)
            const _key = key === 'account'? activeTab : key
            const isNestKey = ['account', 'verifyCode'].includes(key)
            const placeholder = isNestKey ? `register.${activeTab}Type.${_key}.placeholder` : `register.${key}.placeholder`;
            const errorMsg = errors[key]?.message ? t(errors[key].message as string) : undefined;
            return <FormControl error={errorMsg} reserveErrorSpace required={require}>
              <Input
                placeholder={t(placeholder)}
                passwordToggle={passwordToggle}
                onChangeText={(text) => {
                  onChange(text)
                }} 
                onBlur={onBlur}
                value={value} />
            </FormControl>
          }} />)}
        </View>
        <View style={commonStyles.rowStart}>
          <Text style={styles.tncAgreement}>{t('register.tncAgreement')}</Text>
          <TouchableOpacity>
            <Text style={styles.tnc}>{t('register.tnc')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Button onPress={handleSubmit(onSubmit)}>{t('login.register')}</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    tabs: {
      gap: ms(30),
      paddingVertical: ms(10)
    },
    tab: {
      color: theme.secondary,
      fontSize: ms(18),
      lineHeight: ms(25),
    },
    tabActive: {
      color: theme.primary
    },
    tabIndicator: {
      ...commonStyles.absolute,
      color: theme.primary,
      left: '50%',
      bottom: ms(-8),
      transform: [
        { translateX: '-50%' },
        { rotate: '180deg' }
      ]
    },
    tncAgreement: {
      color: theme.secondary
    },
    tnc: {
      color: theme.primary
    },
    button: {
      paddingTop: ms(10),
      paddingBottom: ms(20)
    }
  })
}