import React, { forwardRef, createContext, useContext } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface RadioGroupContextType {
  value: string | undefined;
  onValueChange: ((value: string) => void) | undefined;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType>({
  value: undefined,
  onValueChange: undefined,
  disabled: false,
});

export const useRadioGroup = () => useContext(RadioGroupContext);

export interface RadioGroupProps extends Omit<ViewProps, 'style'> {
  /** 選択された値 */
  value?: string;
  /** 値変更時のコールバック */
  onValueChange?: (value: string) => void;
  /** 無効状態 */
  disabled?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const RadioGroup = forwardRef<View, RadioGroupProps>(
  ({ value, onValueChange, disabled = false, children, style, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange, disabled }}>
        <View ref={ref} style={cn<ViewStyle>(styles.group, style)} {...props}>
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

const styles = StyleSheet.create({
  group: {
    gap: 8,
  },
});

export { RadioGroup };
