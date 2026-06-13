import * as LabelPrimitive from '@rn-primitives/label';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Text>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Text>
>(({ style, ...props }, ref) => {
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

  return (
    <LabelPrimitive.Root>
      <LabelPrimitive.Text
        ref={ref}
        style={[styles.label, style]}
        {...props}
      />
    </LabelPrimitive.Root>
  );
});
Label.displayName = LabelPrimitive.Text.displayName;

export { Label };
