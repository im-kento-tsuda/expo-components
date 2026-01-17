import React, { forwardRef, useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
  type TouchableOpacityProps,
} from 'react-native';
import { useColors, type ThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** ボタンのバリアント */
  variant?: ButtonVariant;
  /** ボタンのサイズ */
  size?: ButtonSize;
  /** ローディング状態 */
  loading?: boolean;
  /** ボタンの内容 */
  children?: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストのカスタムスタイル */
  textStyle?: TextStyle;
}

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'default',
      disabled = false,
      loading = false,
      children,
      style,
      textStyle,
      ...props
    },
    ref
  ) => {
    const colors = useColors();
    const isDisabled = disabled || loading;

    const variantStyles = useMemo(() => getVariantStyles(colors), [colors]);
    const textVariantStyles = useMemo(() => getTextVariantStyles(colors), [colors]);

    const containerStyle = cn<ViewStyle>(
      styles.base,
      variantStyles[variant],
      sizeStyles[size],
      isDisabled && styles.disabled,
      style
    );

    const textStyleMerged = cn<TextStyle>(
      styles.text,
      textVariantStyles[variant],
      textSizeStyles[size],
      textStyle
    );

    const loaderColor = getLoaderColor(variant, colors);

    const renderContent = () => {
      if (loading) {
        return <ActivityIndicator color={loaderColor} size="small" />;
      }

      if (typeof children === 'string') {
        return <Text style={textStyleMerged}>{children}</Text>;
      }

      return children;
    };

    return (
      <TouchableOpacity
        ref={ref}
        style={containerStyle}
        disabled={isDisabled}
        activeOpacity={0.7}
        {...props}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

function getLoaderColor(variant: ButtonVariant, colors: ThemeColors): string {
  switch (variant) {
    case 'default':
      return colors.primaryForeground;
    case 'destructive':
      return colors.destructiveForeground;
    case 'outline':
    case 'secondary':
    case 'ghost':
    case 'link':
      return colors.foreground;
    default:
      return colors.primaryForeground;
  }
}

function getVariantStyles(colors: ThemeColors): Record<ButtonVariant, ViewStyle> {
  return {
    default: {
      backgroundColor: colors.primary,
    },
    destructive: {
      backgroundColor: colors.destructive,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    link: {
      backgroundColor: 'transparent',
    },
  };
}

function getTextVariantStyles(colors: ThemeColors): Record<ButtonVariant, TextStyle> {
  return {
    default: {
      color: colors.primaryForeground,
    },
    destructive: {
      color: colors.destructiveForeground,
    },
    outline: {
      color: colors.foreground,
    },
    secondary: {
      color: colors.secondaryForeground,
    },
    ghost: {
      color: colors.foreground,
    },
    link: {
      color: colors.foreground,
      textDecorationLine: 'underline',
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sm: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  lg: {
    height: 44,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  icon: {
    height: 40,
    width: 40,
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
  icon: {
    fontSize: 14,
  },
});

export { Button };
