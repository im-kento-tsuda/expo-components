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

export interface SelectItemProps extends Omit<PressableProps, 'style' | 'onPress'> {
  /** アイテムの値 */
  value: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 子要素（表示テキスト） */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const SelectItem = forwardRef<View, SelectItemProps>(
  ({ value, disabled = false, children, style, ...props }, ref) => {
    const colors = useColors();
    const { value: selectedValue, onValueChange, setOpen } = useSelect();

    const isSelected = selectedValue === value;

    const handlePress = () => {
      if (!disabled && onValueChange) {
        onValueChange(value);
        setOpen(false);
      }
    };

    const itemStyle: ViewStyle = {
      backgroundColor: isSelected ? colors.muted : 'transparent',
    };

    return (
      <Pressable
        ref={ref}
        style={cn<ViewStyle>(
          styles.item,
          itemStyle,
          disabled && styles.disabled,
          style
        )}
        onPress={handlePress}
        disabled={disabled}
        {...props}
      >
        <View style={styles.checkContainer}>
          {isSelected && (
            <Text style={[styles.check, { color: colors.foreground }]}>✓</Text>
          )}
        </View>
        <Text
          style={[
            styles.text,
            { color: disabled ? colors.mutedForeground : colors.foreground },
          ]}
        >
          {children}
        </Text>
      </Pressable>
    );
  }
);

SelectItem.displayName = 'SelectItem';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 40,
  },
  checkContainer: {
    width: 20,
    marginRight: 8,
  },
  check: {
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { SelectItem };
