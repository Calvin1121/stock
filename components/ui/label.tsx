import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

const Label = React.forwardRef<Text, TextProps>(({ style, ...props }, ref) => {
  const { theme } = useUnistyles();
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        label: {
          fontSize: 14,
          fontWeight: '500',
          color: theme.text,
          marginBottom: 8,
        },
      }),
    [theme]
  );

  return <Text ref={ref} style={[styles.label, style]} {...props} />;
});
Label.displayName = 'Label';

export { Label };
