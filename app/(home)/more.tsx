import { SafeAreaView, ScrollView } from "@/components/ThemeWidget"
import { SearchBar } from "@/components/ui"
import { Empty } from "@/components/ui/empty"
import StockItem from "@/components/ui/stock-item"
import { ThemeType } from "@/constants/Colors"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { StockField } from "@/utils/consts"
import React, { useMemo, useState } from "react"
import { StyleSheet, View } from "react-native"
import { ms } from "react-native-size-matters"

export default function HomeMorePage() {
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
    const isEmpty = useMemo(() => mockData?.length === 0, [mockData])
    const fields = Object.keys(StockField) as StockField[]
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    return <SafeAreaView>
        <ScrollView style={styles.container}>
            {isEmpty && <Empty />}
            {!isEmpty && mockData.map((item, index) => {
                return <View key={index} style={[commonStyles.rowBetween, styles.mainSegment, styles.divideBorder]}>
                    {fields.map((field, m_index) => <React.Fragment key={`${index}_${field}_${m_index}`}><StockItem mainKey={field} {...item} /></React.Fragment>)}
                </View>
            })}
        </ScrollView>
    </SafeAreaView>
}
function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: ms(15),
            paddingBottom: ms(15)
        },
        mainSegment: {
            paddingVertical: ms(10),
        },
        divideBorder: {
            borderBottomWidth: ms(1),
            borderBottomColor: theme.cardDivide
        },
    })
}
export function HomeMoreSearchPageHeader() {
    const [keyword, setKeyword] = useState('')
    return <View style={{ paddingRight: ms(15), paddingLeft: ms(10) }}>
        <SearchBar onChangeText={setKeyword} value={keyword} autoFocus />
    </View>
}