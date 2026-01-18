import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import {
  TextInput,
  StyleSheet,
  type TextStyle,
  type TextInputProps,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useInputOTP } from './InputOTP';

export interface InputOTPSlotProps extends Omit<TextInputProps, 'style' | 'value' | 'onChangeText' | 'className'> {
  /** スロットのインデックス */
  index: number;
  /** カスタムスタイル */
  style?: TextStyle;
  /** NativeWind className */
  className?: string;
}

const InputOTPSlot = forwardRef<TextInput, InputOTPSlotProps>(
  ({ index, style, className, ...props }, ref) => {
    const colors = useColors();
    const inputRef = useRef<TextInput | null>(null);
    const { value, disabled, focusedIndex, setFocusedIndex, handleChange, handleKeyPress, registerSlot } = useInputOTP();

    const char = value[index] || '';
    const isFocused = focusedIndex === index;

    useEffect(() => {
      registerSlot(index, inputRef.current);
    }, [index, registerSlot]);

    const slotStyle: TextStyle = {
      borderColor: isFocused ? colors.ring : colors.input,
      backgroundColor: colors.background,
      color: colors.foreground,
    };

    const handleTextChange = useCallback(
      (text: string) => {
        // Get only the new character(s)
        const newChar = text.replace(char, '');
        if (newChar) {
          handleChange(index, newChar);
        }
      },
      [char, index, handleChange]
    );

    const handleKeyPressEvent = useCallback(
      (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        handleKeyPress(index, e.nativeEvent.key);
      },
      [index, handleKeyPress]
    );

    // Combine refs
    const setRefs = useCallback(
      (node: TextInput | null) => {
        inputRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<TextInput | null>).current = node;
        }
      },
      [ref]
    );

    return (
      <TextInput
        ref={setRefs}
        className={className}
        style={cn<TextStyle>(styles.slot, slotStyle, disabled && styles.disabled, style)}
        value={char}
        onChangeText={handleTextChange}
        onKeyPress={handleKeyPressEvent}
        onFocus={() => setFocusedIndex(index)}
        onBlur={() => setFocusedIndex(-1)}
        editable={!disabled}
        maxLength={6}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        selectTextOnFocus
        {...props}
      />
    );
  }
);

InputOTPSlot.displayName = 'InputOTPSlot';

const styles = StyleSheet.create({
  slot: {
    width: 40,
    height: 48,
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { InputOTPSlot };
