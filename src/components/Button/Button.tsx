import React, { forwardRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
  type TouchableOpacityProps,
} from 'react-native';
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
    const isDisabled = disabled || loading;

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

    const renderContent = () => {
      if (loading) {
        return (
          <ActivityIndicator
            color={getLoaderColor(variant)}
            size="small"
          />
        );
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

function getLoaderColor(variant: ButtonVariant): string {
  switch (variant) {
    case 'default':
    case 'destructive':
      return '#FFFFFF';
    case 'outline':
    case 'secondary':
    case 'ghost':
    case 'link':
      return '#18181B';
    default:
      return '#FFFFFF';
  }
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

// Shadcn UI カラーパレット
const variantStyles = StyleSheet.create({
  default: {
    backgroundColor: '#18181B', // zinc-900
  },
  destructive: {
    backgroundColor: '#DC2626', // red-600
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E4E4E7', // zinc-200
  },
  secondary: {
    backgroundColor: '#F4F4F5', // zinc-100
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
});

const textVariantStyles = StyleSheet.create({
  default: {
    color: '#FAFAFA', // zinc-50
  },
  destructive: {
    color: '#FAFAFA', // zinc-50
  },
  outline: {
    color: '#18181B', // zinc-900
  },
  secondary: {
    color: '#18181B', // zinc-900
  },
  ghost: {
    color: '#18181B', // zinc-900
  },
  link: {
    color: '#18181B', // zinc-900
    textDecorationLine: 'underline',
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
