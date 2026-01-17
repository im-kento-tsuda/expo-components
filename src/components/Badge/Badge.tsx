import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, type ViewStyle, type TextStyle, type ViewProps } from 'react-native';
import { useColors, type ThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface BadgeProps extends Omit<ViewProps, 'style'> {
  /** バッジのバリアント */
  variant?: BadgeVariant;
  /** バッジのテキスト */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストのカスタムスタイル */
  textStyle?: TextStyle;
}

const Badge = forwardRef<View, BadgeProps>(
  ({ variant = 'default', children, style, textStyle, ...props }, ref) => {
    const colors = useColors();

    const variantStyles = getVariantStyles(colors);
    const textVariantStyles = getTextVariantStyles(colors);

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(styles.badge, variantStyles[variant], style)}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text style={cn<TextStyle>(styles.text, textVariantStyles[variant], textStyle)}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

Badge.displayName = 'Badge';

function getVariantStyles(colors: ThemeColors): Record<BadgeVariant, ViewStyle> {
  return {
    default: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    destructive: {
      backgroundColor: colors.destructive,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
    },
  };
}

function getTextVariantStyles(colors: ThemeColors): Record<BadgeVariant, TextStyle> {
  return {
    default: {
      color: colors.primaryForeground,
    },
    secondary: {
      color: colors.secondaryForeground,
    },
    destructive: {
      color: colors.destructiveForeground,
    },
    outline: {
      color: colors.foreground,
    },
  };
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 9999,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
});

export { Badge };
