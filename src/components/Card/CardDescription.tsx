import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface CardDescriptionProps extends Omit<TextProps, 'style'> {
  /** 説明のテキスト */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const CardDescription = forwardRef<Text, CardDescriptionProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <Text ref={ref} style={cn<TextStyle>(styles.description, style)} {...props}>
        {children}
      </Text>
    );
  }
);

CardDescription.displayName = 'CardDescription';

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#71717A', // zinc-500
  },
});

export { CardDescription };
