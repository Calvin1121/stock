import IconFont from '@/components/iconfont';
import { SafeAreaView, ScrollView, TouchableOpacity } from '@/components/ThemeWidget';
import { Button, FormControl, Input } from '@/components/ui';
import { useActionSheet } from '@/components/ui/action-sheet-context';
import { ThemeType } from '@/constants/Colors';
import { emailRegex, globalPhoneRegex } from '@/constants/utils';
import i18n from '@/lib/i18n';
import { Language, useLanguageStore } from '@/lib/languageStore';
import { commonStyles } from '@/styles/util';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import { useUnistyles } from 'react-native-unistyles';
import z from 'zod';

const loginSchema = z.object({
  username: z.string()
    .min(1, 'login.username.required')
    .refine((value) => {
      if (emailRegex.test(value)) return true;
      const normalized = value.replace(/[\s-()]/g, '');
      return globalPhoneRegex.test(normalized);
    }, {
      message: 'login.username.invalid',
    }),
  password: z.string().min(1, 'login.password.required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { t } = useTranslation('auth');
  const formKeys = Object.keys(loginSchema.shape) as (keyof LoginFormValues)[];
  const { control, handleSubmit, formState: { errors }, clearErrors } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: formKeys.reduce((acc, key) => ({ ...acc, [key]: '' }), {}) as LoginFormValues,
    mode: 'onChange',
  })
  const { theme } = useUnistyles();
  const styles = createStyles(theme);
  const { show } = useActionSheet();
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }, [])
  const router = useRouter()
  const onChangeLang = useCallback(() => {
    show({
      title: t('lang.select'),
      items: [
        { label: t('lang.en'), value: 'en', onPress: (item) => handleLanguageChange(item.value as Language) },
        { label: t('lang.zh'), value: 'zh', onPress: (item) => handleLanguageChange(item.value as Language) },
      ],
    })
  }, [handleLanguageChange, show, t])
  const onSubmit = (data: LoginFormValues) => {
    console.log('submit', data);
  }
  const langIcon = (styles: ViewStyle) => (<TouchableOpacity style={styles} onPress={onChangeLang}>
    <IconFont name='lang-dark' size={29} />
  </TouchableOpacity>)
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={
          [commonStyles.alignEnd, commonStyles.relative]
        }>
          {langIcon({...styles.langIcon, ...commonStyles.absolute})}
          {langIcon(commonStyles.invisible)}
        </View>
        <View style={styles.logoSection}>
          <Text>Logo</Text>
        </View>
        <View style={[commonStyles.flex1]}>
          {formKeys.map((key) => <Controller
            key={key}
            control={control}
            name={key}
            render={({ field: { value, onChange, onBlur } }) => {
              const placeholderKey = `login.${key}.placeholder` as string;
              const errorMsg = errors[key]?.message ? t(errors[key].message as string) : undefined;
              return <FormControl error={errorMsg} required reserveErrorSpace>
                <Input
                  passwordToggle={key === 'password'}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    if (errors[key]) clearErrors(key);
                  }}
                  onBlur={onBlur}
                  placeholder={t(placeholderKey)}
                />
              </FormControl>
            }}
          />)}
          <View style={styles.buttonSection}>
            <Button onPress={handleSubmit(onSubmit)}>{t('login.button')}</Button>
            <View style={[styles.actionSection, commonStyles.rowBetween]}>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.actionText}>{t('login.register')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/forgot')}>
                <Text style={styles.actionText}>{t('login.forgotPwd')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    langIcon: {
      right: ms(-15),
      top: '50%',
      transform: [{ translateY: '-50%' }],
      zIndex: 1,
    },
    logoSection: {
      marginVertical: ms(40),
      width: s(150),
      height: vs(50),
      backgroundColor: '#6D7278',
    },
    buttonSection: {
      marginTop: ms(20),
    },
    actionSection: {
      marginTop: ms(15),
    },
    actionText: {
      color: theme.primary,
      fontSize: ms(15),
      lineHeight: ms(21)
    }
  })
}
