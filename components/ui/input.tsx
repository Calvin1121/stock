import IconFont from '@/components/iconfont';
import { ThemeType } from '@/constants/Colors';
import React, { forwardRef, useMemo, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { useUnistyles } from 'react-native-unistyles';

export interface InputProps extends TextInputProps {
  variant?: 'outline' | 'underline' | 'rounded';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onClear?: () => void;
  containerStyle?: any;
  error?: boolean;
  passwordToggle?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(({ 
  variant = 'underline',
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
  passwordToggle = false,
  secureTextEntry,
  ...props
}, ref) => {
  const { theme } = useUnistyles();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleClear = () => {
    if (onChangeText) {
      onChangeText('');
    }
    onClear?.();
  };

  const handleTogglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  
  const isDisabled = props.readOnly || !editable;
  const styles = useMemo(
    () => createStyles(theme, variant, isDisabled, !!error, isFocused),
    [theme, variant, isDisabled, error, isFocused]
  );
  const themeInput = theme.input || {}
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {/* Prefix Slot */}
      {prefix ? (
        <View style={[styles.iconWrapper]}>{prefix}</View>
      ) : null}

      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        editable={!isDisabled}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || themeInput.placeholder}
        secureTextEntry={passwordToggle ? !isPasswordVisible : secureTextEntry}
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
      {suffix ? (
        <View style={[styles.iconWrapper]}>{suffix}</View>
      ) : passwordToggle ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleTogglePassword}
          style={[styles.iconWrapper]}
        >
          <IconFont name={isPasswordVisible ? 'visible' : 'hidden'} size={ms(24)} color={themeInput.iconColor} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
});

function createStyles(theme: ThemeType, variant: 'rounded' | 'underline' | 'outline', isDisabled: boolean, error: boolean, isFocused: boolean){
  const inputTheme = theme.input || {};
  const variantTheme = inputTheme[variant] || {};
  return StyleSheet.create({
    containerStyle: {
      width: '100%',
      minHeight: ms(32),
      opacity: isDisabled ? theme.disabledOpacity : theme.enabledOpacity,
      backgroundColor: inputTheme.background,
      borderWidth: ms(variantTheme.borderWidth),
      borderBottomWidth: ms(variantTheme.borderBottomWidth),
      borderColor: error ? inputTheme.borderError : (isFocused ? inputTheme.borderActive : inputTheme.borderColor),
      borderRadius: ms(variantTheme.borderRadius),
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      color: inputTheme.color,
      fontSize: ms(18),
      paddingVertical: (ms(16)),
      height: '100%',
      outlineStyle: 'none',
      caretColor: inputTheme.caretColor,
      fontWeight: '400',
    } as any,
    iconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  })
};
