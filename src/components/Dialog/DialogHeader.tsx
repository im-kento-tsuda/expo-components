import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface DialogHeaderProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const DialogHeader = forwardRef<View, DialogHeaderProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={cn<ViewStyle>(styles.header, style)} {...props}>
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
