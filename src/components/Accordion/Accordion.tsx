import React, { forwardRef, createContext, useContext, useState, useCallback } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';

type AccordionType = 'single' | 'multiple';

interface AccordionContextType {
  type: AccordionType;
  value: string[];
  onValueChange: (value: string) => void;
  collapsible: boolean;
}

const AccordionContext = createContext<AccordionContextType>({
  type: 'single',
  value: [],
  onValueChange: () => {},
  collapsible: true,
});

export const useAccordion = () => useContext(AccordionContext);

export interface AccordionProps extends Omit<ViewProps, 'style' | 'className'> {
  /** アコーディオンのタイプ */
  type?: AccordionType;
  /** 選択中の値（single: string | undefined, multiple: string[]） */
  value?: string | string[];
  /** デフォルトの選択値 */
  defaultValue?: string | string[];
  /** 値変更時のコールバック */
  onValueChange?: (value: string | string[]) => void;
  /** すべて閉じることを許可（singleのみ） */
  collapsible?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const Accordion = forwardRef<View, AccordionProps>(
  (
    {
      type = 'single',
      value: controlledValue,
      defaultValue,
      onValueChange,
      collapsible = true,
      children,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const getInitialValue = (): string[] => {
      if (defaultValue !== undefined) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    };

    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(getInitialValue);

    const isControlled = controlledValue !== undefined;
    const value = isControlled
      ? Array.isArray(controlledValue)
        ? controlledValue
        : controlledValue
          ? [controlledValue]
          : []
      : uncontrolledValue;

    const handleValueChange = useCallback(
      (itemValue: string) => {
        let newValue: string[];

        if (type === 'single') {
          if (value.includes(itemValue)) {
            newValue = collapsible ? [] : value;
          } else {
            newValue = [itemValue];
          }
        } else {
          if (value.includes(itemValue)) {
            newValue = value.filter((v) => v !== itemValue);
          } else {
            newValue = [...value, itemValue];
          }
        }

        if (!isControlled) {
          setUncontrolledValue(newValue);
        }

        if (type === 'single') {
          onValueChange?.(newValue[0] || '');
        } else {
          onValueChange?.(newValue);
        }
      },
      [type, value, collapsible, isControlled, onValueChange]
    );

    return (
      <AccordionContext.Provider
        value={{ type, value, onValueChange: handleValueChange, collapsible }}
      >
        <View ref={ref} className={className} style={[styles.accordion, style]} {...props}>
          {children}
        </View>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

const styles = StyleSheet.create({
  accordion: {
    width: '100%',
  },
});

export { Accordion };
