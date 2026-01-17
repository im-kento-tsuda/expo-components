import React, { forwardRef } from 'react';
import { Pressable, Text, StyleSheet, type ViewStyle, type TextStyle, type PressableProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useTabs } from './Tabs';

export interface TabsTriggerProps extends Omit<PressableProps, 'style'> {
  /** タブの値 */
  value: string;
  /** 子要素 */
  children: React.ReactNode;
  /** 無効状態 */
  disabled?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const TabsTrigger = forwardRef<React.ElementRef<typeof Pressable>, TabsTriggerProps>(
  ({ value, children, disabled = false, style, ...props }, ref) => {
    const colors = useColors();
    const { value: selectedValue, onValueChange } = useTabs();
    const isSelected = selectedValue === value;

    const triggerStyle: ViewStyle = {
      backgroundColor: isSelected ? colors.background : 'transparent',
    };

    const textStyle: TextStyle = {
      color: isSelected ? colors.foreground : colors.mutedForeground,
    };

    return (
      <Pressable
        ref={ref}
        style={cn<ViewStyle>(
          styles.trigger,
          triggerStyle,
          disabled && styles.disabled,
          style
        )}
        onPress={() => !disabled && onValueChange(value)}
        disabled={disabled}
        accessibilityRole="tab"
        accessibilityState={{ selected: isSelected, disabled }}
        {...props}
      >
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </Pressable>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

const styles = StyleSheet.create({
  trigger: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { TabsTrigger };
