
import { NativeStackNavigationOptions } from "expo-router";
import { useUnistyles } from "react-native-unistyles";
export function useHeaderOption(props?: NativeStackNavigationOptions): NativeStackNavigationOptions {
    const { theme } = useUnistyles();
    const { headerStyle: _headerStyle, ...otherProps } = props || {};
    const headerStyle = {
        backgroundColor: theme.headerBackground,
        ..._headerStyle,
    };
    // const headerLeft = (props: NativeStackHeaderBackProps) => {
    //     return <Ionicons name="chevron-back-sharp" size={24} color={props.tintColor} />
    // };
    return {
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: theme.headerText,
        headerStyle,
        // headerLeft,
        ...otherProps,
    }
}