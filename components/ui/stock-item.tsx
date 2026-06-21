import { Main } from "@/app/(tabs)/home"
import { ThemeType } from "@/constants/Colors"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import React, { useCallback, useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ms, vs } from "react-native-size-matters"
import IconFont from "../iconfont"
import { Button } from "./button"

interface StockItemProps {
    mainKey: Main
    price: string
    trend: string
    change: string
    text: string
    subText: string
}

export default function StockItem(props: StockItemProps) {
    const getColStyle = useCallback((key: Main) => {
        return key === Main.symbol ? { flex: 1.5, ...commonStyles.rowStart } :
            [commonStyles.flex1, key === Main.chg ? commonStyles.rowEnd : commonStyles.rowCenter]
    }, [])
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const itemStyle = getColStyle(props.mainKey)
    const _price = Number(props.price)
    const _trend = Number(props.trend)
    const _change = parseFloat(props.change)
    const priceStyle = _price < 0 ? styles.downStyle : styles.upStyle
    const isTrendDown = _trend < 0
    const trendStyle = isTrendDown ? styles.downStyle : styles.upStyle
    const changeType = _change > 0 ? 'success' : _change < 0 ? 'danger' : 'info'
    return <React.Fragment>
        {props.mainKey === Main.symbol && <View style={[itemStyle, commonStyles.columnStart]}>
            <Text style={[styles.textStyle, styles.symbolTextStyle]}>{props.text}</Text>
            <Text style={[styles.subTextStyle, styles.symbolSubTextStyle]}>{props.subText}</Text>
        </View>}
        {props.mainKey === Main.price && <View style={[itemStyle, commonStyles.columnCenter]}>
            <Text style={[styles.textStyle, priceStyle]}>{props.price}</Text>
            <View style={commonStyles.rowCenter}>
                <IconFont style={isTrendDown ? styles.downRotate : null} size={8} color={trendStyle.color} name='icon-16-triangle' />
                <Text>{'\u00A0'}</Text>
                <Text style={[styles.subTextStyle, trendStyle]}>{props.trend}</Text>
            </View>
        </View>}
        {props.mainKey === Main.chg && <View style={[itemStyle]}>
            <Button textStyle={styles.changeTagText} style={styles.changeTag} type={changeType}>{props.change}</Button>
        </View>}
    </React.Fragment>
}


function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        textStyle: {
            fontSize: ms(15),
            lineHeight: ms(21),
            marginBottom: ms(2.5)
        },
        subTextStyle: {
            fontSize: ms(13),
            lineHeight: ms(17.5)
        },
        symbolTextStyle: {
            color: theme.primaryText
        },
        symbolSubTextStyle: {
            color: theme.secondaryText
        },
        upStyle: {
            color: theme.success
        },
        downStyle: {
            color: theme.error
        },
        downRotate: {
            transform: [
                { rotate: '180deg' }
            ]
        },
        changeTag: {
            height: vs(24),
            paddingHorizontal: ms(4),
            borderRadius: ms(2)
        },
        changeTagText: {
            fontSize: ms(15)
        }
    })
}