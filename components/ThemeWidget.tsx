import { Text as DefaultText, View as DefaultView, ScrollViewProps, TextProps, ViewProps } from 'react-native';
import { useUnistyles } from "react-native-unistyles";


export function View(props: ViewProps) {
    const { theme } = useUnistyles();
    const { style: _style, ...otherProps } = props;
    const style = {
        ..._style,
        backgroundColor: theme.background,
    }
    return <DefaultView style={style} {...otherProps} />;
}

export function Text(props: TextProps) {
    const { theme } = useUnistyles();
    const { style: _style, ...otherProps } = props;
    const style = {
        ..._style,
        color: theme.text,
    }
    return <DefaultText style={style} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
    const { theme } = useUnistyles();
    const { style: _style, ...otherProps } = props;
    const style = {
        ..._style,
        backgroundColor: theme.background,
    }
    return <DefaultView style={style} {...otherProps} />;
}

export function SafeAreaView(props: ViewProps) {
    const { theme } = useUnistyles();
    const { style: _style, ...otherProps } = props;
    const style = {
        ..._style,
        backgroundColor: theme.background,
    }
    return <DefaultView style={style} {...otherProps} />;
}