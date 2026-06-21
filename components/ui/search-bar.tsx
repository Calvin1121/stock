import IconFont, { IconFail } from '@/components/iconfont';
import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ms } from 'react-native-size-matters';
import { TouchableOpacity } from '../ThemeWidget';
import { Input, InputProps } from './input';

export interface SearchBarProps extends Omit<InputProps, 'variant' | 'prefix' | 'suffix' | 'passwordToggle'> {
  containerStyle?: StyleProp<ViewStyle>;
}

export function SearchBar({
  containerStyle,
  placeholder = 'Search',
  onClear,
  value,
  onChangeText,
  style,
  ...props
}: SearchBarProps) {
  const { theme } = useTheme();
  const showClear = !!onClear && !!value && value.length > 0;
  const styles = useMemo(() => createStyles(theme), [theme])
  const handleClear = () => {
    if (onClear) {
      onClear();
      return;
    }
    onChangeText?.('');
  };

  return (
    <Input
      variant="rounded"
      prefix={<IconFont name='icon-32-search' size={16} color={theme.searchbar.iconColor} />}
      onClear={handleClear}
      suffix={showClear ? (
        <TouchableOpacity onPress={handleClear}>
          <IconFail size={16} color={theme.searchbar.iconColor} />
        </TouchableOpacity>
      ) : undefined}
      value={value}
      placeholder={placeholder}
      containerStyle={[styles.container, containerStyle]}
      style={[styles.input, style]}
      {...props}
    />
  );
}

function createStyles(theme: ThemeType) {
  const seachbarTheme = theme.searchbar || {}
  return StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: ms(10),
      borderColor: seachbarTheme.borderColor,
      backgroundColor: seachbarTheme.background
    },
    input: {
      marginLeft: ms(10),
      minHeight: 32,
      paddingVertical: 0
    },
  });
}
