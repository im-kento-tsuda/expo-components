import React, { createContext, useContext, forwardRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type ViewProps,
} from 'react-native';
import { useColors, type ThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export type ToggleGroupType = 'single' | 'multiple';
export type ToggleGroupVariant = 'default' | 'outline';
export type ToggleGroupSize = 'default' | 'sm' | 'lg';

interface ToggleGroupContextType {
  type: ToggleGroupType;
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  variant: ToggleGroupVariant;
  size: ToggleGroupSize;
  disabled?: boolean;
}

const ToggleGroupContext = createContext<ToggleGroupContextType | null>(null);

const useToggleGroup = () => {
  const context = useContext(ToggleGroupContext);
  if (!context) {
    throw new Error('ToggleGroupItem must be used within ToggleGroup');
  }
  return context;
};

export interface ToggleGroupProps extends Omit<ViewProps, 'style'> {
  /** 選択タイプ */
  type: ToggleGroupType;
  /** 選択値 */
  value?: string | string[];
  /** デフォルト値 */
  defaultValue?: string | string[];
  /** 値変更時のコールバック */
  onValueChange?: (value: string | string[]) => void;
  /** バリアント */
  variant?: ToggleGroupVariant;
  /** サイズ */
  size?: ToggleGroupSize;
  /** 無効状態 */
  disabled?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const ToggleGroup = forwardRef<View, ToggleGroupProps>(
  (
    {
      type,
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = 'default',
      size = 'default',
      disabled = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const colors = useColors();
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
      defaultValue ?? (type === 'single' ? '' : [])
    );

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = (newValue: string | string[]) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const containerStyle = cn<ViewStyle>(
      styles.container,
      variant === 'outline' && { borderWidth: 1, borderColor: colors.border },
      style
    );

    return (
      <ToggleGroupContext.Provider
        value={{ type, value, onValueChange: handleValueChange, variant, size, disabled }}
      >
        <View ref={ref} style={containerStyle} {...props}>
          {children}
        </View>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = 'ToggleGroup';

export interface ToggleGroupItemProps extends Omit<ViewProps, 'style'> {
  /** アイテムの値 */
  value: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 子要素 */
  children?: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストのカスタムスタイル */
  textStyle?: TextStyle;
}

const ToggleGroupItem = forwardRef<View, ToggleGroupItemProps>(
  ({ value, disabled: itemDisabled, children, style, textStyle, ...props }, ref) => {
    const colors = useColors();
    const { type, value: groupValue, onValueChange, variant, size, disabled: groupDisabled } = useToggleGroup();

    const disabled = itemDisabled || groupDisabled;
    const isPressed = type === 'single'
      ? groupValue === value
      : Array.isArray(groupValue) && groupValue.includes(value);

    const handlePress = () => {
      if (disabled) return;

      if (type === 'single') {
        onValueChange(isPressed ? '' : value);
      } else {
        const currentValues = Array.isArray(groupValue) ? groupValue : [];
        if (isPressed) {
          onValueChange(currentValues.filter((v) => v !== value));
        } else {
          onValueChange([...currentValues, value]);
        }
      }
    };

    const variantStyles = getItemVariantStyles(colors, isPressed, variant);
    const textVariantStyles = getItemTextVariantStyles(colors, isPressed);

    const containerStyle = cn<ViewStyle>(
      styles.item,
      variantStyles,
      sizeStyles[size],
      disabled && styles.disabled,
      style
    );

    const textStyleMerged = cn<TextStyle>(
      styles.text,
      textVariantStyles,
      textSizeStyles[size],
      textStyle
    );

    return (
      <TouchableOpacity
        ref={ref as React.Ref<TouchableOpacity>}
        style={containerStyle}
        disabled={disabled}
        activeOpacity={0.7}
        onPress={handlePress}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text style={textStyleMerged}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

ToggleGroupItem.displayName = 'ToggleGroupItem';

function getItemVariantStyles(
  colors: ThemeColors,
  pressed: boolean,
  variant: ToggleGroupVariant
): ViewStyle {
  const base: ViewStyle = {
    backgroundColor: pressed ? colors.muted : 'transparent',
  };

  if (variant === 'outline') {
    return {
      ...base,
      borderWidth: 0,
      borderRightWidth: 1,
      borderColor: colors.border,
    };
  }

  return base;
}

function getItemTextVariantStyles(colors: ThemeColors, pressed: boolean): TextStyle {
  return {
    color: pressed ? colors.foreground : colors.mutedForeground,
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'hidden',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
});

const sizeStyles = StyleSheet.create({
  default: {
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sm: {
    height: 36,
    paddingHorizontal: 10,
  },
  lg: {
    height: 44,
    paddingHorizontal: 14,
  },
});

const textSizeStyles = StyleSheet.create({
  default: {
    fontSize: 14,
  },
  sm: {
    fontSize: 14,
  },
  lg: {
    fontSize: 14,
  },
});

export { ToggleGroup, ToggleGroupItem };
