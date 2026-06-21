import { HomeTab } from "@/app/(tabs)/home";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms, s, vs } from "react-native-size-matters";
import { TouchableOpacity } from "../ThemeWidget";
import IconFont from "../iconfont";
import { Button } from "../ui";
import MiniSparkline from "../ui/mini-spark-line";


export enum Category {
    OTC = 'OTC',
    blockTrade = 'blockTrade',
    preMarket = 'preMarket',
    creditLoan = 'creditLoan'
}

export enum Main {
    symbol = 'symbol',
    price = 'price',
    chg = 'chg'
}

interface Props {
    tab: HomeTab
}

export default function HomeContent(props: Props) {
    const { tab } = props
    const { t } = useTranslation('home');
    const { theme } = useTheme()
    const data = [
        100,
        120,
        110,
        140,
        130,
        125,
        150,
        145,
        155,
        135,
        120,
        140,
    ]
    const snapshots = [
        { name: 'TOPIX 1000 IN TOPIX 1000 IN', price: '3529.39', trend: '+0.00', change: '+0.00%' },
        { name: 'TOPIX 1000 IN...', price: '3529.39', trend: '+0.00', change: '+0.00%' },
        { name: 'TOPIX 1000 IN...', price: '3529.39', trend: '+0.00', change: '+0.00%' }
    ]
    const categories = Object.keys(Category).map(key => ({ value: key as Category, label: `category.${key}` }))
    const isUSS = tab === HomeTab.USS
    const styles = useMemo(() => createStyles(theme), [theme])
    const mains = Object.keys(Main).map(key => ({ value: key as Main, label: `mains.${key}` }))
    const getColStyle = useCallback((key: Main) => {
        return key === Main.symbol ? { flex: 1.5, ...commonStyles.rowStart } :
            [commonStyles.flex1, key === Main.chg ? commonStyles.rowEnd : commonStyles.rowCenter]
    }, [])
    const mockData = [
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' }, { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' }, { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' }, { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '-30.65', trend: '-3.33', change: '-1.53%' }, { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '30.65', trend: '-3.33', change: '-1.53%' }, { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '209.95', trend: '45.21', change: '+21.53%' },
        { text: 'Eunisell Interlinked...', subText: 'Eunisell Interlinked Plc', price: '-30.65', trend: '-3.33', change: '-1.53%' }
    ]
    const onTabTap = (value: Category) => {
        switch(value) {
            case Category.OTC:
                router.push('/(home)/OTC')
        }
    }
    return <>
        {isUSS && <View style={[styles.snapshots, commonStyles.rowCenter]}>
            {snapshots.map((snapshot, index) => {
                const _price = Number(snapshot.price)
                const _trend = Number(snapshot.trend)
                const _change = parseFloat(snapshot.change)
                const priceStyle = _price < 0 ? styles.downStyle : styles.upStyle
                const trendStyle = _trend < 0 ? styles.downStyle : styles.upStyle
                const changeStyle = _change < 0 ? styles.downStyle : styles.upStyle

                return <View style={[commonStyles.flex1, styles.snapshot]} key={index}>
                    <View style={[styles.snapshotName]}><Text style={[styles.snapshotNameText]} numberOfLines={1}>{snapshot.name}</Text></View>
                    <View style={[commonStyles.alignCenter]}><Text style={[styles.snapshotPrice, priceStyle]}>{snapshot.price}</Text></View>
                    <View style={[commonStyles.rowCenter]}>
                        <Text style={[styles.snapshotTrendChange, trendStyle]}>{snapshot.trend}</Text>
                        <Text style={[styles.snapshotTrendChange, changeStyle]}>{snapshot.change}</Text>
                    </View>
                    <MiniSparkline color={!index ? styles.downStyle.color : styles.upStyle.color} width={s(105)} height={vs(33)} data={data} />
                </View>
            })}
        </View>}
        <View style={[commonStyles.flex1, commonStyles.flexRow, styles.categories]}>
            {categories.map(category => <View style={[commonStyles.columnCenter, commonStyles.flex1]} key={category.value}>
                <TouchableOpacity onPress={() => onTabTap(category.value)} style={commonStyles.columnCenter}>
                    <View style={styles.categoryIcon} />
                    <Text style={styles.categoryText}>{t(category.label)}</Text>
                </TouchableOpacity>
            </View>)}
        </View>
        <View style={[styles.main]}>
            <View style={[commonStyles.rowBetween, commonStyles.mainLayoutPadding]}>
                <View style={commonStyles.rowCenter}>
                    <Text style={styles.mainTitleText}>{t('title')}</Text>
                    {/* <LinearGradient /> */}
                </View>
                <View>
                    <TouchableOpacity style={commonStyles.rowCenter}>
                        <Text style={styles.mainTitleMoreText}>{t('more')}</Text>
                        <IconFont color={styles.mainTitleMoreText.color} size={18} name="icon-32-arrow-left" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.mainContent}>
                <View style={[commonStyles.rowBetween, styles.mainSegment, styles.divideBorder]}>
                    {mains.map((main) => {
                        const itemStyle = getColStyle(main.value)
                        return <View style={itemStyle} key={main.value}><Text style={styles.mainSegmentText}>{t(main.label)}</Text></View>
                    })}
                </View>
                <View style={commonStyles.flex1}>
                    {mockData.map((item, index) => {
                        return <View key={index} style={[commonStyles.rowBetween, styles.mainSegment, index === mockData?.length - 1 ? null : styles.divideBorder]}>
                            {mains.map((main, m_index) => {
                                const itemStyle = getColStyle(main.value)
                                const _price = Number(item.price)
                                const _trend = Number(item.trend)
                                const _change = parseFloat(item.change)
                                const priceStyle = _price < 0 ? styles.downStyle : styles.upStyle
                                const isTrendDown = _trend < 0
                                const trendStyle = isTrendDown ? styles.downStyle : styles.upStyle
                                const changeType = _change > 0 ? 'success' : _change < 0 ? 'danger' : 'info'
                                return <React.Fragment key={`${index}_${main.value}_${m_index}`}>
                                    {main.value === Main.symbol && <View style={[itemStyle, commonStyles.columnStart]}>
                                        <Text style={[styles.textStyle, styles.symbolTextStyle]}>{item.text}</Text>
                                        <Text style={[styles.subTextStyle, styles.symbolSubTextStyle]}>{item.subText}</Text>
                                    </View>}
                                    {main.value === Main.price && <View style={[itemStyle, commonStyles.columnCenter]}>
                                        <Text style={[styles.textStyle, priceStyle]}>{item.price}</Text>
                                        <View style={commonStyles.rowCenter}>
                                            <IconFont style={isTrendDown ? styles.downRotate : null} size={8} color={trendStyle.color} name='icon-16-triangle' />
                                            <Text>{'\u00A0'}</Text>
                                            <Text style={[styles.subTextStyle, trendStyle]}>{item.trend}</Text>
                                        </View>
                                    </View>}
                                    {main.value === Main.chg && <View style={[itemStyle]}>
                                        <Button textStyle={styles.changeTagText} style={styles.changeTag} type={changeType}>{item.change}</Button>
                                    </View>}
                                </React.Fragment>
                            })}
                        </View>
                    })}
                </View>
            </View>
        </View>
    </>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        snapshots: {
            padding: ms(15),
            gap: ms(12),
        },
        snapshot: {
            backgroundColor: theme.snapCard,
            borderRadius: ms(4),
            paddingBottom: ms(8),
            overflow: 'hidden'
        },
        snapshotName: {
            padding: ms(10),
        },
        snapshotNameText: {
            color: theme.primaryText,
            fontSize: ms(13),
            lineHeight: ms(17.5)
        },
        snapshotPrice: {
            fontSize: ms(18),
            lineHeight: ms(25),
            marginBottom: ms(2)
        },
        snapshotTrendChange: {
            fontSize: ms(10),
            lineHeight: ms(13.5),
            marginBottom: ms(15)
        },
        categories: {
            paddingVertical: ms(15)
        },
        categoryIcon: {
            width: 32,
            height: 32,
            backgroundColor: '#41D6F5',
            borderRadius: 5
        },
        categoryText: {
            color: theme.primaryText,
            marginTop: ms(7),
            fontSize: ms(10)
        },
        main: {
            paddingVertical: ms(15)
        },
        mainTitleBorder: {
        },
        mainTitleText: {
            color: theme.primaryText,
            fontSize: ms(18),
            lineHeight: ms(25)
        },
        mainTitleMoreText: {
            color: theme.secondaryText,
            fontSize: ms(15),
            lineHeight: ms(21)
        },
        mainContent: {
            backgroundColor: theme.card,
            borderRadius: ms(25),
            paddingHorizontal: ms(15)
        },
        divideBorder: {
            borderBottomWidth: ms(1),
            borderBottomColor: theme.cardDivide
        },
        mainSegment: {
            paddingVertical: ms(10),
        },
        mainSegmentText: {
            color: theme.secondaryText,
            fontSize: ms(11),
            lineHeight: ms(15)
        },
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
        commonStyle: {
            color: theme.secondaryText
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