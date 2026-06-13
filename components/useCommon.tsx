
import { NativeStackHeaderBackProps, NativeStackNavigationOptions, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { IconBack } from "./iconfont";
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
            <IconBack color={theme.header.text} size={24} />
        </TouchableOpacity>
    };
    return {
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: theme.header.text,
        headerStyle,
        headerLeft,
        ...otherProps,
    }
}