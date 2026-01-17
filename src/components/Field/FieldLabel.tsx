import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useField } from './Field';

export interface FieldLabelProps extends Omit<TextProps, 'style'> {
  /** ラベルのテキスト */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const FieldLabel = forwardRef<Text, FieldLabelProps>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();
    const { disabled, required } = useField();

    const labelStyle: TextStyle = {
      color: disabled ? colors.mutedForeground : colors.foreground,
    };

    return (
      <Text
        ref={ref}
        style={cn<TextStyle>(styles.label, labelStyle, style)}
        {...props}
      >
        {children}
        {required && <Text style={{ color: colors.destructive }}> *</Text>}
      </Text>
    );
  }
);

FieldLabel.displayName = 'FieldLabel';

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});

export { FieldLabel };
