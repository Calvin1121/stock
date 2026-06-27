import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { ResultEnum } from '@/utils/consts';
import { memo, useMemo } from 'react';
import { ScrollView as DefaultScrollView, TouchableOpacity as DefaultTouchableOpacity, ScrollViewProps, StatusBar, StatusBarProps, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacityProps, View, ViewProps } from 'react-native';
import { ms, s } from 'react-native-size-matters';
import IconFont from './iconfont';
import { Button, ButtonProps } from './ui';

const mergeStyle = (base: any, style: any) => {
    const merged = { ...base };
    if (Array.isArray(style)) Object.assign(merged, StyleSheet.flatten(style));
    else Object.assign(merged, style);
    return merged;
};

export const ScrollView = memo((props: ScrollViewProps) => {
    const { theme } = useTheme();
    const { style: _style, ...otherProps } = props;
    const style = useMemo(() => mergeStyle({ ...commonStyles.flex1, backgroundColor: theme.background }, _style), [theme.background, _style]);
    return <DefaultScrollView style={style} {...otherProps} />;
});

export const SafeAreaView = memo((props: ViewProps & { statusBar?: StatusBarProps }) => {
    const { theme } = useTheme();
    const { style: _style, statusBar, ...otherProps } = props;
    const style = useMemo(() => mergeStyle({ ...commonStyles.flex1, backgroundColor: theme.background }, _style), [theme.background, _style]);

    return <>
        <StatusBar {...statusBar} />
        <View style={style} {...otherProps} />
        {/* <RNSafeAreaView style={style} {...otherProps} /> */}
    </>;
});

export const TouchableOpacity = memo((props: TouchableOpacityProps) => {
    const { theme } = useTheme();
    const { style: _style, ...otherProps } = props;
    const style = useMemo(() => mergeStyle({}, _style), [_style]);
    return <DefaultTouchableOpacity style={style} {...otherProps} activeOpacity={theme.touchOpacity} />;
});

export function VerifyCode(props: { title: string; onTap?: () => void; style?: StyleProp<TextStyle> }) {
    const { theme } = useTheme();

    return <TouchableOpacity onPress={props?.onTap}>
        <Text style={{ color: theme.primary, fontSize: ms(13), ...props.style }}>{props.title}</Text>
    </TouchableOpacity>
}

export const ResultWidget = memo((props: {
    resultType?: ResultEnum
    infoText?: string
    buttonText?: string
    color?: string
    buttonType?: ButtonProps['type']
    onTap?: () => void
}) => {
    const { resultType, infoText, buttonText, color, buttonType, onTap } = props;
    const isFail = resultType === ResultEnum.Fail
    const { theme } = useTheme()
    const iconColor = color ?? (isFail ? theme.error : theme.success)
    return <SafeAreaView>
        <ScrollView>
            {resultType && <View style={{ ...commonStyles.rowCenter, marginTop: ms(70) }}><IconFont color={iconColor} name={resultType as any} size={ms(100)} /></View>}
            {infoText && <View style={{ ...commonStyles.rowCenter, marginTop: ms(50) }}><Text style={{ color: theme.secondaryText }}>{infoText}</Text></View>}
            {buttonText && <View style={{ ...commonStyles.rowCenter, marginTop: ms(36) }}><Button onPress={onTap} style={{ width: s(150) }} type={buttonType} variant="outline">{buttonText}</Button></View>}
        </ScrollView>
    </SafeAreaView>
});