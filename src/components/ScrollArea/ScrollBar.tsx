import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface ScrollBarProps extends Omit<ViewProps, 'style'> {
  /** スクロールバーの向き */
  orientation?: 'vertical' | 'horizontal';
  /** カスタムスタイル */
  style?: ViewStyle;
}

const ScrollBar = forwardRef<View, ScrollBarProps>(
  ({ orientation = 'vertical', style, ...props }, ref) => {
    const colors = useColors();
    const isVertical = orientation === 'vertical';

    const barStyle: ViewStyle = {
      backgroundColor: colors.border,
    };

    return (
      <View
        ref={ref}
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
