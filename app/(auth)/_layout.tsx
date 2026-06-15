import { useHeaderOption } from '@/components/useCommon';
import { Stack } from 'expo-router';
import { RegisterHeaderRight } from './register';

export default function AuthLayout() {
    const headerOption = useHeaderOption()
    return (
        <Stack
            screenOptions={headerOption}
        >
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ title: '', headerRight: RegisterHeaderRight }} />
            <Stack.Screen name="forgot" />
        </Stack>
    );
}
