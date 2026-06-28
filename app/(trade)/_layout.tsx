import { useHeaderOption } from "@/components/useCommon";
import { NativeStackNavigationOptions, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { ExchangeHeaderRight } from "./exchange";
import { WithdrawHeaderRight } from "./withdraw";

export default function TradeLayout() {
    const headerOption = useHeaderOption()
    const { t } = useTranslation("assets")

    const screenMap: Array<{ name: string, options?: NativeStackNavigationOptions }> = [
        { name: 'withdraw', options: { title: t('withdraw.title'), headerRight: WithdrawHeaderRight } },
        { name: 'exchange', options: { title: t('exchange.title'), headerRight: ExchangeHeaderRight } },
        { name: 'records', options: { title: t('records.title') } },
        { name: 'record', options: { title: t('record.title') } },
        { name: 'exchange-records', options: { title: t('exchange.records.title') } },
        { name: 'exchange-record', options: { title: t('exchange.record.title') } },
        { name: 'withdraw-records', options: { title: t('withdraw.records.title') } },
        { name: 'withdraw-record', options: { title: t('withdraw.record.title') } },
    ]
    return (
        <Stack screenOptions={headerOption}>
            {screenMap.map(screen => <Stack.Screen key={screen.name} {...screen} />)}
        </Stack>
    )
}