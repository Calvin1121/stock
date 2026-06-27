import IconFont from '@/components/iconfont';
import { EmailRegister, EmailRegisterFormValues } from '@/components/register/email';
import { PhoneRegister, PhoneRegisterFormValues } from '@/components/register/phone';
import { SafeAreaView, ScrollView, TouchableOpacity } from '@/components/ThemeWidget';
import { Button } from '@/components/ui';
import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';

export enum RegisterType {
  Phone = 'phone',
  Email = 'email'
}

export default function Register() {
  const { t } = useTranslation('auth');
  const tabs = Object.values(RegisterType).map(type => ({ label: `register.${type}`, value: type }))
  const [activeTab, setActiveTab] = useState(RegisterType.Phone)
  const [isAgree, setIsAgree] = useState(false)
  const { theme } = useTheme()
  const styles = useMemo(() => createStyles(theme, isAgree), [theme])
  const registerRef = useRef<any>(null)
  const onSubmit = (data: PhoneRegisterFormValues | EmailRegisterFormValues) => {
    console.log('submit', data);
  }
  const onRegister = () => {
    registerRef.current?.handleSubmit(onSubmit)()
  }
  return (
    <SafeAreaView>
      <ScrollView style={commonStyles.secondaryLayoutPadding}>
        <View style={[commonStyles.rowStart, styles.tabs]}>
          {tabs.map(tab => <View key={tab.value}>
            <TouchableOpacity onPress={() => setActiveTab(tab.value)}>
              <View style={commonStyles.relative}>
                <Text style={[styles.tab, tab.value === activeTab ? styles.tabActive : null]}>{t(tab.label)}</Text>
                {tab.value === activeTab && <IconFont name="icon-16-triangle" color={styles.tabIndicator.color} style={styles.tabIndicator} size={ms(8)} />}
              </View>
            </TouchableOpacity>
          </View>)}
        </View>
        <View>
          {activeTab === RegisterType.Phone && <PhoneRegister ref={registerRef} />}
          {activeTab === RegisterType.Email && <EmailRegister ref={registerRef} />}
        </View>
        <View style={[commonStyles.rowStart, styles.tncSection]}>
          <TouchableOpacity onPress={() => setIsAgree(prev => !prev)} style={commonStyles.rowStart}>
            <IconFont style={styles.tncAgreeIcon} color={styles.tncAgreeIcon.color} name={isAgree ? 'a-pic-36-Singlechoice-Selected' : 'a-icon-36-Singlechoice-default'} size={ms(18)} />
            <Text style={styles.tncAgreement}>{t('register.tncAgreement')}</Text>
            <TouchableOpacity>
              <Text style={styles.tnc}>{t('register.tnc')}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Button disabled={!isAgree} onPress={onRegister}>{t('login.register')}</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(theme: ThemeType, isAgree: boolean) {
  return StyleSheet.create({
    tabs: {
      gap: ms(30),
      paddingVertical: ms(10),
      marginBottom: ms(30),
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
        { translateX: '-50%' }
      ]
    },
    tncSection: {
      marginTop: ms(10),
    },
    tncAgreeIcon: {
      color: isAgree ? theme.primary : theme.secondary,
      marginRight: ms(10),
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


export const RegisterHeaderRight = () => {
  const { t } = useTranslation('auth');
  const { theme } = useTheme();
  const router = useRouter();
  const styles = useMemo(() => createHeaderStyles(theme), [theme])
  return <View style={[commonStyles.rowEnd]}>
    <Text style={styles.hasAccount}>{t('register.hasAccount')}</Text>
    <TouchableOpacity onPress={() => router.replace('/login')}>
      <Text style={styles.login}>{t('register.login')}</Text>
    </TouchableOpacity>
  </View>
}

function createHeaderStyles(theme: ThemeType) {
  return StyleSheet.create({
    hasAccount: {
      color: theme.secondaryText,
      fontSize: ms(15)
    },
    login: {
      color: theme.primary,
      fontSize: ms(15),
      marginRight: ms(20)
    }
  })
}