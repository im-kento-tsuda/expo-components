import React, { forwardRef, useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  type ViewStyle,
  type ViewProps,
  type LayoutChangeEvent,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface SliderProps extends Omit<ViewProps, 'style'> {
  /** 現在の値 */
  value?: number;
  /** 値変更時のコールバック */
  onValueChange?: (value: number) => void;
  /** 最小値 */
  min?: number;
  /** 最大値 */
  max?: number;
  /** ステップ */
  step?: number;
  /** 無効状態 */
  disabled?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const THUMB_SIZE = 20;
const TRACK_HEIGHT = 6;

const Slider = forwardRef<View, SliderProps>(
  (
    {
      value = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const colors = useColors();
    const [trackWidth, setTrackWidth] = useState(0);
    const trackRef = useRef<View>(null);

    const clampValue = useCallback(
      (val: number) => {
        const stepped = Math.round(val / step) * step;
        return Math.min(max, Math.max(min, stepped));
      },
      [min, max, step]
    );

    const valueToPosition = useCallback(
      (val: number) => {
        if (trackWidth === 0) return 0;
        const percentage = (val - min) / (max - min);
        return percentage * trackWidth;
      },
      [trackWidth, min, max]
    );

    const positionToValue = useCallback(
      (position: number) => {
        if (trackWidth === 0) return min;
        const percentage = Math.max(0, Math.min(1, position / trackWidth));
        const rawValue = min + percentage * (max - min);
        return clampValue(rawValue);
      },
      [trackWidth, min, max, clampValue]
    );

    const handleLayout = (event: LayoutChangeEvent) => {
      setTrackWidth(event.nativeEvent.layout.width);
    };

    const updateValue = useCallback(
      (gestureState: PanResponderGestureState, event: GestureResponderEvent) => {
        if (disabled || !trackRef.current) return;

        trackRef.current.measure((_x, _y, _width, _height, pageX) => {
          const touchX = event.nativeEvent.pageX - pageX;
          const newValue = positionToValue(touchX);
          onValueChange?.(newValue);
        });
      },
      [disabled, positionToValue, onValueChange]
    );

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (event, gestureState) => {
          updateValue(gestureState, event);
        },
        onPanResponderMove: (event, gestureState) => {
          updateValue(gestureState, event);
        },
      })
    ).current;

    const thumbPosition = valueToPosition(value);

    const trackStyle: ViewStyle = {
      backgroundColor: colors.muted,
    };

    const activeTrackStyle: ViewStyle = {
      backgroundColor: colors.primary,
      width: thumbPosition,
    };

    const thumbStyle: ViewStyle = {
      backgroundColor: colors.background,
      borderColor: colors.primary,
      transform: [{ translateX: thumbPosition - THUMB_SIZE / 2 }],
    };

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(styles.container, disabled && styles.disabled, style)}
        {...props}
      >
        <View
          ref={trackRef}
          style={cn<ViewStyle>(styles.track, trackStyle)}
          onLayout={handleLayout}
          {...panResponder.panHandlers}
        >
          <View style={cn<ViewStyle>(styles.activeTrack, activeTrackStyle)} />
          <View style={cn<ViewStyle>(styles.thumb, thumbStyle)} />
        </View>
      </View>
    );
  }
);

Slider.displayName = 'Slider';

const styles = StyleSheet.create({
  container: {
    height: THUMB_SIZE + 8,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    position: 'relative',
  },
  activeTrack: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: 2,
    top: -(THUMB_SIZE - TRACK_HEIGHT) / 2,
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

export { Slider };
