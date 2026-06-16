import { commonStyles } from '@/styles/util';
import { ResultEnum } from '@/utils/consts';
import { ScrollView as DefaultScrollView, TouchableOpacity as DefaultTouchableOpacity, ScrollViewProps, StatusBar, StyleProp, Text, TextStyle, TouchableOpacityProps, View, ViewProps } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { ms, s } from 'react-native-size-matters';
import { useUnistyles } from "react-native-unistyles";
import IconFont from './iconfont';
import { Button, ButtonProps } from './ui';

export function ScrollView(props: ScrollViewProps) {
    const { theme } = useUnistyles();
    const { style: _style, ...otherProps } = props;
    const style = {
        ...commonStyles.flex1,
        ...commonStyles.layoutPadding,
        backgroundColor: theme.background,
        ..._style,
    }
    return <DefaultScrollView style={style} {...otherProps} />;
}

export function SafeAreaView(props: ViewProps) {
    const { theme } = useUnistyles();
    const { style: _style, ...otherProps } = props;
    const style = {
        ..._style,
        ...commonStyles.flex1,
        backgroundColor: theme.background,
    }
    return <>
        <StatusBar />
        <RNSafeAreaView style={style} {...otherProps} />
    </>;
}

export function TouchableOpacity(props: TouchableOpacityProps) {
    const { theme } = useUnistyles();
    const { style: _style, ...otherProps } = props;
    const style = {
        ..._style,
    }
    return <DefaultTouchableOpacity style={style} {...otherProps} activeOpacity={theme.touchOpacity} />
}

export function VerifyCode(props: { title: string; onTap?: () => void; style?: StyleProp<TextStyle> }) {
    const { theme } = useUnistyles();

    return <TouchableOpacity onPress={props?.onTap}>
        <Text style={{ color: theme.primary, fontSize: ms(13), ...props.style }}>{props.title}</Text>
    </TouchableOpacity>
}

export function ResultWidget(props: {
    resultType?: ResultEnum
    infoText?: string
    buttonText?: string
    color?: string
    buttonType?: ButtonProps['type']
    onTap?: () => void
}) {
    const { resultType, infoText, buttonText, color, buttonType, onTap } = props;
    const isFail = resultType === ResultEnum.Fail
    const { theme } = useUnistyles()
    const iconColor = color ?? (isFail ? theme.error : theme.success)
    return <SafeAreaView>
        <ScrollView>
            {resultType && <View style={{ ...commonStyles.rowCenter, marginTop: ms(70) }}><IconFont color={iconColor} name={resultType as any} size={ms(100)} /></View>}
            {infoText && <View style={{ ...commonStyles.rowCenter, marginTop: ms(50) }}><Text style={{ color: theme.secondaryText }}>{infoText}</Text></View>}
            {buttonText && <View style={{ ...commonStyles.rowCenter, marginTop: ms(36) }}><Button onPress={onTap} style={{ width: s(150) }} type={buttonType} variant="outline">{buttonText}</Button></View>}
        </ScrollView>
    </SafeAreaView>
}