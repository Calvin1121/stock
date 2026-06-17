import IconFont from '@/components/iconfont';
import { TouchableOpacity } from '@/components/ThemeWidget';
import {
  NativeStackHeaderBackProps,
  NativeStackHeaderItemProps,
  NativeStackHeaderProps,
} from 'expo-router';
import React from 'react';
import {
  ColorValue,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ms } from 'react-native-size-matters';

const HEADER_HEIGHT = 44;
const SIDE_WIDTH = 88;

export function Header(props: NativeStackHeaderProps) {
  const { back, navigation, options, route } = props;
  const insets = useSafeAreaInsets();
  const tintColor = options.headerTintColor;
  const canGoBack = navigation.canGoBack();
  const headerStyle = StyleSheet.flatten(options.headerStyle) as ViewStyle | undefined;
  const titleStyle = StyleSheet.flatten(options.headerTitleStyle) as TextStyle | undefined;
  const backgroundColor =
    options.headerTransparent ? 'transparent' : headerStyle?.backgroundColor;

  const itemProps: NativeStackHeaderItemProps = {
    tintColor,
    canGoBack,
    backgroundColor,
  };

  const backProps: NativeStackHeaderBackProps = {
    ...itemProps,
    label: options.headerBackTitle ?? back?.title,
    href: back?.href,
  };

  if (options.headerShown === false) {
    return null;
  }

  const title = getHeaderTitle(options, route.name);
  const left =
    options.headerLeft?.(backProps) ??
    (canGoBack && options.headerBackVisible !== false ? (
      <DefaultBackButton
        backProps={backProps}
        onPress={navigation.goBack}
        iconSource={options.headerBackIcon?.source ?? options.headerBackImageSource}
      />
    ) : null);
  const right = options.headerRight?.(itemProps) ?? null;
  const titleNode = renderTitle(title, tintColor, titleStyle, options.headerTitle);
  const isCenter = options.headerTitleAlign === 'center' || Platform.OS === 'ios';

  return (
    <View
      style={[
        styles.container,
        options.headerTransparent && styles.transparent,
        { paddingTop: insets.top, backgroundColor },
        headerStyle,
      ]}
    >
      {options.headerBackground ? (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          {options.headerBackground()}
        </View>
      ) : null}
      <View style={styles.content}>
        <View style={styles.side}>{left}</View>
        <View style={[styles.title, isCenter ? styles.titleCenter : styles.titleLeft]}>
          {titleNode}
        </View>
        <View style={[styles.side, styles.right]}>{right}</View>
      </View>
      {options.headerShadowVisible === false ? null : <View style={styles.shadow} />}
    </View>
  );
}

function getHeaderTitle(options: NativeStackHeaderProps['options'], routeName: string) {
  if (typeof options.headerTitle === 'string') {
    return options.headerTitle;
  }

  return options.title ?? routeName;
}

function renderTitle(
  title: string,
  tintColor?: ColorValue,
  titleStyle?: TextStyle,
  headerTitle?: NativeStackHeaderProps['options']['headerTitle']
) {
  if (typeof headerTitle === 'function') {
    return headerTitle({ children: title, tintColor });
  }

  return (
    <Text
      numberOfLines={1}
      style={[
        styles.titleText,
        tintColor ? { color: tintColor } : null,
        titleStyle,
      ]}
    >
      {title}
    </Text>
  );
}

function DefaultBackButton({
  backProps,
  iconSource,
  onPress,
}: {
  backProps: NativeStackHeaderBackProps;
  iconSource?: NativeStackHeaderProps['options']['headerBackImageSource'];
  onPress: () => void;
}) {
  const tintColor = backProps.tintColor;

  return (
    <TouchableOpacity
      accessibilityLabel={backProps.label ?? 'Back'}
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      style={styles.backButton}
    >
      {iconSource ? (
        <Image source={iconSource} style={[styles.backImage, tintColor ? { tintColor } : null]} />
      ) : (
        <IconFont name="a-icon-48-Arrow-rightsvg" color={String(tintColor)} size={ms(24)} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 10,
  },
  transparent: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    position: 'relative',
  },
  side: {
    alignItems: 'flex-start',
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    minWidth: SIDE_WIDTH,
    paddingHorizontal: ms(8),
    zIndex: 1,
  },
  right: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  title: {
    justifyContent: 'center',
    minWidth: 0,
  },
  titleCenter: {
    bottom: 0,
    left: SIDE_WIDTH,
    position: 'absolute',
    right: SIDE_WIDTH,
    top: 0,
  },
  titleLeft: {
    alignItems: 'flex-start',
    flex: 1,
  },
  titleText: {
    fontSize: ms(17),
    fontWeight: '600',
  },
  backButton: {
    alignItems: 'center',
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    width: ms(40),
  },
  backImage: {
    height: ms(24),
    resizeMode: 'contain',
    width: ms(24),
  },
  shadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    bottom: 0,
    height: StyleSheet.hairlineWidth,
    left: 0,
    position: 'absolute',
    right: 0,
  },
});
