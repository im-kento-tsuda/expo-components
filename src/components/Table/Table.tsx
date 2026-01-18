import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface TableProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const Table = forwardRef<View, TableProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();

    const tableStyle: ViewStyle = {
      borderColor: colors.border,
    };

    return (
      <View ref={ref} className={className} style={cn<ViewStyle>(styles.table, tableStyle, style)} {...props}>
        {children}
      </View>
    );
  }
);

Table.displayName = 'Table';

const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export { Table };
