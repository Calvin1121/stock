import { useHeaderOption } from '@/components/useCommon';
import { NativeStackNavigationOptions, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { LoginHeaderRight } from './login';
import { RegisterHeaderRight } from './register';

export default function AuthLayout() {
    const headerOption = useHeaderOption()
    const { t } = useTranslation("auth")
    const screenMap: Array<{name: string, options?: NativeStackNavigationOptions}> = [
        {name: 'login', options: { title: '', headerLeft: () => null, headerRight: LoginHeaderRight  }},
        {name: 'register', options: { title: '', headerRight: RegisterHeaderRight }},
        {name: 'forgot', options: {title: t('forgot.title')}},
        {name: 'country-code', options: {title: t('countryCode.title')}}
    ]
    return (
        <Stack screenOptions={headerOption} >
            {screenMap.map(screen => <Stack.Screen {...screen} />)}
        </Stack>
    );
}
