import { useHeaderOption } from "@/components/useCommon";
import { NativeStackNavigationOptions, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { OTCHeaderRight } from "./OTC";
import { HomeSearchPageHeader } from "./search";

export default function HomeLayout() {
    const headerOption = useHeaderOption()
    const { t } = useTranslation("home")

    const screenMap: Array<{ name: string, options?: NativeStackNavigationOptions }> = [
        { name: 'search', options: { headerTitle: HomeSearchPageHeader } },
        { name: 'OTC', options: { title: t('category.OTC'), headerRight: OTCHeaderRight } }
    ]
    return (
        <Stack screenOptions={headerOption}>
            {screenMap.map(screen => <Stack.Screen key={screen.name} {...screen} />)}
        </Stack>
    )
}