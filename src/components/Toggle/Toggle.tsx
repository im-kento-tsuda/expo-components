import React, { forwardRef, useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type TouchableOpacityProps,
} from 'react-native';
import { useColors, type ThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export type ToggleVariant = 'default' | 'outline';
export type ToggleSize = 'default' | 'sm' | 'lg';

export interface ToggleProps extends Omit<TouchableOpacityProps, 'style'> {
  /** 押下状態 */
  pressed?: boolean;
  /** 押下状態変更時のコールバック */
  onPressedChange?: (pressed: boolean) => void;
  /** バリアント */
  variant?: ToggleVariant;
  /** サイズ */
  size?: ToggleSize;
  /** 子要素 */
  children?: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストのカスタムスタイル */
  textStyle?: TextStyle;
}

const Toggle = forwardRef<TouchableOpacity, ToggleProps>(
  (
    {
      pressed = false,
      onPressedChange,
      variant = 'default',
      size = 'default',
      disabled = false,
      children,
      style,
      textStyle,
      onPress,
      ...props
    },
    ref
  ) => {
    const colors = useColors();

    const variantStyles = useMemo(() => getVariantStyles(colors, pressed), [colors, pressed]);
    const textVariantStyles = useMemo(() => getTextVariantStyles(colors, pressed), [colors, pressed]);

    const containerStyle = cn<ViewStyle>(
      styles.base,
      variantStyles[variant],
      sizeStyles[size],
      disabled && styles.disabled,
      style
    );

    const textStyleMerged = cn<TextStyle>(
      styles.text,
      textVariantStyles[variant],
      textSizeStyles[size],
      textStyle
    );

    const handlePress = (e: Parameters<NonNullable<TouchableOpacityProps['onPress']>>[0]) => {
      onPressedChange?.(!pressed);
      onPress?.(e);
    };

    const renderContent = () => {
      if (typeof children === 'string') {
        return <Text style={textStyleMerged}>{children}</Text>;
      }
      return children;
    };

    return (
      <TouchableOpacity
        ref={ref}
        style={containerStyle}
        disabled={disabled}
        activeOpacity={0.7}
        onPress={handlePress}
        {...props}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }
);

Toggle.displayName = 'Toggle';

function getVariantStyles(colors: ThemeColors, pressed: boolean): Record<ToggleVariant, ViewStyle> {
  return {
    default: {
      backgroundColor: pressed ? colors.muted : 'transparent',
    },
    outline: {
      backgroundColor: pressed ? colors.muted : 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
    },
  };
}

function getTextVariantStyles(colors: ThemeColors, pressed: boolean): Record<ToggleVariant, TextStyle> {
  return {
    default: {
      color: pressed ? colors.foreground : colors.mutedForeground,
    },
    outline: {
      color: pressed ? colors.foreground : colors.mutedForeground,
    },
  };
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
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

export { Toggle };
