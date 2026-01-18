import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface CardTitleProps extends Omit<TextProps, 'style' | 'className'> {
  /** タイトルのテキスト */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
  /** NativeWind className */
  className?: string;
}

const CardTitle = forwardRef<Text, CardTitleProps>(({ children, style, className, ...props }, ref) => {
  const colors = useColors();

  const titleStyle: TextStyle = {
    color: colors.cardForeground,
  };

  return (
    <Text ref={ref} className={className} style={cn<TextStyle>(styles.title, titleStyle, style)} {...props}>
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
