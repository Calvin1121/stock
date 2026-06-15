
import { NativeStackHeaderBackProps, NativeStackNavigationOptions, useRouter } from "expo-router";
import { ColorValue, Text } from "react-native";
import { ms } from "react-native-size-matters";
import { useUnistyles } from "react-native-unistyles";
import { TouchableOpacity } from "./ThemeWidget";
import IconFont from "./iconfont";
export function useHeaderOption(props?: NativeStackNavigationOptions): NativeStackNavigationOptions {
    const { theme } = useUnistyles();
    const router = useRouter();
    const { headerStyle: _headerStyle, ...otherProps } = props || {};
    const headerStyle = {
        backgroundColor: theme.header.background,
        ..._headerStyle,
    };
    const headerLeft = (props: NativeStackHeaderBackProps) => {
        return <TouchableOpacity onPress={router.back} style={{ padding: 8 }}>
            <IconFont name="a-icon-48-Arrow-rightsvg" color={theme.header.text} size={24} />
        </TouchableOpacity>
    };
    const headerTitle = (props: {children: string;tintColor?: ColorValue}) => {
        return <Text style={{color: props.tintColor, fontWeight: '400', fontSize: ms(15)}}>{props.children}</Text>
    }
    return {
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: theme.header.text,
        headerStyle,
        headerTitle,
        headerLeft,
        ...otherProps,
    }
}