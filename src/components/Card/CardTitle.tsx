import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface CardTitleProps extends Omit<TextProps, 'style'> {
  /** タイトルのテキスト */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const CardTitle = forwardRef<Text, CardTitleProps>(({ children, style, ...props }, ref) => {
  const colors = useColors();

  const titleStyle: TextStyle = {
    color: colors.cardForeground,
  };

  return (
    <Text ref={ref} style={cn<TextStyle>(styles.title, titleStyle, style)} {...props}>
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
  },
});

export { CardTitle };
