import { useHeaderOption } from "@/components/useCommon";
import { NativeStackNavigationOptions, Stack } from "expo-router";
import { HomeSearchPageHeader } from "./search";

export default function HomeLayout() {
    const headerOption = useHeaderOption()
    const screenMap: Array<{ name: string, options?: NativeStackNavigationOptions }> = [
        { name: 'search', options: { headerTitle: HomeSearchPageHeader } },
    ]
    return (
        <Stack screenOptions={headerOption}>
            {screenMap.map(screen => <Stack.Screen key={screen.name} {...screen} />)}
        </Stack>
    )
}