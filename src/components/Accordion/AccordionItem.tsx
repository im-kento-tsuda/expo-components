import React, { forwardRef, createContext, useContext } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useAccordion } from './Accordion';

interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextType>({
  value: '',
  isOpen: false,
});

export const useAccordionItem = () => useContext(AccordionItemContext);

export interface AccordionItemProps extends Omit<ViewProps, 'style'> {
  /** アイテムの値 */
  value: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const AccordionItem = forwardRef<View, AccordionItemProps>(
  ({ value, disabled = false, children, style, ...props }, ref) => {
    const colors = useColors();
    const { value: selectedValues } = useAccordion();
    const isOpen = selectedValues.includes(value);

    const itemStyle: ViewStyle = {
      borderBottomColor: colors.border,
    };

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <View
          ref={ref}
          style={cn<ViewStyle>(styles.item, itemStyle, disabled && styles.disabled, style)}
          {...props}
        >
          {children}
        </View>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { AccordionItem };
