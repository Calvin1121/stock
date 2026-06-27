import { ThemeType } from "@/constants/Colors"
import { useThemeStore } from "@/lib/themeStore"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, Text, View } from "react-native"
import { ms, vs } from "react-native-size-matters"
import IconFont, { IconNames } from "../iconfont"

interface Props {
    text?: string
    icon?: IconNames
    children?: React.ReactNode
}
export const Empty = (props: Props) => {
    const { t } = useTranslation('empty')
    const { theme } = useTheme()
    const themeName = useThemeStore(e => e.themeName)
    const styles = useMemo(() => createStyles(theme), [theme])
    // TODO
    const defaultIcon = `empty-dark` as IconNames
    return <View style={[commonStyles.columnCenter, styles.comtainer]}>
        {props.children || <View style={[commonStyles.columnCenter, {marginTop: vs(150)}]}>
            <IconFont size={ms(150)} name={defaultIcon} />
            <View><Text style={styles.text}>{t('text')}</Text></View>
        </View>}
    </View>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        comtainer: {
            flex: 1,
        },
        text: {
            color: theme.secondaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5)
        }
    })
}