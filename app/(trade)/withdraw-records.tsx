import { SafeAreaView, ScrollView, TouchableOpacity } from "@/components/ThemeWidget";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { router } from "expo-router";
import { get } from "lodash";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function WithdrawRecordsPage() {
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const statusMap = {
        success: theme.success,
        confirming: theme.primary,
        reviewing: theme.warning,
        error: theme.error
    }

    return <SafeAreaView>
        <ScrollView>
            <View style={styles.listContent}>{new Array(5).fill(0).map((_, index) =>
                <TouchableOpacity onPress={() => router.push({ pathname: '/(trade)/withdraw-record' })} key={index}>
                    <View style={[styles.listItem]}>
                        <View style={[commonStyles.rowBetween]}>
                            <Text style={[styles.tradeName]}>提币（USDT）</Text>
                            <Text style={[styles.status, { color: get(statusMap, 'success') }]}>成功</Text>
                        </View>
                        <View style={[commonStyles.rowBetween]}>
                            <Text style={[styles.tradeAmount]}>100.00000000</Text>
                            <Text style={[styles.tradeDate]}>10:20 10/15</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}</View>
        </ScrollView>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        listContent: {
            paddingHorizontal: ms(15)
        },
        listItem: {
            paddingVertical: ms(15),
            borderBottomColor: theme.backgroundDivide,
            borderBottomWidth: ms(1),
            gap: ms(15)
        },
        tradeName: {
            fontSize: ms(15),
            lineHeight: ms(21),
            color: theme.primaryText
        },
        tradeAmount: {
            fontSize: ms(18),
            lineHeight: ms(25),
            color: theme.primaryText,
            flex: 1,
            flexShrink: 1,
            paddingRight: ms(15)
        },
        tradeDate: {
            fontSize: ms(15),
            lineHeight: ms(21),
            color: theme.secondaryText,
            paddingLeft: ms(15)
        },
        status: {
            fontSize: ms(15),
            lineHeight: ms(21),
        }

    })
}
