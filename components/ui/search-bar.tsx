import { IconFail, IconSearch } from '@/components/iconfont';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
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
  const { theme } = useUnistyles();
  const themeInput = theme.input.rounded || {};
  const showClear = !!onClear && !!value && value.length > 0;

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
      prefix={<IconSearch size={16} color={themeInput.iconColor} />}
      onClear={handleClear}
      suffix={showClear ? (
        <TouchableOpacity activeOpacity={0.7} onPress={handleClear}>
          <IconFail size={16} color={themeInput.iconColor} />
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    minHeight: 32,
  },
});
