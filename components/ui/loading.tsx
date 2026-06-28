import { ThemeType } from '@/constants/Colors'
import { useTheme } from '@/lib/useTheme'
import { commonStyles } from '@/styles/util'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { ms } from 'react-native-size-matters'

interface LoadingContextValue {
  showLoading: (message?: string) => void
  hideLoading: () => void
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [loadingState, setLoadingState] = useState<{ visible: boolean; message?: string }>({ visible: false, message: undefined })
  const styles = useMemo(() => createStyles(theme), [theme])

  const showLoading = useCallback((message?: string) => {
    setLoadingState({ visible: true, message })
  }, [])

  const hideLoading = useCallback(() => {
    setLoadingState({ visible: false, message: undefined })
  }, [])

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {loadingState.visible ? (
        <View style={styles.overlay} pointerEvents="auto">
          <View style={styles.wrapper}>
            <View style={[styles.spinner, commonStyles.rowCenter, commonStyles.columnCenter]}>
              <ActivityIndicator size="large" color={theme.primary} />
            </View>
            {loadingState.message ? <Text style={styles.message}>{loadingState.message}</Text> : null}
          </View>
        </View>
      ) : null}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    wrapper: {
      padding: ms(18),
      borderRadius: ms(16),
      backgroundColor: theme.card,
      minWidth: ms(140),
      alignItems: 'center',
      gap: ms(10),
    },
    spinner: {
      width: ms(52),
      height: ms(52),
      borderRadius: ms(14),
      backgroundColor: theme.background,
    },
    message: {
      color: theme.primaryText,
      fontSize: ms(14),
      lineHeight: ms(20),
      textAlign: 'center',
    },
  })
}
