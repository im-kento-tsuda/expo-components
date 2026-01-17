import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface SheetDescriptionProps extends Omit<TextProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const SheetDescription = forwardRef<Text, SheetDescriptionProps>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();

    const textStyle: TextStyle = {
      color: colors.mutedForeground,
    };

    return (
      <Text ref={ref} style={cn<TextStyle>(styles.description, textStyle, style)} {...props}>
        {children}
      </Text>
    );
  }
);

SheetDescription.displayName = 'SheetDescription';

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export { SheetDescription };
