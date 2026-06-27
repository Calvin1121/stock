import IconFont from "@/components/iconfont"
import { useTheme } from "@/lib/useTheme"
import { commonStyles } from "@/styles/util"
import { TouchableOpacity, View } from "react-native"
import { ms } from "react-native-size-matters"

export default function WithdrawLayout() {
    return <></>
}

export const WithdrawHeaderRight = () => {
    const { theme } = useTheme()
    return <View style={[commonStyles.alignEnd]}>
        <TouchableOpacity style={{ marginRight: ms(15) }}>
            <IconFont color={theme.primaryText} size={ms(29)} name="a-icon-48-Historicalrecords" />
        </TouchableOpacity>
    </View>
}