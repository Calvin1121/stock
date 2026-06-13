import { Label } from '@/components/ui/label';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
  },
  error: {
    marginTop: 6,
    color: '#E74C3C',
    fontSize: 12,
  },
  helper: {
    marginTop: 6,
    color: '#888',
    fontSize: 12,
  },
});

export default FormControl;
