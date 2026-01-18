import React, { forwardRef, createContext, useContext, useState, useCallback } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';

interface CollapsibleContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
}

const CollapsibleContext = createContext<CollapsibleContextType>({
  open: false,
  onOpenChange: () => {},
  disabled: false,
});

export const useCollapsible = () => useContext(CollapsibleContext);

export interface CollapsibleProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 開閉状態 */
  open?: boolean;
  /** デフォルトの開閉状態 */
  defaultOpen?: boolean;
  /** 開閉状態変更時のコールバック */
  onOpenChange?: (open: boolean) => void;
  /** 無効状態 */
  disabled?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const Collapsible = forwardRef<View, CollapsibleProps>(
  (
    {
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      children,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (disabled) return;

        if (!isControlled) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [disabled, isControlled, onOpenChange]
    );

    return (
      <CollapsibleContext.Provider value={{ open, onOpenChange: handleOpenChange, disabled }}>
        <View ref={ref} className={className} style={[styles.collapsible, style]} {...props}>
          {children}
        </View>
      </CollapsibleContext.Provider>
    );
  }
);

Collapsible.displayName = 'Collapsible';

const styles = StyleSheet.create({
  collapsible: {
    width: '100%',
  },
});

export { Collapsible };
