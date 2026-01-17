import React, { forwardRef, createContext, useContext, useState, useCallback } from 'react';
import {
  View,
  type ViewStyle,
  type ViewProps,
} from 'react-native';

interface SelectContextType {
  value: string | undefined;
  onValueChange: ((value: string) => void) | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
}

const SelectContext = createContext<SelectContextType>({
  value: undefined,
  onValueChange: undefined,
  open: false,
  setOpen: () => {},
  disabled: false,
});

export const useSelect = () => useContext(SelectContext);

export interface SelectProps extends Omit<ViewProps, 'style'> {
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

const Select = forwardRef<View, SelectProps>(
  ({ value, onValueChange, disabled = false, children, style, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    const handleSetOpen = useCallback((newOpen: boolean) => {
      if (!disabled) {
        setOpen(newOpen);
      }
    }, [disabled]);

    return (
      <SelectContext.Provider value={{ value, onValueChange, open, setOpen: handleSetOpen, disabled }}>
        <View ref={ref} style={style} {...props}>
          {children}
        </View>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = 'Select';

export { Select };
