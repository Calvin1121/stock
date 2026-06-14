import { commonStyles } from '@/styles/util';
import { ScrollView as DefaultScrollView, TouchableOpacity as DefaultTouchableOpacity, ScrollViewProps, StatusBar, TouchableOpacityProps, ViewProps } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
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
    return <DefaultTouchableOpacity style={style} {...otherProps} activeOpacity={theme.touchOpacity}  />
}