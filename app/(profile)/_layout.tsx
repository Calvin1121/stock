import { useHeaderOption } from "@/components/useCommon";
import { NativeStackNavigationOptions, Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ProfileLayout() {
    const headerOption = useHeaderOption()
    const { t } = useTranslation("profile")

    const screenMap: Array<{ name: string, options?: NativeStackNavigationOptions }> = [
        { name: 'lang', options: { title: t('lang') } },
        { name: 'about-us', options: { title: t('links.aboutUs')}},
        { name: 'change-pwd', options: { title: t('changePWD.title')}},
        { name: 'verification', options: { title: t('verifications.title')}},
        { name: 'service', options: { title: t('services.title')}}
    ]
    return (
        <Stack screenOptions={headerOption}>
            {screenMap.map(screen => <Stack.Screen key={screen.name} {...screen} />)}
        </Stack>
    )
}