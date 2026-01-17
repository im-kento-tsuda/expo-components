import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface AspectRatioProps extends Omit<ViewProps, 'style'> {
  /** アスペクト比（幅/高さ） */
  ratio?: number;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const AspectRatio = forwardRef<View, AspectRatioProps>(
  ({ ratio = 1, children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={cn<ViewStyle>(styles.container, style)} {...props}>
        <View style={[styles.inner, { aspectRatio: ratio }]}>
          {children}
        </View>
      </View>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inner: {
    width: '100%',
    overflow: 'hidden',
  },
});

export { AspectRatio };
