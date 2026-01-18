import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface TableFooterProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const TableFooter = forwardRef<View, TableFooterProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();

    const footerStyle: ViewStyle = {
      backgroundColor: colors.muted,
      borderTopColor: colors.border,
    };

    return (
      <View ref={ref} className={className} style={cn<ViewStyle>(styles.footer, footerStyle, style)} {...props}>
        {children}
      </View>
    );
  }
);

TableFooter.displayName = 'TableFooter';

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
  },
});

export { TableFooter };
