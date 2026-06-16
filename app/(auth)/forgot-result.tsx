import { ResultWidget } from "@/components/ThemeWidget";
import { ResultEnum } from "@/utils/consts";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function ForgotResult() {
    const { t } = useTranslation('auth')
    const { result } = useLocalSearchParams();
    const props = useMemo(() => {
        const resultType = result as ResultEnum
        return {
            resultType,
            buttonText: t(`forgot.${resultType}.button`),
            infoText: t(`forgot.${resultType}.info`),
        }
    }, [result])
    const onTap = () => {
        if (result === ResultEnum.Success) router.replace('/login')
        else router.back()
    }
    return <ResultWidget onTap={onTap} {...props} />
}