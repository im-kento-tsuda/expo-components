import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useSelect } from './Select';

export interface SelectValueProps extends Omit<TextProps, 'style'> {
  /** プレースホルダー */
  placeholder?: string;
  /** カスタムスタイル */
  style?: TextStyle;
}

const SelectValue = forwardRef<Text, SelectValueProps>(
  ({ placeholder, style, ...props }, ref) => {
    const colors = useColors();
    const { value } = useSelect();

    const hasValue = value !== undefined && value !== '';

    const textStyle: TextStyle = {
      color: hasValue ? colors.foreground : colors.mutedForeground,
    };

    return (
      <Text
        ref={ref}
        style={cn<TextStyle>(styles.text, textStyle, style)}
        numberOfLines={1}
        {...props}
      >
        {hasValue ? value : placeholder}
      </Text>
    );
  }
);

SelectValue.displayName = 'SelectValue';

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

export { SelectValue };
