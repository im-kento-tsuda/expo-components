import React, { forwardRef, createContext, useContext, useState, useCallback } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType>({
  value: '',
  onValueChange: () => {},
});

export const useTabs = () => useContext(TabsContext);

export interface TabsProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 選択中のタブの値 */
  value?: string;
  /** デフォルトの選択タブ */
  defaultValue?: string;
  /** 値変更時のコールバック */
  onValueChange?: (value: string) => void;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const Tabs = forwardRef<View, TabsProps>(
  ({ value: controlledValue, defaultValue = '', onValueChange, children, style, className, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
        <View ref={ref} className={className} style={[styles.tabs, style]} {...props}>
          {children}
        </View>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

const styles = StyleSheet.create({
  tabs: {
    width: '100%',
  },
});

export { Tabs };
