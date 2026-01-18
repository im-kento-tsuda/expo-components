import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface FieldDescriptionProps extends Omit<TextProps, 'style' | 'className'> {
  /** 説明テキスト */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
  /** NativeWind className */
  className?: string;
}

const FieldDescription = forwardRef<Text, FieldDescriptionProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();

    const descriptionStyle: TextStyle = {
      color: colors.mutedForeground,
    };

    return (
      <Text
        ref={ref}
        className={className}
        style={cn<TextStyle>(styles.description, descriptionStyle, style)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

FieldDescription.displayName = 'FieldDescription';

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export { FieldDescription };
