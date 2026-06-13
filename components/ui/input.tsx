import { IconFail, IconSearch } from '@/components/iconfont';
import { ThemeType } from '@/constants/Colors';
import React, { forwardRef, useMemo, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

export interface InputProps extends TextInputProps {
  variant?: 'outline' | 'underline' | 'rounded';
  isSearch?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onClear?: () => void;
  containerStyle?: any;
  error?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(({ 
  variant = 'underline',
  isSearch = false,
  prefix,
  suffix,
  onClear,
  value,
  onChangeText,
  editable = true,
  style,
  containerStyle,
  placeholder = 'Enter text',
  placeholderTextColor,
  error = false,
  ...props
}, ref) => {
  const { theme } = useUnistyles();
  const [isFocused, setIsFocused] = useState(false);


  const handleClear = () => {
    if (onChangeText) {
      onChangeText('');
    }
    onClear?.();
  };

  const showClear = useMemo(() => {
    return isSearch && !!value && value.length > 0 && editable;
  }, [isSearch, value, editable]);
  const isDisabled = props.readOnly || !editable;
  const styles = useMemo(
    () => createStyles(theme, variant, isDisabled, !!error, isFocused),
    [theme, variant, isDisabled, error, isFocused]
  );
  const themeInput = theme.input[variant] || {}
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {/* Prefix Slot */}
      {isSearch && !prefix ? (
        <View style={styles.iconWrapper}>
          <IconSearch size={16} color={themeInput.iconColor} />
        </View>
      ) : prefix ? (
        <View style={styles.iconWrapper}>{prefix}</View>
      ) : null}

      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        editable={!isDisabled}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || theme.placeholder}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        style={[styles.input, style]}
        // @ts-ignore - web specific
        outlineStyle="none"
        {...props}
      />

      {/* Suffix Slot */}
      {showClear && !suffix ? (
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={handleClear} 
          style={styles.iconWrapper}
        >
          <IconFail size={16} color={themeInput.iconColor} />
        </TouchableOpacity>
      ) : suffix ? (
        <View style={styles.iconWrapper}>{suffix}</View>
      ) : null}
    </View>
  );
});

function createStyles(theme: ThemeType, variant: 'rounded' | 'underline' | 'outline', isDisabled: boolean, error: boolean, isFocused: boolean){
  const inputTheme = theme.input[variant] || {};
  return StyleSheet.create({
    containerStyle: {
      width: '100%',
      paddingHorizontal: 10,
      minHeight: 32,
      opacity: isDisabled ? theme.disabledOpacity : theme.enabledOpacity,
      backgroundColor: inputTheme.background,
      borderWidth: inputTheme.borderWidth,
      borderBottomWidth: inputTheme.borderBottomWidth,
      borderColor: error ? inputTheme.borderError : (isFocused ? inputTheme.borderActive : inputTheme.borderColor),
      borderRadius: inputTheme.borderRadius,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      color: inputTheme.color,
      fontSize: 13,
      paddingVertical: 10,
      paddingHorizontal: 5,
      height: '100%',
      outlineStyle: 'none',
    } as any,
    iconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
    },
  })
};
