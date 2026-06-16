import { Label } from '@/components/ui/label';
import { ThemeType } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { useUnistyles } from 'react-native-unistyles';

type FormControlProps = {
    label?: string;
    error?: string | boolean;
    helperText?: string;
    required?: boolean;
    hideRequiredMark?: boolean;
    reserveErrorSpace?: boolean;
    children: React.ReactElement<{ error?: boolean }>;
    style?: any;
};

export function FormControl({
    label,
    error,
    helperText,
    required,
    hideRequiredMark,
    reserveErrorSpace,
    children,
    style,
}: FormControlProps) {
    const { theme } = useUnistyles();
    const styles = React.useMemo(() => createStyles(theme), [theme]);
    return (
        <View style={[styles.wrapper, style]}>
            {label ? (
                <Label style={styles.label}>
                    {label}
                    {required && !hideRequiredMark ? ' *' : ''}
                </Label>
            ) : null}

            {React.cloneElement(children, { error: !!error })}

            {error ? (
                <Text style={styles.error}>{typeof error === 'string' ? error : '错误'}</Text>
            ) : helperText ? (
                <Text style={styles.helper}>{helperText}</Text>
            ) : reserveErrorSpace ? (
                <Text style={styles.error}>{'\u00A0'}</Text>
            ) : null}
        </View>
    );
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        wrapper: {
            marginBottom: ms(6),
        },
        label: {
            marginBottom: ms(6),
        },
        error: {
            marginTop: ms(6),
            color: theme.error,
            fontSize: ms(14),
            lineHeight: ms(18),
        },
        helper: {
            marginTop: ms(6),
            color: theme.helper,
            fontSize: ms(14),
            lineHeight: ms(18),
        },
    })
}
export default FormControl;
