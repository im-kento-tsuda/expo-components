import React, { forwardRef, useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export type SpinnerSize = 'sm' | 'default' | 'lg';

export interface SpinnerProps extends Omit<ViewProps, 'style'> {
  /** スピナーのサイズ */
  size?: SpinnerSize;
  /** スピナーの色（指定しない場合はテーマのforeground） */
  color?: string;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  default: 24,
  lg: 32,
};

const borderWidthMap: Record<SpinnerSize, number> = {
  sm: 2,
  default: 2,
  lg: 3,
};

const Spinner = forwardRef<View, SpinnerProps>(
  ({ size = 'default', color, style, ...props }, ref) => {
    const colors = useColors();
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const animation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();

      return () => animation.stop();
    }, [spinValue]);

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const spinnerSize = sizeMap[size];
    const borderWidth = borderWidthMap[size];
    const spinnerColor = color ?? colors.foreground;

    const spinnerStyle: ViewStyle = {
      width: spinnerSize,
      height: spinnerSize,
      borderWidth,
      borderColor: colors.muted,
      borderTopColor: spinnerColor,
    };

    return (
      <View ref={ref} style={cn<ViewStyle>(styles.container, style)} {...props}>
        <Animated.View
          style={[
            styles.spinner,
            spinnerStyle,
            { transform: [{ rotate: spin }] },
          ]}
        />
      </View>
    );
  }
);

Spinner.displayName = 'Spinner';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    borderRadius: 9999,
  },
});

export { Spinner };
