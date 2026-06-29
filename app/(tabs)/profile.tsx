import IconFont, { IconNames } from '@/components/iconfont';
import { SafeAreaView, TouchableOpacity } from '@/components/ThemeWidget';
import { Button } from '@/components/ui';
import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { router } from 'expo-router';
import { get } from 'lodash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ms, s } from 'react-native-size-matters';

export default function ProfileScreen() {
  const i18nKey = 'profile'
  const { top: paddingTop } = useSafeAreaInsets()
  const { t, i18n } = useTranslation(i18nKey)
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme])
  const langMap = useMemo(() => i18n.getResourceBundle(i18n.language, i18nKey), [i18n])
  const linksKey = useMemo(() => Object.keys(get(langMap, 'links') || {}), [langMap])
  const linksIconMap = {
    aboutUs: 'icon-60-About',
    service: 'icon-60-service'
  }
  const tabs = ['verification', 'pwd', 'lang']
  const onNav = (tab: string) => {
    switch (tab) {
      case 'lang':
        router.push('/(profile)/lang')
        break;
      case 'aboutUs':
        router.push('/(profile)/about-us')
        break;
      case 'pwd':
        router.push('/(profile)/change-pwd')
        break;
      case 'verification':
        router.push('/(profile)/verification')
        break;
      case 'service':
        router.push('/(profile)/service')
        break
      default:
        break;
    }
  }
  return <SafeAreaView style={[{ paddingTop }]}>
    <View style={[styles.pageContainer, commonStyles.flex1]}>
      <View style={[styles.profile, commonStyles.rowCenter]}>
        <View style={[styles.avatarContainer, commonStyles.rowCenter]}>
          <IconFont style={[styles.avatar]} name='avatar-rect' size={s(46)} />
        </View>
        <View style={[styles.usernameAndId, commonStyles.flex1]}>
          <Text style={[styles.username]}>m165@gmail.com</Text>
          <Text style={[styles.idText]}>ID：620599</Text>
        </View>
        <TouchableOpacity style={[styles.navIcon]}>
          <IconFont color={theme.secondaryText} size={ms(22)} name='icon-32-arrow-left' />
        </TouchableOpacity>
      </View>
      <View style={[styles.tabs, commonStyles.rowCenter]}>
        {tabs.map((tab) => <View key={tab} style={[commonStyles.flex1, commonStyles.alignCenter, commonStyles.justifyCenter]}>
          <TouchableOpacity onPress={() => onNav(tab)} style={[commonStyles.alignCenter,]}>
            {/* TODO */}
            <IconFont name={`${tab}-dark` as IconNames} size={ms(29)} />
            <Text style={[styles.tabText]}>{t(tab)}</Text>
          </TouchableOpacity>
        </View>)}
      </View>
      <View style={[styles.links]}>
        {linksKey.map((key) => <TouchableOpacity onPress={() => onNav(key)} style={[styles.link, commonStyles.rowCenter]} key={key}>
          <IconFont color={theme.secondaryText} name={get(linksIconMap, key)} size={ms(29)} />
          <View style={[commonStyles.flex1]}><Text style={[styles.linkText]}>{t(`links.${key}`)}</Text></View>
          <IconFont color={theme.secondaryText} size={ms(22)} name='icon-32-arrow-left' />
        </TouchableOpacity>)}
      </View>
      <View style={[commonStyles.mainLayoutPadding]}>
        <Button>{t('logout')}</Button>
      </View>
    </View>
  </SafeAreaView>
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    pageContainer: {
      backgroundColor: theme.card
    },
    profile: {
      paddingTop: ms(24),
      paddingHorizontal: ms(15),
      paddingBottom: ms(15),
      gap: ms(12),
      backgroundColor: theme.background
    },
    avatarContainer: {
      width: s(50),
      height: s(50),
      borderRadius: ms(12),
      borderWidth: ms(2),
      borderColor: theme.ipoStatusBackground,
      overflow: 'hidden',
    },
    avatar: {
      borderRadius: ms(12),
    },
    usernameAndId: {
      gap: ms(5)
    },
    username: {
      fontSize: ms(18),
      lineHeight: ms(25),
      color: theme.primaryText
    },
    idText: {
      fontSize: ms(14),
      lineHeight: ms(19.5),
      color: theme.primaryText
    },
    navIcon: {
      paddingRight: ms(8),
      paddingLeft: ms(15),
      paddingVertical: ms(15)
    },
    tabs: {
      paddingVertical: ms(15)
    },
    tabText: {
      fontSize: ms(13),
      lineHeight: ms(17.5),
      color: theme.primaryText,
      marginTop: ms(4)
    },
    links: {
      marginBottom: ms(15)
    },
    link: {
      padding: ms(15),
      gap: ms(10),
      borderBottomWidth: ms(1),
      borderBottomColor: theme.background
    },
    linkText: {
      fontSize: ms(14),
      lineHeight: ms(19.5),
      color: theme.secondaryText
    }
  })
}

