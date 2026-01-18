import React, { forwardRef } from 'react';
import {
  TextInput,
  StyleSheet,
  type TextStyle,
  type TextInputProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface TextareaProps extends Omit<TextInputProps, 'style' | 'multiline' | 'className'> {
  /** 最小行数 */
  minRows?: number;
  /** カスタムスタイル */
  style?: TextStyle;
  /** NativeWind className */
  className?: string;
}

const Textarea = forwardRef<TextInput, TextareaProps>(
  ({ minRows = 3, style, editable = true, className, ...props }, ref) => {
    const colors = useColors();

    const textareaStyle: TextStyle = {
      color: colors.foreground,
      borderColor: colors.input,
      backgroundColor: colors.background,
      minHeight: minRows * 24 + 16, // lineHeight * rows + padding
    };

    const placeholderColor = colors.mutedForeground;

    return (
      <TextInput
        ref={ref}
        className={className}
        style={cn<TextStyle>(
          styles.textarea,
          textareaStyle,
          !editable && styles.disabled,
          style
        )}
        placeholderTextColor={placeholderColor}
        editable={editable}
        multiline
        textAlignVertical="top"
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

const styles = StyleSheet.create({
  textarea: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    lineHeight: 24,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Textarea };
