import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface DialogFooterProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const DialogFooter = forwardRef<View, DialogFooterProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={cn<ViewStyle>(styles.footer, style)} {...props}>
        {children}
      </View>
    );
  }
);

DialogFooter.displayName = 'DialogFooter';

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
    gap: 8,
  },
});

export { DialogFooter };
