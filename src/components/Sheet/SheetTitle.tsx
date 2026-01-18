import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface SheetTitleProps extends Omit<TextProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
  /** NativeWind className */
  className?: string;
}

const SheetTitle = forwardRef<Text, SheetTitleProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();

    const textStyle: TextStyle = {
      color: colors.foreground,
    };

    return (
      <Text ref={ref} className={className} style={cn<TextStyle>(styles.title, textStyle, style)} {...props}>
        {children}
      </Text>
    );
  }
);

SheetTitle.displayName = 'SheetTitle';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
});

export { SheetTitle };
