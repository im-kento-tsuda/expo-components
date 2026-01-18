import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface TableRowProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const TableRow = forwardRef<View, TableRowProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();

    const rowStyle: ViewStyle = {
      borderBottomColor: colors.border,
    };

    return (
      <View ref={ref} className={className} style={cn<ViewStyle>(styles.row, rowStyle, style)} {...props}>
        {children}
      </View>
    );
  }
);

TableRow.displayName = 'TableRow';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
});

export { TableRow };
