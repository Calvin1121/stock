import IconFont from "@/components/iconfont";
import { SafeAreaView, TouchableOpacity } from "@/components/ThemeWidget";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { get } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms, s } from "react-native-size-matters";

export default function AboutUsPage() {
    const { i18n, t } = useTranslation('profile')
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const langMap = useMemo(() => i18n.getResourceBundle(i18n.language, 'profile'), [i18n])
    const linksKey = useMemo(() => Object.keys(get(langMap, 'aboutUs.links') || {}), [langMap])

    return <SafeAreaView>
        <View>
            <View style={[styles.logoAndVer, commonStyles.secondaryLayoutPadding, commonStyles.columnCenter]}>
                <View style={[styles.logo]}></View>
                <Text style={[styles.verText]}>版本V1.0.0</Text>
            </View>
            <View style={[styles.links]}>
                {linksKey.map((key) => <TouchableOpacity style={[styles.link, commonStyles.rowCenter]} key={key}>
                    <View style={[commonStyles.flex1]}><Text style={[styles.linkText]}>{t(`aboutUs.links.${key}`)}</Text></View>
                    <IconFont color={theme.secondaryText} size={ms(22)} name='icon-32-arrow-left' />
                </TouchableOpacity>)}
            </View>
        </View>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        logoAndVer: {
            gap: ms(15)
        },
        logo: {
            width: s(75),
            height: s(75),
            backgroundColor: '#fff'
        },
        verText: {
            fontSize: ms(13),
            lineHeight: ms(17.5),
            color: theme.info
        },
        links: {
            marginBottom: ms(15)
        },
        link: {
            padding: ms(15),
            gap: ms(10),
            borderBottomWidth: ms(1),
            borderBottomColor: theme.backgroundDivide
        },
        linkText: {
            fontSize: ms(14),
            lineHeight: ms(19.5),
            color: theme.secondaryText
        }
    })
}