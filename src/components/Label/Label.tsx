import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface LabelProps extends Omit<TextProps, 'style'> {
  /** ラベルのテキスト */
  children: React.ReactNode;
  /** 必須項目かどうか */
  required?: boolean;
  /** 無効状態 */
  disabled?: boolean;
  /** カスタムスタイル */
  style?: TextStyle;
}

const Label = forwardRef<Text, LabelProps>(
  ({ children, required = false, disabled = false, style, ...props }, ref) => {
    const colors = useColors();

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

Label.displayName = 'Label';

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});

export { Label };
