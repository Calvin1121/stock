import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Modal as RNModal,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { ms } from 'react-native-size-matters';
import { TouchableOpacity } from '../ThemeWidget';

export interface ModalProps {
    visible: boolean;
    onClose?: () => void;
    onConfirm: () => void;
    title?: string;
    children?: React.ReactNode | string;
    hideCancel?: boolean;
    confirmText?: string;
    cancelText?: string
}

export function Modal({
    visible,
    title,
    children,
    onClose,
    onConfirm,
    hideCancel,
    confirmText,
    cancelText,
}: ModalProps) {
    const { theme } = useTheme();
    const { t } = useTranslation('modal')
    const [isModalVisible, setIsModalVisible] = React.useState(visible);
    const translateY = useSharedValue(visible ? 0 : 1000);
    const opacityAnim = useSharedValue(visible ? 1 : 0);

    const handleClose = useCallback(() => {
        opacityAnim.value = withTiming(0, {
            duration: 300,
            easing: Easing.in(Easing.cubic),
        });
        translateY.value = withTiming(1000, {
            duration: 300,
            easing: Easing.in(Easing.cubic),
        }, () => {
            onClose && runOnJS(onClose)();
        });
    }, [onClose, opacityAnim, translateY]);

    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: opacityAnim.value,
    }));

    const finalBg = theme.card;
    const finalOverlay = theme.overlayBackground;
    const finalTitle = theme.primaryText;
    const finalText = theme.secondaryText;
    const _confirmText = confirmText || t('confirmText');
    const _cancelText = cancelText || t('cancelText')

    useEffect(() => {
        if (visible) {
            setIsModalVisible(true);
            setTimeout(() => {
                opacityAnim.value = withTiming(1, {
                    duration: 300,
                    easing: Easing.out(Easing.cubic),
                });
                translateY.value = withTiming(0, {
                    duration: 300,
                    easing: Easing.out(Easing.cubic),
                });
            }, 50);
        } else {
            opacityAnim.value = withTiming(0, {
                duration: 300,
                easing: Easing.in(Easing.cubic),
            });
            translateY.value = withTiming(1000, {
                duration: 300,
                easing: Easing.in(Easing.cubic),
            }, () => {
                runOnJS(setIsModalVisible)(false);
            });
        }
    }, [visible, opacityAnim, translateY]);

    if (!isModalVisible) {
        return null;
    }

    return (
        <RNModal visible={isModalVisible} transparent animationType="none" onRequestClose={handleClose}>
            <Animated.View style={[commonStyles.flex1, commonStyles.rowCenter, { backgroundColor: finalOverlay }, overlayStyle]}>
                <Animated.View style={[styles.container, { backgroundColor: finalBg }, animatedContainerStyle]}>
                    <View style={[styles.bodyWrapper, {borderBottomColor: theme.cardDivide}]}>
                        {title ? <Text style={[styles.title, { color: finalTitle }]}>{title}</Text> : null}
                        <View >
                            {typeof children === 'string' ? (
                                <Text style={[styles.bodyText, { color: finalText }]}>{children}</Text>
                            ) : (children)}
                        </View>
                    </View>
                    <View style={[styles.footer, commonStyles.rowEnd]}>
                        {!hideCancel && <TouchableOpacity onPress={onClose}><Text style={[styles.footerText, {color: theme.secondaryText}]}>{_cancelText}</Text></TouchableOpacity>}
                        {<TouchableOpacity onPress={onConfirm}><Text style={[styles.footerText, {color: theme.primaryText}]}>{_confirmText}</Text></TouchableOpacity>}
                    </View>
                </Animated.View>
            </Animated.View>
        </RNModal>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        borderRadius: ms(15),
        overflow: 'hidden',
        borderWidth: ms(1),
    },
    bodyWrapper: {
        width: '100%',
        borderBottomWidth: ms(1),
        padding: ms(15)
    },
    title: {
        fontSize: ms(18),
        fontWeight: 500,
        marginBottom: ms(12),
    },
    bodyText: {
        fontSize: ms(15),
        lineHeight: ms(22),
    },
    footer: {
        padding: ms(15),
        gap: ms(30),
        width: '100%',
    },
    footerText: {
        fontSize: ms(18),
        lineHeight: ms(18)
    }
});
