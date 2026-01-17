import React, { forwardRef } from 'react';
import {
  TextInput,
  StyleSheet,
  type TextStyle,
  type TextInputProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /** カスタムスタイル */
  style?: TextStyle;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ style, editable = true, ...props }, ref) => {
    const colors = useColors();

    const inputStyle: TextStyle = {
      color: colors.foreground,
      borderColor: colors.input,
      backgroundColor: colors.background,
    };

    const placeholderColor = colors.mutedForeground;

    return (
      <TextInput
        ref={ref}
        style={cn<TextStyle>(
          styles.input,
          inputStyle,
          !editable && styles.disabled,
          style
        )}
        placeholderTextColor={placeholderColor}
        editable={editable}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Input };
