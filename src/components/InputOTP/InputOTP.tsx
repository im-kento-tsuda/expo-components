import React, { forwardRef, createContext, useContext, useState, useCallback, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
} from 'react-native';

interface InputOTPContextType {
  value: string;
  maxLength: number;
  disabled: boolean;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  handleChange: (index: number, char: string) => void;
  handleKeyPress: (index: number, key: string) => void;
  registerSlot: (index: number, ref: TextInput | null) => void;
}

const InputOTPContext = createContext<InputOTPContextType>({
  value: '',
  maxLength: 6,
  disabled: false,
  focusedIndex: -1,
  setFocusedIndex: () => {},
  handleChange: () => {},
  handleKeyPress: () => {},
  registerSlot: () => {},
});

export const useInputOTP = () => useContext(InputOTPContext);

export interface InputOTPProps extends Omit<ViewProps, 'style'> {
  /** 現在の値 */
  value: string;
  /** 値変更時のコールバック */
  onValueChange: (value: string) => void;
  /** 入力完了時のコールバック */
  onComplete?: (value: string) => void;
  /** 最大文字数 */
  maxLength?: number;
  /** 無効状態 */
  disabled?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const InputOTP = forwardRef<View, InputOTPProps>(
  ({ value, onValueChange, onComplete, maxLength = 6, disabled = false, children, style, ...props }, ref) => {
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const slotsRef = useRef<(TextInput | null)[]>([]);

    const registerSlot = useCallback((index: number, inputRef: TextInput | null) => {
      slotsRef.current[index] = inputRef;
    }, []);

    const handleChange = useCallback(
      (index: number, char: string) => {
        // Handle paste (multiple characters)
        if (char.length > 1) {
          const newValue = char.slice(0, maxLength);
          onValueChange(newValue);
          if (newValue.length === maxLength) {
            onComplete?.(newValue);
          }
          // Focus last filled slot or next empty
          const nextIndex = Math.min(newValue.length, maxLength - 1);
          slotsRef.current[nextIndex]?.focus();
          return;
        }

        // Handle single character
        const newValue = value.slice(0, index) + char + value.slice(index + 1);
        onValueChange(newValue);

        // Move to next slot
        if (char && index < maxLength - 1) {
          slotsRef.current[index + 1]?.focus();
        }

        // Check completion
        if (newValue.length === maxLength && !newValue.includes('')) {
          const completeValue = newValue.replace(/\s/g, '');
          if (completeValue.length === maxLength) {
            onComplete?.(completeValue);
          }
        }
      },
      [value, maxLength, onValueChange, onComplete]
    );

    const handleKeyPress = useCallback(
      (index: number, key: string) => {
        if (key === 'Backspace') {
          if (!value[index] && index > 0) {
            // Move to previous slot and clear it
            const newValue = value.slice(0, index - 1) + value.slice(index);
            onValueChange(newValue);
            slotsRef.current[index - 1]?.focus();
          } else {
            // Clear current slot
            const newValue = value.slice(0, index) + value.slice(index + 1);
            onValueChange(newValue);
          }
        }
      },
      [value, onValueChange]
    );

    return (
      <InputOTPContext.Provider
        value={{
          value,
          maxLength,
          disabled,
          focusedIndex,
          setFocusedIndex,
          handleChange,
          handleKeyPress,
          registerSlot,
        }}
      >
        <View ref={ref} style={[styles.container, style]} {...props}>
          {children}
        </View>
      </InputOTPContext.Provider>
    );
  }
);

InputOTP.displayName = 'InputOTP';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { InputOTP };
