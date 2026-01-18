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

export interface CheckboxProps extends Omit<PressableProps, 'style' | 'onPress' | 'className'> {
  /** チェック状態 */
  checked?: boolean;
  /** 状態変更時のコールバック */
  onCheckedChange?: (checked: boolean) => void;
  /** 無効状態 */
  disabled?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const Checkbox = forwardRef<View, CheckboxProps>(
  ({ checked = false, onCheckedChange, disabled = false, style, className, ...props }, ref) => {
    const colors = useColors();

    const handlePress = () => {
      if (!disabled) {
        onCheckedChange?.(!checked);
      }
    };

    const boxStyle: ViewStyle = {
      borderColor: checked ? colors.primary : colors.input,
      backgroundColor: checked ? colors.primary : 'transparent',
    };

    return (
      <Pressable
        ref={ref}
        className={className}
        style={cn<ViewStyle>(
          styles.checkbox,
          boxStyle,
          disabled && styles.disabled,
          style
        )}
        onPress={handlePress}
        disabled={disabled}
        {...props}
      >
        {checked && (
          <Text style={[styles.checkmark, { color: colors.primaryForeground }]}>
            ✓
          </Text>
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = 'Checkbox';

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Checkbox };
