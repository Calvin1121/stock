import { SafeAreaView, ScrollView, VerifyCode } from '@/components/ThemeWidget';
import { Button, FormControl, Input } from '@/components/ui';
import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { pwdRegex } from '@/utils/regex';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import z from 'zod';

const forgotSchema = z.object({
  username: z.string().min(1, 'forgot.username.require'),
  verifyCode: z.string().min(1, 'forgot.verifyCode.require'),
  password: z.string().min(1, 'forgot.password.require').refine(value => pwdRegex.test(value), { message: 'forgot.password.invalid' }),
  comfirmPassword: z.string().min(1, 'forgot.comfirmPassword.require'),
}).superRefine((data, ctx) => {
  if (data.password !== data.comfirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'forgot.comfirmPassword.invalid',
      path: ['comfirmPassword'],
    });
  }
})
type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function Forgot() {
  const { t } = useTranslation('auth');
  const router = useRouter()
  const formKeys = Object.keys(forgotSchema.shape) as (keyof ForgotFormValues)[];
  const { control, handleSubmit, formState: { errors }, clearErrors } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: formKeys.reduce((acc, key) => ({ ...acc, [key]: '' }), {}) as ForgotFormValues,
    mode: 'onChange',
  })
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const onSubmit = (data?: ForgotFormValues) => {
    console.log('submit', data);
    router.push({pathname: '/(auth)/forgot-result', params: {result: 'success'}})
  }
  const verifyCodeNode = <VerifyCode title={t('forgot.verifyCode.getVerifyCode')} />
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
              const suffix = key === 'verifyCode'? verifyCodeNode : null
              const placeholderKey = `forgot.${key}.placeholder` as string;
              const errorMsg = errors[key]?.message ? t(errors[key].message as string) : undefined;
              return <FormControl error={errorMsg} reserveErrorSpace required>
                <Input
                  passwordToggle={['password', 'comfirmPassword'].includes(key)}
                  value={value}
                  suffix={suffix}
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
            <Button onPress={()=>onSubmit()}>{t('forgot.confimr')}</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
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