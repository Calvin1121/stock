import IconFont, { IconNames } from '@/components/iconfont';
import { SafeAreaView, ScrollView, TouchableOpacity } from '@/components/ThemeWidget';
import { Button, FormControl, Input } from '@/components/ui';
import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { emailRegex, globalPhoneRegex } from '@/utils/regex';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
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
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter()

  const onSubmit = (data: LoginFormValues) => {
    console.log('submit', data);
  }
  return (
    <SafeAreaView>
      <ScrollView style={commonStyles.secondaryLayoutPadding}>
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
      marginTop: ms(10),
      marginBottom: ms(40),
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

export const LoginHeaderRight = () => {
  const router = useRouter();
  return <View style={[commonStyles.alignEnd, commonStyles.relative]}>
    <TouchableOpacity style={{ marginRight: ms(15) }} onPress={() => router.push('/(profile)/lang')}>
      {/* // TODO */}
      <IconFont name={`lang-dark` as IconNames} size={ms(29)} />
    </TouchableOpacity>
  </View>
}
