import React, { forwardRef, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface ProgressProps extends Omit<ViewProps, 'style'> {
  /** 進捗値（0-100） */
  value?: number;
  /** 最大値 */
  max?: number;
  /** 不確定状態（無限アニメーション） */
  indeterminate?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const TRACK_HEIGHT = 8;

const Progress = forwardRef<View, ProgressProps>(
  ({ value = 0, max = 100, indeterminate = false, style, ...props }, ref) => {
    const colors = useColors();
    const animatedValue = useRef(new Animated.Value(0)).current;
    const indeterminateAnim = useRef(new Animated.Value(0)).current;

    // 確定的な進捗のアニメーション
    useEffect(() => {
      if (!indeterminate) {
        const percentage = Math.min(100, Math.max(0, (value / max) * 100));
        Animated.timing(animatedValue, {
          toValue: percentage,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    }, [value, max, indeterminate, animatedValue]);

    // 不確定状態のアニメーション
    useEffect(() => {
      if (indeterminate) {
        const animation = Animated.loop(
          Animated.sequence([
            Animated.timing(indeterminateAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: false,
            }),
            Animated.timing(indeterminateAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }),
          ])
        );
        animation.start();
        return () => animation.stop();
      }
    }, [indeterminate, indeterminateAnim]);

    const trackStyle: ViewStyle = {
      backgroundColor: colors.muted,
    };

    const indicatorStyle: ViewStyle = {
      backgroundColor: colors.primary,
    };

    const indicatorWidth = indeterminate
      ? indeterminateAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ['20%', '40%', '20%'],
        })
      : animatedValue.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%'],
        });

    const indicatorLeft = indeterminate
      ? indeterminateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', '80%'],
        })
      : '0%';

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(styles.track, trackStyle, style)}
        {...props}
      >
        <Animated.View
          style={[
            styles.indicator,
            indicatorStyle,
            {
              width: indicatorWidth,
              left: indicatorLeft,
            },
          ]}
        />
      </View>
    );
  }
);

Progress.displayName = 'Progress';

const styles = StyleSheet.create({
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    overflow: 'hidden',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: '100%',
    borderRadius: TRACK_HEIGHT / 2,
  },
});

export { Progress };
