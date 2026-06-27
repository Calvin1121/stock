import { useHeaderOption } from "@/components/useCommon";
import { NativeStackNavigationOptions, Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function NewsLayout() {
    const headerOption = useHeaderOption()
    const { t } = useTranslation("news")

    const screenMap: Array<{ name: string, options?: NativeStackNavigationOptions }> = [
        { name: 'detail', options: { title: t('detial.title') } },
    ]
    return (
        <Stack screenOptions={headerOption}>
            {screenMap.map(screen => <Stack.Screen key={screen.name} {...screen} />)}
        </Stack>
    )
}