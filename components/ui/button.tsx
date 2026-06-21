import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  children?: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  type?: 'primary' | 'secondary' | 'danger' | 'info' | 'success';
  fullWidth?: boolean;
  rounded?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
}

export const Button = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonProps>(
  (
    {
      title,
      children,
      variant = 'solid',
      type = 'primary',
      fullWidth = false,
      rounded = false,
      disabled = false,
      loading = false,
      containerStyle,
      textStyle,
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const isDisabled = disabled || loading;
    const { button, buttonText, spinnerColor, loadingStyle } = useMemo(
      () => createStyles(theme, variant, type, isDisabled, fullWidth, rounded),
      [theme, variant, type, isDisabled, fullWidth, rounded]
    );
    const content = title ?? children;
    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={0.8}
        disabled={isDisabled}
        style={[button, style, containerStyle]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={spinnerColor} style={[loadingStyle]} />
        ) : null}
        <Text style={[buttonText, textStyle]} numberOfLines={1}>
          {content}
        </Text>
      </TouchableOpacity>
    );
  }
);

function createStyles(
  theme: ThemeType,
  variant: ButtonProps['variant'],
  type: ButtonProps['type'],
  disabled: boolean,
  fullWidth: boolean,
  rounded: boolean
) {
    const buttonTheme = theme.button || {};
    const variantTheme = buttonTheme?.[type!]?.[variant!] || {};
    return {
        button: {
            ...(fullWidth? commonStyles.widthFull : {}),
            ...commonStyles.flexRow,
            ...commonStyles.center,
            borderRadius: rounded ? ms(999) : ms(8),
            opacity: disabled ? theme.disabledOpacity : theme.enabledOpacity,
            backgroundColor: variantTheme.background,
            borderColor: variantTheme.borderColor,
            borderWidth: variant === 'ghost'? 0 : ms(1),
            paddingHorizontal: ms(15),
        },
        buttonText: {
            color: variantTheme.textColor,
            fontSize: ms(18),
            height: vs(45),
            lineHeight: vs(45),
        } as TextStyle,
        spinnerColor: variantTheme.spinnerColor,
        loadingStyle: {
            marginRight: ms(8)
        }
    }
}
