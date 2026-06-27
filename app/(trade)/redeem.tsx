import IconFont from "@/components/iconfont"
import { SafeAreaView, ScrollView } from "@/components/ThemeWidget"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { useTranslation } from "react-i18next"
import { TouchableOpacity, View } from "react-native"
import { ms } from "react-native-size-matters"

export default function RedeemPage() {
    const { theme } = useTheme()
    const { t } = useTranslation('assets')
    return <SafeAreaView>
        <ScrollView style={[commonStyles.flex1]}>
            <View></View>
        </ScrollView>
        
    </SafeAreaView>
}

export const RedeemHeaderRight = () => {
    const { theme } = useTheme()
    return <View style={[commonStyles.alignEnd]}>
        <TouchableOpacity style={{ marginRight: ms(15) }}>
            <IconFont color={theme.primaryText} size={ms(29)} name="a-icon-48-Historicalrecords" />
        </TouchableOpacity>
    </View>
}