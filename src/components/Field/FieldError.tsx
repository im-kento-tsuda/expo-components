import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useField } from './Field';

export interface FieldErrorProps extends Omit<TextProps, 'style' | 'children'> {
  /** エラーメッセージ（省略時はFieldのerrorを使用） */
  children?: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const FieldError = forwardRef<Text, FieldErrorProps>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();
    const { error } = useField();

    const message = children || error;

    if (!message) {
      return null;
    }

    const errorStyle: TextStyle = {
      color: colors.destructive,
    };

    return (
      <Text
        ref={ref}
        style={cn<TextStyle>(styles.error, errorStyle, style)}
        accessibilityRole="alert"
        {...props}
      >
        {message}
      </Text>
    );
  }
);

FieldError.displayName = 'FieldError';

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
});

export { FieldError };
