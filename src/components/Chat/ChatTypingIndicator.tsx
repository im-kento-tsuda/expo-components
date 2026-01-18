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

export interface ChatTypingIndicatorProps
  extends Omit<ViewProps, 'style' | 'className'> {
  /** ドットのサイズ */
  dotSize?: number;
  /** ドット間のギャップ */
  dotGap?: number;
  /** アニメーション時間（ミリ秒） */
  animationDuration?: number;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const ChatTypingIndicator = forwardRef<View, ChatTypingIndicatorProps>(
  (
    {
      dotSize = 8,
      dotGap = 4,
      animationDuration = 600,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const colors = useColors();
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const createDotAnimation = (dot: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(dot, {
              toValue: 1,
              duration: animationDuration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0,
              duration: animationDuration / 2,
              useNativeDriver: true,
            }),
          ])
        );
      };

      const animation1 = createDotAnimation(dot1, 0);
      const animation2 = createDotAnimation(dot2, animationDuration / 3);
      const animation3 = createDotAnimation(dot3, (animationDuration * 2) / 3);

      animation1.start();
      animation2.start();
      animation3.start();

      return () => {
        animation1.stop();
        animation2.stop();
        animation3.stop();
      };
    }, [dot1, dot2, dot3, animationDuration]);

    const containerStyle: ViewStyle = {
      backgroundColor: colors.muted,
      gap: dotGap,
    };

    const dotStyle: ViewStyle = {
      width: dotSize,
      height: dotSize,
      borderRadius: dotSize / 2,
      backgroundColor: colors.mutedForeground,
    };

    const createAnimatedStyle = (animatedValue: Animated.Value) => ({
      opacity: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.4, 1],
      }),
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -4],
          }),
        },
      ],
    });

    return (
      <View
        ref={ref}
        className={className}
        style={cn<ViewStyle>(styles.container, containerStyle, style)}
        {...props}
      >
        <Animated.View style={[dotStyle, createAnimatedStyle(dot1)]} />
        <Animated.View style={[dotStyle, createAnimatedStyle(dot2)]} />
        <Animated.View style={[dotStyle, createAnimatedStyle(dot3)]} />
      </View>
    );
  }
);

ChatTypingIndicator.displayName = 'ChatTypingIndicator';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
});

export { ChatTypingIndicator };
