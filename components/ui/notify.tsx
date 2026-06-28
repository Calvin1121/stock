import { TouchableOpacity } from '@/components/ThemeWidget'
import { ThemeType } from '@/constants/Colors'
import { useTheme } from '@/lib/useTheme'
import { commonStyles } from '@/styles/util'
import { HeaderHeight } from '@/utils/consts'
import { get } from 'lodash'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ms } from 'react-native-size-matters'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastOptions {
    message: string
    type?: ToastType
    duration?: number
}

interface ToastContextValue {
    showToast: (options: ToastOptions) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const DEFAULT_DURATION = 5000

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const { top } = useSafeAreaInsets()
    const { theme } = useTheme()
    const [toast, setToast] = useState<ToastOptions & { visible: boolean }>({ message: '', type: 'info', duration: DEFAULT_DURATION, visible: false })
    const animation = useRef(new Animated.Value(0)).current
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const styles = useMemo(() => createStyles(theme), [theme])

    const hideToast = useCallback(() => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
        }).start(() => {
            setToast((prev) => ({ ...prev, visible: false }))
        })
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }, [animation])

    const showToast = useCallback(
        ({ message, type = 'info', duration = DEFAULT_DURATION }: ToastOptions) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            setToast({ message, type, duration, visible: true })
            Animated.timing(animation, {
                toValue: 1,
                duration: 220,
                useNativeDriver: true,
            }).start()

            timeoutRef.current = setTimeout(() => {
                hideToast()
            }, duration)
        },
        [animation, hideToast]
    )

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const backgroundColor = getToastBackgroundColor(theme, toast?.type)
    const textColor = getToastTextColor(theme, toast?.type)

    const animatedStyle = {
        opacity: animation,
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-16, 0],
                }),
            },
        ],
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast.visible ? (
                <Animated.View style={[styles.toastContainer, animatedStyle]}>
                    <TouchableOpacity activeOpacity={0.85} onPress={hideToast} style={[styles.toastButton, commonStyles.rowStart, { backgroundColor, marginTop: HeaderHeight + top + ms(5) }]}>
                        <Text style={[styles.toastText, { color: textColor }]} numberOfLines={2}>{toast.message}</Text>
                    </TouchableOpacity>
                </Animated.View>
            ) : null}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within ToastProvider')
    }
    return context
}

function getToastBackgroundColor(theme: ThemeType, type?: ToastType) {
    switch (type) {
        case 'success':
            return get(theme, 'notify.success') || theme.success
        case 'error':
            return get(theme, 'notify.error') || theme.error
        case 'warning':
            return get(theme, 'notify.warning') || theme.warning
        default:
            return get(theme, 'notify.info') || theme.info
    }
}

function getToastTextColor(theme: ThemeType, type?: ToastType) {
    if (type === 'success' || type === 'error' || type === 'warning') {
        return '#fff'
    }
    return get(theme, 'notify.text') || '#fff'
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        toastContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            paddingHorizontal: ms(15),
            zIndex: 999,
        },
        toastButton: {
            width: '100%',
            borderRadius: ms(12),
            paddingVertical: ms(12),
            paddingHorizontal: ms(14),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.1,
            shadowRadius: ms(12),
            elevation: 6,
        },
        toastText: {
            fontSize: ms(14),
            lineHeight: ms(20),
        },
    })
}
