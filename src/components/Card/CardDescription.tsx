import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface CardDescriptionProps extends Omit<TextProps, 'style' | 'className'> {
  /** 説明のテキスト */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
  /** NativeWind className */
  className?: string;
}

const CardDescription = forwardRef<Text, CardDescriptionProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();

    const descriptionStyle: TextStyle = {
      color: colors.mutedForeground,
    };

    return (
      <Text ref={ref} className={className} style={cn<TextStyle>(styles.description, descriptionStyle, style)} {...props}>
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
  },
});

export { CardDescription };
