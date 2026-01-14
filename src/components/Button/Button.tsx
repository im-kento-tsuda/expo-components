import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
  type TouchableOpacityProps,
} from 'react-native';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** ボタンのラベル */
  title: string;
  /** ボタンのバリアント */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** ボタンのサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** ローディング状態 */
  loading?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストのカスタムスタイル */
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? '#007AFF' : '#FFFFFF'}
          size="small"
        />
      ) : (
        <Text style={[styles.text, textVariantStyles[variant], textSizeStyles[size], textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: '#007AFF' },
  secondary: { backgroundColor: '#5856D6' },
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#007AFF' },
  ghost: { backgroundColor: 'transparent' },
});

const textVariantStyles = StyleSheet.create({
  primary: { color: '#FFFFFF' },
  secondary: { color: '#FFFFFF' },
  outline: { color: '#007AFF' },
  ghost: { color: '#007AFF' },
});

const sizeStyles = StyleSheet.create({
  sm: { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 },
  md: { paddingVertical: 12, paddingHorizontal: 24, minHeight: 44 },
  lg: { paddingVertical: 16, paddingHorizontal: 32, minHeight: 52 },
});

const textSizeStyles = StyleSheet.create({
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
});
