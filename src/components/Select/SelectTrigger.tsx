import React, { forwardRef } from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type PressableProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useSelect } from './Select';

export interface SelectTriggerProps extends Omit<PressableProps, 'style' | 'onPress' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const SelectTrigger = forwardRef<View, SelectTriggerProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();
    const { open, setOpen, disabled } = useSelect();

    const handlePress = () => {
      setOpen(!open);
    };

    const triggerStyle: ViewStyle = {
      borderColor: colors.input,
      backgroundColor: colors.background,
    };

    return (
      <Pressable
        ref={ref}
        className={className}
        style={cn<ViewStyle>(
          styles.trigger,
          triggerStyle,
          disabled && styles.disabled,
          style
        )}
        onPress={handlePress}
        disabled={disabled}
        {...props}
      >
        <View style={styles.content}>
          {children}
        </View>
        <Text style={[styles.chevron, { color: colors.mutedForeground }]}>▼</Text>
      </Pressable>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 40,
  },
  content: {
    flex: 1,
  },
  chevron: {
    fontSize: 10,
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { SelectTrigger };
