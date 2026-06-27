
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { HeaderHeight } from "@/utils/consts";
import { NativeStackHeaderBackProps, NativeStackHeaderProps, NativeStackNavigationOptions, router, useRouter } from "expo-router";
import { get } from "lodash";
import { useCallback } from "react";
import { Linking, Text, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import { TouchableOpacity } from "./ThemeWidget";
import IconFont from "./iconfont";

export type CustomHeaderProps = Partial<NativeStackHeaderProps>

export function Header(props: CustomHeaderProps): React.ReactNode {
    const { top } = useSafeAreaInsets();
    const { navigation: { canGoBack: canGoBackFn, } = {}, options = {} } = props;
    const back = get(props, 'back') || {}
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
    const leftStyle: ViewStyle = hasTitle && !isTitleNode ? commonStyles.flex1 : {};
    const rightStyle: ViewStyle = hasTitle && !isTitleNode ? commonStyles.flex1 : {};
    const titleStyle: ViewStyle = isTitleNode ? { flex: 1 } : { flex: 2, alignItems: !isCenter ? 'flex-start' : headerTitleAlign }
    return <>
        <View style={{ backgroundColor, paddingTop: top, height }}>
            <View style={[commonStyles.rowBetween, commonStyles.flex1]}>
                <View style={{ ...leftStyle }}>
                    {_headerLeft}
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
        return <View style={{ paddingLeft: ms(20) }}>
            <TouchableOpacity onPress={router.back} style={[commonStyles.rowStart, { height: '100%' }]}>
                <IconFont name="a-icon-48-Arrow-rightsvg" color={theme.header.text} size={24} />
            </TouchableOpacity>
        </View>
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

export function useMarkdownLink() {
    const tabLink = ['/home', '/ipo', '/news', '/profile', '/assets', '(tabs)']
    const onLinkPress = useCallback((url: string) => {
        if (url.startsWith('/') && tabLink.includes(url)) {
            router.dismissAll()
            router.replace({ pathname: url as any })
            return
        }
        if (url.startsWith('/')) {
            router.push({ pathname: url as any })
            return
        }
        Linking.openURL(url)
    }, [])
    return { onLinkPress }
}