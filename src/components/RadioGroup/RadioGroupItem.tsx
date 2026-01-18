import React, { forwardRef } from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  type ViewStyle,
  type PressableProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useRadioGroup } from './RadioGroup';

export interface RadioGroupItemProps extends Omit<PressableProps, 'style' | 'onPress' | 'className'> {
  /** ラジオボタンの値 */
  value: string;
  /** 無効状態（RadioGroupのdisabledより優先） */
  disabled?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const RadioGroupItem = forwardRef<View, RadioGroupItemProps>(
  ({ value, disabled: itemDisabled, style, className, ...props }, ref) => {
    const colors = useColors();
    const { value: groupValue, onValueChange, disabled: groupDisabled } = useRadioGroup();

    const isSelected = groupValue === value;
    const isDisabled = itemDisabled ?? groupDisabled;

    const handlePress = () => {
      if (!isDisabled && onValueChange) {
        onValueChange(value);
      }
    };

    const radioStyle: ViewStyle = {
      borderColor: isSelected ? colors.primary : colors.input,
    };

    return (
      <Pressable
        ref={ref}
        className={className}
        style={cn<ViewStyle>(
          styles.radio,
          radioStyle,
          isDisabled && styles.disabled,
          style
        )}
        onPress={handlePress}
        disabled={isDisabled}
        {...props}
      >
        {isSelected && (
          <View style={[styles.indicator, { backgroundColor: colors.primary }]} />
        )}
      </Pressable>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';

const styles = StyleSheet.create({
  radio: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { RadioGroupItem };
