import React, { forwardRef, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, type ViewStyle, type ViewProps, type DimensionValue } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 幅 */
  width?: DimensionValue;
  /** 高さ */
  height?: DimensionValue;
  /** 角丸 */
  borderRadius?: number;
  /** 円形にする */
  circle?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const Skeleton = forwardRef<View, SkeletonProps>(
  ({ width, height, borderRadius = 4, circle = false, style, className, ...props }, ref) => {
    const colors = useColors();
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();

      return () => animation.stop();
    }, [animatedValue]);

    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    });

    const sizeStyle: ViewStyle = {
      width: width,
      height: height,
      borderRadius: circle ? (typeof height === 'number' ? height / 2 : 9999) : borderRadius,
    };

    const skeletonStyle: ViewStyle = {
      backgroundColor: colors.muted,
    };

    return (
      <View ref={ref} className={className} style={cn<ViewStyle>(styles.container, sizeStyle, style)} {...props}>
        <Animated.View
          style={[styles.skeleton, skeletonStyle, { opacity }]}
        />
      </View>
    );
  }
);

Skeleton.displayName = 'Skeleton';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  skeleton: {
    ...StyleSheet.absoluteFillObject,
  },
});

export { Skeleton };
