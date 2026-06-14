import { ThemeType } from '@/constants/Colors';
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
import { useUnistyles } from 'react-native-unistyles';

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  children?: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
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
      fullWidth = true,
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
    const { theme } = useUnistyles();
    const isDisabled = disabled || loading;
    const { button, buttonText, spinnerColor } = useMemo(
      () => createStyles(theme, variant, isDisabled, fullWidth, rounded),
      [theme, variant, isDisabled, fullWidth, rounded]
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
          <ActivityIndicator color={spinnerColor} style={{ marginRight: content ? 8 : 0 }} />
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
  disabled: boolean,
  fullWidth: boolean,
  rounded: boolean
) {
  const baseStyle: ViewStyle = {
    width: fullWidth ? '100%' : undefined,
    borderRadius: rounded ? 999 : 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: disabled ? theme.disabledOpacity : theme.enabledOpacity,
  };

  const variantStyles: ViewStyle =
    variant === 'outline'
      ? {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.primary,
        }
      : variant === 'ghost'
      ? {
          backgroundColor: 'transparent',
        }
      : {
          backgroundColor: theme.primary,
        };

  const textColor =
    variant === 'solid' ? theme.background : theme.primary;

  const spinnerColor =
    variant === 'solid' ? theme.background : theme.primary;

  return {
    button: {
      ...baseStyle,
      ...variantStyles,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    buttonText: {
      color: textColor,
      fontSize: 15,
      fontWeight: '600',
    } as TextStyle,
    spinnerColor,
  };
}
