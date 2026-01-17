import React, { forwardRef, useEffect, useRef } from 'react';
import {
  Pressable,
  View,
  Animated,
  StyleSheet,
  type ViewStyle,
  type PressableProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface SwitchProps extends Omit<PressableProps, 'style' | 'onPress'> {
  /** スイッチの状態 */
  checked?: boolean;
  /** 状態変更時のコールバック */
  onCheckedChange?: (checked: boolean) => void;
  /** 無効状態 */
  disabled?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const TRACK_WIDTH = 44;
const TRACK_HEIGHT = 24;
const THUMB_SIZE = 20;
const THUMB_MARGIN = 2;

const Switch = forwardRef<View, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled = false, style, ...props }, ref) => {
    const colors = useColors();
    const translateX = useRef(new Animated.Value(checked ? 1 : 0)).current;

    useEffect(() => {
      Animated.timing(translateX, {
        toValue: checked ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [checked, translateX]);

    const handlePress = () => {
      if (!disabled) {
        onCheckedChange?.(!checked);
      }
    };

    const trackStyle: ViewStyle = {
      backgroundColor: checked ? colors.primary : colors.input,
    };

    const thumbTranslateX = translateX.interpolate({
      inputRange: [0, 1],
      outputRange: [THUMB_MARGIN, TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN],
    });

    return (
      <Pressable
        ref={ref}
        style={cn<ViewStyle>(
          styles.track,
          trackStyle,
          disabled && styles.disabled,
          style
        )}
        onPress={handlePress}
        disabled={disabled}
        {...props}
      >
        <Animated.View
          style={[
            styles.thumb,
            { backgroundColor: colors.background },
            { transform: [{ translateX: thumbTranslateX }] },
          ]}
        />
      </Pressable>
    );
  }
);

Switch.displayName = 'Switch';

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Switch };
