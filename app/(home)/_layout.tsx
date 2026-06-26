import { useHeaderOption } from "@/components/useCommon";
import { NativeStackNavigationOptions, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { LoanHeaderRight } from "./loan";
import { MarketHeader, MarketHeaderRight } from "./market";
import { HomeMoreSearchPageHeader } from "./more";
import { OTCHeaderRight } from "./OTC";
import { HomeSearchPageHeader } from "./search";

export default function HomeLayout() {
    const headerOption = useHeaderOption()
    const { t } = useTranslation("home")

    const screenMap: Array<{ name: string, options?: NativeStackNavigationOptions }> = [
        { name: 'search', options: { headerTitle: HomeSearchPageHeader } },
        { name: 'OTC', options: { title: t('category.OTC'), headerRight: OTCHeaderRight } },
        { name: 'OTC-detail', options: {title: t('OTC.detail.title')}},
        { name: 'more', options: { headerTitle: HomeMoreSearchPageHeader}},
        { name: 'market', options: { title: t('market.title'), headerRight: MarketHeaderRight, header: MarketHeader}},
        { name: 'loan', options: { title: t('loan.title'), headerRight: LoanHeaderRight}},
        { name: 'loan-history', options: {title: t('loanHistory.title')}}
    ]
    return (
        <Stack screenOptions={headerOption}>
            {screenMap.map(screen => <Stack.Screen key={screen.name} {...screen} />)}
        </Stack>
    )
}