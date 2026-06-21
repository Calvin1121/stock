import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import React from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { ms } from "react-native-size-matters"

interface Props {
    text?: string
    children?: React.ReactNode
}
export const Divider = (props: Props) => {
    const { t } = useTranslation('divider')
    const { theme } = useTheme()
    const lineStyle = {width: ms(25), height: ms(1), backgroundColor: theme.secondaryText}
    return <View style={{paddingVertical: ms(15)}}>
        {props.children || <View style={{...commonStyles.rowCenter, gap: ms(10)}}>
            <View style={lineStyle} />
            <Text style={{color: theme.secondaryText, fontSize: ms(13)}}>{props.text || t('text')}</Text>
            <View style={lineStyle} />
        </View>}
    </View>
}