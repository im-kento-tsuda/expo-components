import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface DialogTitleProps extends Omit<TextProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const DialogTitle = forwardRef<Text, DialogTitleProps>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();

    const textStyle: TextStyle = {
      color: colors.foreground,
    };

    return (
      <Text ref={ref} style={cn<TextStyle>(styles.title, textStyle, style)} {...props}>
        {children}
      </Text>
    );
  }
);

DialogTitle.displayName = 'DialogTitle';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
});

export { DialogTitle };
