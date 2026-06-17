import { useTheme } from '@/lib/useTheme';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { ms } from 'react-native-size-matters';

const Label = React.forwardRef<Text, TextProps>(({ style, ...props }, ref) => {
  const { theme } = useTheme();
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        label: {
          fontSize: ms(14),
          // fontWeight: '500',
          color: theme.text,
          marginBottom: ms(8),
        },
      }),
    [theme]
  );

  return <Text ref={ref} style={[styles.label, style]} {...props} />;
});
Label.displayName = 'Label';

export { Label };
