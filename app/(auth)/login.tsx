import IconFont from '@/components/iconfont';
import { SafeAreaView } from '@/components/ThemeWidget';
import { Button, FormControl, Input } from '@/components/ui';
import { useActionSheet } from '@/components/ui/action-sheet-context';
import { ThemeType } from '@/constants/Colors';
import { emailRegex, globalPhoneRegex } from '@/constants/utils';
import i18n from '@/lib/i18n';
import { Language, useLanguageStore } from '@/lib/languageStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.langSection}>
        {langIcon(styles.langIcon)}
        {langIcon(styles.langIconHolder)}
      </View>
      <View style={styles.logoSection}>
        <Text>Logo</Text>
      </View>
      <View style={styles.formSection}>
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
        <Button onPress={handleSubmit(onSubmit)} variant="solid">123</Button>
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    container: {
      flex: 1,
      // transform: [{ translateX: moderateScale(15) }]
    },
    langSection: {
      alignItems: 'flex-end',
      position: 'relative',
    },
    langIcon: {
      position: 'absolute',
      right: moderateScale(-15),
      top: '50%',
      transform: [{ translateY: '-50%' }],
      zIndex: 1,
    },
    langIconHolder: {
      visibility: 'invisible',
      opacity: 0,
      pointerEvents: 'none',
    },
    logoSection: {
      marginVertical: moderateScale(40),
      width: scale(150),
      height: verticalScale(50),
      backgroundColor: '#6D7278',
    },
    formSection: {
      flex: 1,
    }
  })
}
