import { useHeaderOption } from "@/components/useCommon";
import { NativeStackNavigationOptions, Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function HomeLayout() {
    const headerOption = useHeaderOption()
    const { t } = useTranslation("ipo")

    const screenMap: Array<{ name: string, options?: NativeStackNavigationOptions }> = [
        { name: 'subscribe', options: { title: t('subscribe.title') } },
        { name: 'history', options: { title: t('history.title') } },
        { name: 'history-detail', options: { title: t('historyDetail.title') } },
    ]
    return (
        <Stack screenOptions={headerOption}>
            {screenMap.map(screen => <Stack.Screen key={screen.name} {...screen} />)}
        </Stack>
    )
}