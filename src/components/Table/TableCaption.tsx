import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface TableCaptionProps extends Omit<TextProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const TableCaption = forwardRef<Text, TableCaptionProps>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();

    const captionStyle: TextStyle = {
      color: colors.mutedForeground,
    };

    return (
      <Text ref={ref} style={cn<TextStyle>(styles.caption, captionStyle, style)} {...props}>
        {children}
      </Text>
    );
  }
);

TableCaption.displayName = 'TableCaption';

const styles = StyleSheet.create({
  caption: {
    paddingVertical: 12,
    fontSize: 12,
    textAlign: 'center',
  },
});

export { TableCaption };
