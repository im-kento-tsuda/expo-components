import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface ScrollBarProps extends Omit<ViewProps, 'style' | 'className'> {
  /** スクロールバーの向き */
  orientation?: 'vertical' | 'horizontal';
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const ScrollBar = forwardRef<View, ScrollBarProps>(
  ({ orientation = 'vertical', style, className, ...props }, ref) => {
    const colors = useColors();
    const isVertical = orientation === 'vertical';

    const barStyle: ViewStyle = {
      backgroundColor: colors.border,
    };

    return (
      <View
        ref={ref}
        className={className}
        style={cn<ViewStyle>(
          styles.scrollBar,
          isVertical ? styles.vertical : styles.horizontal,
          barStyle,
          style
        )}
        {...props}
      />
    );
  }
);

ScrollBar.displayName = 'ScrollBar';

const styles = StyleSheet.create({
  scrollBar: {
    borderRadius: 4,
  },
  vertical: {
    position: 'absolute',
    right: 2,
    top: 2,
    bottom: 2,
    width: 4,
  },
  horizontal: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    right: 2,
    height: 4,
  },
});

export { ScrollBar };
