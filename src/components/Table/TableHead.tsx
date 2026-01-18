import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface TableHeadProps extends Omit<TextProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
  /** NativeWind className */
  className?: string;
}

const TableHead = forwardRef<Text, TableHeadProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();

    const headStyle: TextStyle = {
      color: colors.mutedForeground,
    };

    return (
      <Text ref={ref} className={className} style={cn<TextStyle>(styles.head, headStyle, style)} {...props}>
        {children}
      </Text>
    );
  }
);

TableHead.displayName = 'TableHead';

const styles = StyleSheet.create({
  head: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'left',
  },
});

export { TableHead };
