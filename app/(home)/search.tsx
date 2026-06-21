import { SearchBar } from "@/components/ui/search-bar"
import { View } from "react-native"
import { ms } from "react-native-size-matters"

export default function HomeSearchPage() {
    return <></>
}

export function HomeSearchPageHeader() {
    return <View style={{paddingRight: ms(15), paddingLeft: ms(10)}}>
        <SearchBar autoFocus />
    </View>
}