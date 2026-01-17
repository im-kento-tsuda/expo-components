import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface CardTitleProps extends Omit<TextProps, 'style'> {
  /** タイトルのテキスト */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const CardTitle = forwardRef<Text, CardTitleProps>(({ children, style, ...props }, ref) => {
  return (
    <Text ref={ref} style={cn<TextStyle>(styles.title, style)} {...props}>
      {children}
    </Text>
  );
});

CardTitle.displayName = 'CardTitle';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#18181B', // zinc-900
  },
});

export { CardTitle };
