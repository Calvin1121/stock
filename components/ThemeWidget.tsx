import { commonStyles } from '@/styles/util';
import { ScrollView as DefaultScrollView, TouchableOpacity as DefaultTouchableOpacity, ScrollViewProps, StatusBar, StyleProp, Text, TextStyle, TouchableOpacityProps, ViewProps } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { ms } from 'react-native-size-matters';
import { useUnistyles } from "react-native-unistyles";

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