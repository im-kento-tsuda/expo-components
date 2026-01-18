import React, { forwardRef, useRef, useState, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  type ViewStyle,
  type ViewProps,
  type LayoutChangeEvent,
  type PanResponderGestureState,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface SliderProps extends Omit<ViewProps, 'style' | 'className'> {
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
  /** NativeWind className */
  className?: string;
}

const THUMB_SIZE = 24;
const TRACK_HEIGHT = 6;
const HIT_SLOP = 12;

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
      className,
      ...props
    },
    ref
  ) => {
    const colors = useColors();
    const [trackWidth, setTrackWidth] = useState(0);
    const trackWidthRef = useRef(0);
    const trackPageXRef = useRef(0);
    const touchAreaRef = useRef<View>(null);
    const onValueChangeRef = useRef(onValueChange);
    onValueChangeRef.current = onValueChange;

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
      (relativeX: number) => {
        const width = trackWidthRef.current;
        if (width === 0) return min;
        const percentage = Math.max(0, Math.min(1, relativeX / width));
        const rawValue = min + percentage * (max - min);
        return clampValue(rawValue);
      },
      [min, max, clampValue]
    );

    const handleLayout = (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setTrackWidth(width);
      trackWidthRef.current = width;
    };

    const updateValueFromGesture = useCallback(
      (gestureState: PanResponderGestureState) => {
        if (disabled) return;
        // moveX is the latest screen X position of the touch
        const relativeX = gestureState.moveX - trackPageXRef.current;
        const newValue = positionToValue(relativeX);
        onValueChangeRef.current?.(newValue);
      },
      [disabled, positionToValue]
    );

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => !disabled,
          onMoveShouldSetPanResponder: () => !disabled,
          onPanResponderGrant: (_event, gestureState) => {
            // Measure track position when touch starts
            if (touchAreaRef.current) {
              touchAreaRef.current.measureInWindow((x) => {
                trackPageXRef.current = x;
                // Use x0 (initial touch position) for grant
                const relativeX = gestureState.x0 - x;
                const newValue = positionToValue(relativeX);
                onValueChangeRef.current?.(newValue);
              });
            }
          },
          onPanResponderMove: (_event, gestureState) => {
            updateValueFromGesture(gestureState);
          },
        }),
      [disabled, positionToValue, updateValueFromGesture]
    );

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
      left: thumbPosition - THUMB_SIZE / 2,
    };

    return (
      <View
        ref={ref}
        className={className}
        style={cn<ViewStyle>(styles.container, disabled && styles.disabled, style)}
        {...props}
      >
        <View
          ref={touchAreaRef}
          style={styles.touchArea}
          onLayout={handleLayout}
          {...panResponder.panHandlers}
        >
          <View style={cn<ViewStyle>(styles.track, trackStyle)}>
            <View style={cn<ViewStyle>(styles.activeTrack, activeTrackStyle)} />
          </View>
          <View style={cn<ViewStyle>(styles.thumb, thumbStyle)} />
        </View>
      </View>
    );
  }
);

Slider.displayName = 'Slider';

const styles = StyleSheet.create({
  container: {
    height: THUMB_SIZE + HIT_SLOP * 2,
    justifyContent: 'center',
  },
  touchArea: {
    height: THUMB_SIZE + HIT_SLOP * 2,
    justifyContent: 'center',
    position: 'relative',
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
    top: HIT_SLOP,
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
