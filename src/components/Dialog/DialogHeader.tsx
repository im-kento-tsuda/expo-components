import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface DialogHeaderProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const DialogHeader = forwardRef<View, DialogHeaderProps>(
  ({ children, style, className, ...props }, ref) => {
    return (
      <View ref={ref} className={className} style={cn<ViewStyle>(styles.header, style)} {...props}>
        {children}
      </View>
    );
  }
);

DialogHeader.displayName = 'DialogHeader';

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
    gap: 4,
  },
});

export { DialogHeader };
