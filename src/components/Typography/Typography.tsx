import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted';

export interface TypographyProps extends Omit<TextProps, 'style'> {
  /** テキストバリアント */
  variant?: TypographyVariant;
  /** テキストの内容 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const Typography = forwardRef<Text, TypographyProps>(
  ({ variant = 'p', children, style, ...props }, ref) => {
    const colors = useColors();

    const colorStyle: TextStyle = {
      color: variant === 'muted' ? colors.mutedForeground : colors.foreground,
    };

    return (
      <Text
        ref={ref}
        style={cn<TextStyle>(variantStyles[variant], colorStyle, style)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

Typography.displayName = 'Typography';

const variantStyles = StyleSheet.create({
  h1: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1.2,
    lineHeight: 44,
  },
  h2: {
    fontSize: 30,
    fontWeight: '600',
    letterSpacing: -0.6,
    lineHeight: 38,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.4,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.2,
    lineHeight: 28,
  },
  p: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  lead: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 28,
  },
  large: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  small: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  muted: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
});

export { Typography };
