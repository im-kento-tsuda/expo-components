import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface DialogFooterProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const DialogFooter = forwardRef<View, DialogFooterProps>(
  ({ children, style, className, ...props }, ref) => {
    return (
      <View ref={ref} className={className} style={cn<ViewStyle>(styles.footer, style)} {...props}>
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
