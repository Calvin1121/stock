import { ThemeType } from '@/constants/Colors';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { delay } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import {
  Dimensions,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ms, s, vs } from 'react-native-size-matters';
import { TouchableOpacity } from '../ThemeWidget';

export type ActionSheetItem = {
  value: string | number;
  label: string;
  onPress?: (item: ActionSheetItem) => void;
  color?: string;
  disabled?: boolean;
};

export interface ActionSheetProps {
  visible: boolean;
  items: ActionSheetItem[];
  onClose: () => void;
  title?: string;
  titleColor?: string;
  itemColor?: string;
  backgroundColor?: string;
  overlayColor?: string;
  dragHandler?: boolean;
  activeItem?: Partial<ActionSheetItem>
}

export function ActionSheet({
  visible,
  items,
  onClose,
  title,
  titleColor,
  itemColor,
  backgroundColor,
  overlayColor,
  dragHandler = true,
  activeItem
}: ActionSheetProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme])
  const [isModalVisible, setIsModalVisible] = React.useState(visible);
  const translateY = useSharedValue(visible ? 0 : 1000);
  const opacityAnim = useSharedValue(visible ? 1 : 0);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 10,
      onPanResponderMove: (_, { dy }) => {
        // Only allow dragging downward (positive dy)
        if (dy > 0) {
          translateY.value = dy;
        }
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        // If dragged down more than 50px or velocity is high, close
        if (dy > 50 || vy > 0.5) {
          // Animate out then close
          opacityAnim.value = withTiming(0, {
            duration: 300,
            easing: Easing.in(Easing.cubic),
          });
          translateY.value = withTiming(1000, {
            duration: 300,
            easing: Easing.in(Easing.cubic),
          }, () => {
            runOnJS(onClose)();
          });
        } else {
          // Snap back to original position without spring
          translateY.value = withTiming(0, {
            duration: 300,
            easing: Easing.out(Easing.cubic),
          });
        }
      },
    })
  ).current;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnim.value,
    };
  });

  const finalBgColor = backgroundColor || theme.background;
  const finalItemColor = itemColor || theme.primaryText;
  const finalTitleColor = titleColor || theme.primaryText;
  const finalOverlayColor = overlayColor || theme.overlayBackground;
  const maxContentHeight = Dimensions.get('window').height * 0.5;

  const handleItemPress = useCallback(
    (item: ActionSheetItem) => {
      if (!item.disabled) {
        onClose();
        delay(() => item.onPress?.(item), 320)
      }
    },
    [onClose]
  );

  // Handle show/hide animations
  React.useEffect(() => {
    if (visible) {
      // Show: become visible immediately, then animate in
      setIsModalVisible(true);
      // Give Modal time to render, then animate
      setTimeout(() => {
        opacityAnim.value = withTiming(1, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        });
        translateY.value = withTiming(0, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        });
      }, 50);
    } else {
      // Hide: animate out, then close
      opacityAnim.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.cubic),
      });
      translateY.value = withTiming(1000, {
        duration: 300,
        easing: Easing.in(Easing.cubic),
      }, () => {
        runOnJS(setIsModalVisible)(false);
      });
    }
  }, [visible, opacityAnim, translateY]);

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[commonStyles.flex1, commonStyles.justifyEnd, { backgroundColor: finalOverlayColor }, overlayStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          style={commonStyles.flex1}
          onPress={onClose}
        />

        <Animated.View
          style={[
            styles.container,
            { backgroundColor: finalBgColor },
            animatedStyle,
          ]}
          {...panResponder.panHandlers}
        >
          {/* Drag Handle */}
          {dragHandler && <View style={styles.handleContainer}>
            <View style={[styles.dragHandle, { backgroundColor: theme.backgroundDivide }]} />
          </View>}

          {/* Title */}
          {title && (
            <Text style={[styles.title, { color: finalTitleColor }]}> {title}</Text>)}

          {/* Items */}
          <ScrollView style={[styles.itemsContainer, { maxHeight: maxContentHeight }]}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => handleItemPress(item)}
                disabled={item.disabled}>
                <View style={[styles.itemWrapper, {borderBottomWidth: index !== items?.length -1? ms(1): 0}]}>
                  <Text style={[styles.itemText, {
                      color: item.value === activeItem?.value ? theme.primary : (item.color || finalItemColor),
                      opacity: item.disabled ? theme.disabledOpacity : theme.enabledOpacity,
                    }]}>
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

function createStyles(theme: ThemeType) {
  return StyleSheet.create({

    container: {
      paddingBottom: ms(20),
      borderTopLeftRadius: ms(16),
      borderTopRightRadius: ms(16),
      overflow: 'hidden',
    },
    handleContainer: {
      alignItems: 'center',
      paddingVertical: ms(12),
    },
    dragHandle: {
      width: s(32),
      height: vs(4),
      borderRadius: ms(2),
    },
    title: {
      fontSize: ms(16),
      fontWeight: '600',
      paddingHorizontal: ms(16),
      paddingBottom: ms(12),
    },
    itemsContainer: {
      paddingHorizontal: 0,
    },
    itemWrapper: {
      ...commonStyles.rowCenter,
      paddingHorizontal: ms(16),
      paddingVertical: ms(14),
      borderBottomColor: theme.backgroundDivide,
    },
    itemText: {
      fontSize: ms(15),
      fontWeight: '400',
    },
  })
}