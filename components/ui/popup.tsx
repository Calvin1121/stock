import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    Modal,
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { ms, s, vs } from 'react-native-size-matters';
import { TouchableOpacity } from '../ThemeWidget';

export interface PopupProps {
    visible: boolean;
    title?: string;
    close?: React.ReactNode | (() => React.ReactNode);
    children?: React.ReactNode;
    footer?: React.ReactNode;
    onClose?: () => void;
    backgroundColor?: string;
    overlayColor?: string;
    dragHandler?: boolean;
    enableGestureClose?: boolean
}

export function Popup({
    visible,
    title,
    close,
    children,
    footer,
    onClose,
    backgroundColor,
    overlayColor,
    dragHandler = false,
    enableGestureClose = true,
}: PopupProps) {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const [isModalVisible, setIsModalVisible] = useState(visible);
    const translateY = useSharedValue(visible ? 0 : 1000);
    const opacityAnim = useSharedValue(visible ? 1 : 0);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => enableGestureClose,
            onMoveShouldSetPanResponder: (_, { dy }) => enableGestureClose && Math.abs(dy) > 10,
            onPanResponderMove: (_, { dy }) => {
                if (enableGestureClose && dy > 0) {
                    translateY.value = dy;
                }
            },
            onPanResponderRelease: (_, { dy, vy }) => {
                if (enableGestureClose && (dy > 50 || vy > 0.5)) {
                    opacityAnim.value = withTiming(0, {
                        duration: 300,
                        easing: Easing.in(Easing.cubic),
                    });
                    translateY.value = withTiming(1000, {
                        duration: 300,
                        easing: Easing.in(Easing.cubic),
                    }, () => {
                        runOnJS(handleClose)();
                    });
                } else {
                    translateY.value = withTiming(0, {
                        duration: 300,
                        easing: Easing.out(Easing.cubic),
                    });
                }
            },
        })
    ).current;

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: opacityAnim.value,
    }));

    const finalBgColor = backgroundColor || theme.background;
    const finalOverlayColor = overlayColor || theme.overlayBackground;

    const handleClose = () => {
        onClose?.();
    };

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

    const renderClose = () => {
        if (!close) return null;
        const content = typeof close === 'function' ? close() : close;
        return (
            <TouchableOpacity activeOpacity={theme.touchOpacity} onPress={handleClose}>
                {content}
            </TouchableOpacity>
        );
    };

    const titleNode = title ? <Text style={[styles.title]}>{title}</Text> : null;

    return (
        <Modal visible={isModalVisible} transparent animationType="none" onRequestClose={handleClose}>
            <Animated.View style={[commonStyles.flex1, commonStyles.justifyEnd, { backgroundColor: finalOverlayColor }, overlayStyle]}>
                <TouchableOpacity activeOpacity={1} style={commonStyles.flex1} onPress={handleClose} />
                <Animated.View style={[styles.container, { backgroundColor: finalBgColor }, animatedStyle]} {...panResponder.panHandlers}>
                    {dragHandler && (
                        <View style={styles.handleContainer}>
                            <View style={[styles.dragHandle, { backgroundColor: theme.backgroundDivide }]} />
                        </View>
                    )}

                    <View style={styles.header}>
                        {titleNode}
                        <View style={styles.closeWrapper}>{renderClose()}</View>
                    </View>

                    <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
                        {children}
                    </ScrollView>

                    {footer ? <View style={styles.footer}>{footer}</View> : null}
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        container: {
            paddingBottom: ms(20),
            borderTopLeftRadius: ms(16),
            borderTopRightRadius: ms(16),
            overflow: 'hidden',
            maxHeight: Dimensions.get('window').height * 0.9,
        },
        handleContainer: {
            alignItems: 'center',
            paddingVertical: ms(12),
        },
        dragHandle: {
            width: s(32),
            height: vs(4),
            borderRadius: ms(2),
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: ms(15)
        },
        title: {
            flex: 1,
            fontSize: ms(16),
            fontWeight: '600',
            color: theme.primaryText,
        },
        closeWrapper: {
            marginLeft: ms(10),
        },
        body: {
            paddingHorizontal: ms(16),
            minHeight: ms(120),
            maxHeight: Dimensions.get('window').height * 0.9,
        },
        bodyContent: {
        },
        footer: {
            paddingHorizontal: ms(16),
            paddingTop: ms(15),
        },
    });
}
