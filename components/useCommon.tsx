
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { HeaderHeight } from "@/utils/consts";
import { NativeStackHeaderBackProps, NativeStackHeaderProps, NativeStackNavigationOptions, useRouter } from "expo-router";
import { get } from "lodash";
import { Text, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import { TouchableOpacity } from "./ThemeWidget";
import IconFont from "./iconfont";

export function Header(props: NativeStackHeaderProps): React.ReactNode {
    const { top } = useSafeAreaInsets();
    const { navigation: { canGoBack: canGoBackFn, goBack }, options = {}, back } = props;
    const canGoBack = canGoBackFn?.()
    const { headerLeft, headerRight, headerTintColor: tintColor, headerStyle, title, headerTitle, headerTitleAlign } = options
    const backgroundColor = get(headerStyle, 'backgroundColor')
    const _headerLeft = headerLeft?.({ canGoBack, tintColor, backgroundColor, ...back }) ?? null;
    const _headerRight = headerRight?.({ canGoBack, tintColor, backgroundColor, ...back }) ?? null;
    const isHeaderFunction = headerTitle instanceof Function
    const _title = (isHeaderFunction ? headerTitle?.({ tintColor, children: title || '' }) : headerTitle) || title || ''
    const isTitleNode = _title instanceof Object && !(_title instanceof String)
    const hasTitle = !!_title;
    const height = HeaderHeight + top;
    const isCenter = headerTitleAlign === 'center'
    const flexStyle: ViewStyle = { maxWidth: '33%', flex: 1 };
    const leftStyle = { ...flexStyle };
    const rightStyle = { ...flexStyle };
    const titleStyle: ViewStyle = { ...flexStyle, alignItems: !isCenter ? 'flex-start' : headerTitleAlign }
    return <>
        <View style={{ backgroundColor, paddingTop: top, height }}>
            <View style={[commonStyles.rowBetween]}>
                <View style={{ ...leftStyle }}>
                    {canGoBack && _headerLeft}
                </View>
                {_title && <View style={{ ...titleStyle }}>
                    {isTitleNode ? _title : <Text style={{ color: tintColor, fontSize: ms(15) }}>{_title}</Text>}
                </View>}
                <View style={{ ...rightStyle }}>{_headerRight}</View>
            </View>

        </View>
    </>
}

export function useHeaderOption(props?: NativeStackNavigationOptions): NativeStackNavigationOptions {
    const { theme } = useTheme();
    const router = useRouter();
    const { headerStyle: _headerStyle, ...otherProps } = props || {};
    const headerStyle = {
        backgroundColor: theme.header.background,
        ..._headerStyle,
    };
    const headerLeft = (props: NativeStackHeaderBackProps) => {
        return <TouchableOpacity onPress={router.back} style={[commonStyles.rowCenter, { height: '100%' }]}>
            <IconFont style={{ marginLeft: ms(20) }} name="a-icon-48-Arrow-rightsvg" color={theme.header.text} size={24} />
        </TouchableOpacity>
    };
    return {
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: theme.header.text,
        headerStyle,
        headerLeft,
        header: props?.header ?? Header,
        headerTransparent: false,
        ...otherProps,
    }
}