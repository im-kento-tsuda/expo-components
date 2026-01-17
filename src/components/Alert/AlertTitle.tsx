import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface AlertTitleProps extends Omit<TextProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const AlertTitle = forwardRef<Text, AlertTitleProps>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();

    const textStyle: TextStyle = {
      color: colors.foreground,
    };

    return (
      <Text
        ref={ref}
        style={cn<TextStyle>(styles.title, textStyle, style)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 4,
  },
});

export { AlertTitle };
