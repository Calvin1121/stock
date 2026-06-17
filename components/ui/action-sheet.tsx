import { useTheme } from '@/lib/useTheme';
import React, { useCallback } from 'react';
import {
    Dimensions,
    Modal,
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
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
}: ActionSheetProps) {
  const { theme } = useTheme();
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
  const finalItemColor = itemColor || theme.text;
  const finalTitleColor = titleColor || theme.text;
  const finalOverlayColor = overlayColor || 'rgba(0, 0, 0, 0.5)';
  const maxContentHeight = Dimensions.get('window').height * 0.4;

  const handleItemPress = useCallback(
    (item: ActionSheetItem) => {
      if (!item.disabled) {
        item.onPress?.(item);
        // Animate out before closing
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
      }
    },
    [onClose, opacityAnim, translateY]
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
      <Animated.View style={[styles.overlay, { backgroundColor: finalOverlayColor }, overlayStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlayTouchable}
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
          <View style={styles.handleContainer}>
            <View style={[styles.dragHandle, { backgroundColor: theme.border }]} />
          </View>

          {/* Title */}
          {title && (
            <Text
              style={[
                styles.title,
                { color: finalTitleColor },
              ]}
            >
              {title}
            </Text>
          )}

          {/* Items */}
          <ScrollView style={[styles.itemsContainer, { maxHeight: maxContentHeight }]}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                activeOpacity={0.7}
                onPress={() => handleItemPress(item)}
                disabled={item.disabled}
              >
                <View style={styles.itemWrapper}>
                  <Text
                    style={[
                      styles.itemText,
                      {
                        color: item.color || finalItemColor,
                        opacity: item.disabled ? 0.5 : 1,
                      },
                    ]}
                  >
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
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
    paddingHorizontal: ms(16),
    paddingVertical: ms(14),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  itemText: {
    fontSize: ms(15),
    fontWeight: '400',
  },
});
