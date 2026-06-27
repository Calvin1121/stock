import { SafeAreaView, ScrollView } from "@/components/ThemeWidget"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { useTranslation } from "react-i18next"
import { View } from "react-native"

export default function RecordsPage() {
    const { theme } = useTheme()
    const { t } = useTranslation('assets')
    return <SafeAreaView>
        <ScrollView style={[commonStyles.flex1]}>
            <View></View>
        </ScrollView>
        
    </SafeAreaView>
}