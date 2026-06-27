import { Header } from '@/components/useCommon';
import { ThemeType } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { GlobalHeaderProps } from '../_layout';

export default function IPOScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>IPO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export function IPOHeader(props: GlobalHeaderProps): React.ReactNode {
  console.log(props)
  const { options, t, theme, ...rest } = props
  const _props = {
    ...rest,
    options: {
      ...options,
      headerLeft: () => <View style={{ paddingLeft: ms(15) }}>
        <Text style={[{color: theme.primaryText}]}>{t('ipo:title')}</Text>
      </View>,
      headerRight: () => <></>
    }
  }
  return <Header {..._props} />
}

function createHeaderStyles(theme: ThemeType) {
  return StyleSheet.create({
    titleText: {
      color: theme.primaryText,
      fontSize: ms(18),
      lineHeight: ms(25)
    }
  })
}