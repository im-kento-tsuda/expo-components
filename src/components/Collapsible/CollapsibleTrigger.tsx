import React, { forwardRef } from 'react';
import { Pressable, StyleSheet, type ViewStyle, type PressableProps } from 'react-native';
import { cn } from '../../lib/utils';
import { useCollapsible } from './Collapsible';

export interface CollapsibleTriggerProps extends Omit<PressableProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const CollapsibleTrigger = forwardRef<React.ElementRef<typeof Pressable>, CollapsibleTriggerProps>(
  ({ children, style, ...props }, ref) => {
    const { open, onOpenChange, disabled } = useCollapsible();

    return (
      <Pressable
        ref={ref}
        style={cn<ViewStyle>(styles.trigger, disabled && styles.disabled, style)}
        onPress={() => onOpenChange(!open)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ expanded: open, disabled }}
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const styles = StyleSheet.create({
  trigger: {},
  disabled: {
    opacity: 0.5,
  },
});

export { CollapsibleTrigger };
