import { useHeaderOption } from '@/components/useCommon';
import { Stack } from 'expo-router';

export default function AuthLayout() {
    const headerOption = useHeaderOption()
    return (
        <Stack
            screenOptions={headerOption}
        >
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" />
            <Stack.Screen name="forgot" />
        </Stack>
    );
}
