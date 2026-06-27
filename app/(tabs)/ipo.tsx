import IconFont from '@/components/iconfont';
import { SafeAreaView, ScrollView, TouchableOpacity } from '@/components/ThemeWidget';
import { Button } from '@/components/ui';
import { Header } from '@/components/useCommon';
import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { router } from 'expo-router';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { DimensionValue, StyleSheet, Text, View } from 'react-native';
import { ms, vs } from 'react-native-size-matters';

export default function IPOScreen() {
  const { theme } = useTheme()
  const { t } = useTranslation('ipo')
  const styles = useMemo(() => createStyles(theme), [theme])
  const mockData = [
    { stockName: 'TES2', stockLabel: 'US', stockId: 'AAPL34', publishPrice: '1 USD', deadline: '2026-06-18 00:00:00', dayRest: '7', progress: '40%' },
    { stockName: 'TES2', stockLabel: 'US', stockId: 'AAPL34', publishPrice: '1 USD', deadline: '2026-06-18 00:00:00', dayRest: '7', progress: '40%' }
  ]
  const fields = ['publishPrice', 'deadline', 'dayRest', 'progress']
  return <SafeAreaView>
    <IPOHeader />
    <ScrollView style={commonStyles.flex1}>
      <View style={[styles.list]}>
        {mockData.map((item, index) => {
          const dayRest = get(item, 'dayRest')
          const progress = (get(item, 'progress') || '0%') as DimensionValue
          const isDays = +dayRest > 0
          return <View style={[styles.listItem]} key={index}>
            <View style={[styles.nameAndSubscribe, commonStyles.rowStart]}>
              <View style={commonStyles.flex1}><Text style={[styles.nameText]}>{get(item, 'stockName')}</Text></View>
              <Button onPress={() => router.push('/(ipo)/subscribe')} textStyle={commonStyles.subscribeBtnText} style={commonStyles.subscribeBtn}>{t('subscribeBtn')}</Button>
            </View>
            <View style={[styles.labelAndId, commonStyles.rowStart]}>
              <View style={styles.stockLabel}><Text style={styles.stockLabelText}>US</Text></View>
              <Text style={styles.stockIdText}>{get(item, 'stockId')}</Text>
            </View>
            <View style={styles.fields}>
              <View style={[commonStyles.rowBetween]}>
                <Text style={[styles.fieldLabel]}>{t('publishPrice')}</Text>
                <Text style={[styles.fieldValue]}>{get(item, 'publishPrice')}</Text>
              </View>
              <View style={[commonStyles.rowBetween]}>
                <Text style={[styles.fieldLabel]}>{t('deadline')}</Text>
                <Text style={[styles.fieldValue]}>{get(item, 'deadline')}</Text>
                <Text style={[styles.fieldValue]}><Trans
                  i18nKey={isDays ? "ipo:daysRest" : "ipo:dayRest"}
                  values={{ day: dayRest }}
                  components={[
                    <Text key="0" style={styles.dayText} />
                  ]}
                /></Text>
              </View>
              <View style={[commonStyles.rowBetween]}>
                <Text style={[styles.fieldLabel]}>{t('progress')}</Text>
                <View style={[styles.progressBar]}>
                  <View style={[styles.progress, { width: progress }]} />
                </View>
              </View>
            </View>
          </View>
        })}
      </View>
    </ScrollView>
  </SafeAreaView>
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    list: {
      gap: ms(15),
      paddingVertical: ms(10),
      paddingHorizontal: ms(15)
    },
    listItem: {
      backgroundColor: theme.ipoCard,
      borderRadius: ms(10),
      paddingHorizontal: ms(20),
      paddingVertical: ms(15)
    },
    nameAndSubscribe: {
      gap: ms(15),
      marginTop: ms(5)
    },
    nameText: {
      color: theme.primaryText,
      fontSize: ms(15),
      lineHeight: ms(21)
    },
    labelAndId: {
      gap: ms(5),
      marginBottom: ms(10)
    },
    stockLabel: {
      backgroundColor: theme.stockLabel,
      borderRadius: ms(2),
      paddingHorizontal: ms(6),
    },
    stockLabelText: {
      color: theme.primary,
      fontSize: ms(10),
      lineHeight: ms(13.5)
    },
    stockIdText: {
      color: theme.secondaryText,
      fontSize: ms(13),
      lineHeight: ms(17.5)
    },
    fields: {
      gap: ms(10)
    },
    fieldLabel: {
      color: theme.secondaryText,
      fontSize: ms(13),
      lineHeight: ms(17.5)
    },
    fieldValue: {
      color: theme.primaryText,
      fontSize: ms(13),
      lineHeight: ms(17.5)
    },
    dayText: {
      color: theme.primary
    },
    progressBar: {
      height: vs(15),
      flex: 1,
      maxWidth: '70%',
      backgroundColor: theme.background,
      borderRadius: ms(10)
    },
    progress: {
      height: '100%',
      borderRadius: ms(10),
      backgroundColor: theme.primary
    }
  })
}
export function IPOHeader(): React.ReactNode {
  const { theme } = useTheme()
  const { t } = useTranslation('ipo')
  const styles = useMemo(() => createHeaderStyles(theme), [theme])
  const props = {
    options: {
      headerLeft: () => <View style={styles.leftHeader}>
        <Text style={[styles.titleText]}>{t('title')}</Text>
      </View>,
      headerRight: () => <View style={[commonStyles.alignEnd]}>
        <TouchableOpacity onPress={() => router.push('/(ipo)/history')} style={styles.historyIcon}>
          <IconFont color={theme.primaryText} size={ms(29)} name="a-icon-48-Historicalrecords" />
        </TouchableOpacity>
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
    },
    historyIcon: {
      marginRight: ms(15)
    }
  })
}