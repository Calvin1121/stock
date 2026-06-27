import { SafeAreaView, ScrollView, TouchableOpacity } from '@/components/ThemeWidget';
import { Header } from '@/components/useCommon';
import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ms, s } from 'react-native-size-matters';

export default function NewsScreen() {
  const { theme } = useTheme()
  const { t } = useTranslation('news')
  const styles = useMemo(() => createStyles(theme), [theme])
  const data = [0, 1, 2, 3, 4, 5, 6]
  return <SafeAreaView>
    <NewsHeader />
    <ScrollView style={commonStyles.flex1}>
      <View style={styles.items}>
        {data.map((item, index) => <TouchableOpacity onPress={()=>router.push({pathname: '/(news)/detail'})} key={item} style={[styles.item, commonStyles.flexRow, index? styles.borderTop: null]}>
          <View style={[commonStyles.flex1]}>
            <Text numberOfLines={1} style={styles.titleText}>中共中央政治局召开会议 分析中共中央政治局召开会议 分析...</Text>
            <Text numberOfLines={2} style={styles.contentText}>新华社北京12月11日电 中共中央政治局12月11日召开会议，分析研究202新华社北京12月11日电 中共中央政治局12月11日召开会议，分析研究202...</Text>
            <Text style={styles.dateText}>2026-06-06 16:05:27</Text>
          </View>
          <View style={styles.imageHolder}/>
        </TouchableOpacity>)}
      </View>
    </ScrollView>
  </SafeAreaView>
}
function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    items: {
      paddingHorizontal: ms(15),
      paddingVertical: ms(10)
    },
    item: {
      paddingVertical: ms(15),
      gap: ms(20)
    },
    titleText: {
      color: theme.primaryText,
      fontSize: ms(15.5),
      lineHeight: ms(21.5)
    },
    contentText: {
      color: theme.newsContentText,
      fontSize: ms(13),
      lineHeight: ms(15),
      minHeight: ms(30),
      marginTop: ms(10)
    },
    dateText: {
      color: theme.secondaryText,
      fontSize: ms(10),
      lineHeight: ms(13.5),
      marginTop: ms(5.5)
    },
    imageHolder: {
      width: s(110),
      height: '100%',
      backgroundColor: theme.card,
      borderRadius: ms(2)
    },
    borderTop: {
      borderTopWidth: ms(1),
      borderTopColor: theme.backgroundDivide
    }
  })
}
export function NewsHeader(): React.ReactNode {
  const { theme } = useTheme()
  const { t } = useTranslation('news')
  const styles = useMemo(() => createHeaderStyles(theme), [theme])
  const props = {
    options: {
      headerLeft: () => <View style={styles.leftHeader}>
        <Text style={[styles.titleText]}>{t('title')}</Text>
      </View>
    }
  }
  return <Header {...props} />
}
function createHeaderStyles(theme: ThemeType) {
  return StyleSheet.create({
    leftHeader: {
      paddingLeft: ms(15)
    },
    titleText: {
      color: theme.primaryText,
      fontSize: ms(18),
      lineHeight: ms(25)
    }
  })
}
