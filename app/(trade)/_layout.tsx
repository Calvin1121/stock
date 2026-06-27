import { useHeaderOption } from "@/components/useCommon";
import { NativeStackNavigationOptions, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { RedeemHeaderRight } from "./redeem";
import { WithdrawHeaderRight } from "./withdraw";

export default function TradeLayout() {
    const headerOption = useHeaderOption()
    const { t } = useTranslation("assets")

    const screenMap: Array<{ name: string, options?: NativeStackNavigationOptions }> = [
        { name: 'withdraw', options: { title: t('withdraw.title'), headerRight: WithdrawHeaderRight } },
        { name: 'redeem', options: { title: t('redeem.title'), headerRight: RedeemHeaderRight } },
        { name: 'records', options: { title: t('records.title') } },
    ]
    return (
        <Stack screenOptions={headerOption}>
            {screenMap.map(screen => <Stack.Screen key={screen.name} {...screen} />)}
        </Stack>
    )
}