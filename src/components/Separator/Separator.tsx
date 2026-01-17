import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends Omit<ViewProps, 'style'> {
  /** 区切り線の向き */
  orientation?: SeparatorOrientation;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const Separator = forwardRef<View, SeparatorProps>(
  ({ orientation = 'horizontal', style, ...props }, ref) => {
    const colors = useColors();

    const separatorStyle: ViewStyle = {
      backgroundColor: colors.border,
    };

    const orientationStyle =
      orientation === 'horizontal' ? styles.horizontal : styles.vertical;

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(styles.base, orientationStyle, separatorStyle, style)}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

const styles = StyleSheet.create({
  base: {
    flexShrink: 0,
  },
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});

export { Separator };
