import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface TableHeaderProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const TableHeader = forwardRef<View, TableHeaderProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();

    const headerStyle: ViewStyle = {
      backgroundColor: colors.muted,
      borderBottomColor: colors.border,
    };

    return (
      <View ref={ref} className={className} style={cn<ViewStyle>(styles.header, headerStyle, style)} {...props}>
        {children}
      </View>
    );
  }
);

TableHeader.displayName = 'TableHeader';

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
  },
});

export { TableHeader };
