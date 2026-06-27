import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { useLayoutEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";
import { ScrollView, TouchableOpacity } from "../ThemeWidget";

interface Props {
    tabs: Array<{label: string; value: string}>
    tab: string
    onTab: (item: {label: string; value: string}) => void
}
export function ScrollTabs(props: Props) {
    const { tabs, tab, onTab } = props
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    useLayoutEffect(() => {
        if(!tab) onTab(tabs?.[0])
    }, [tab, tabs, onTab])
    return <View style={styles.tabs}>
        <ScrollView style={styles.tabsScrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.tabsWrapper}>
                {tabs.map((item, index) => <View style={[index ? styles.tab : null]} key={item.value}>
                    <TouchableOpacity onPress={() => onTab(item)}>
                        <Text style={[styles.tabText, item.value === tab ? styles.tabActiveText : null]}>{item.label}</Text>
                    </TouchableOpacity>
                </View>)}
            </View>
        </ScrollView>
    </View>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        tabs: {
            height: ms(45),
            paddingVertical: ms(7.5),
            overflow: 'hidden'
        },
        tab: {
            marginLeft: ms(30)
        },
        tabsScrollView: {
            ...commonStyles.flexRow,
            height: '100%',
        },
        tabsWrapper: {
            paddingHorizontal: ms(15),
            ...commonStyles.flexRow
        },
        tabText: {
            color: theme.secondaryText,
            fontSize: ms(18),
            lineHeight: ms(25)
        },
        tabActiveText: {
            color: theme.primary
        },
    })
}