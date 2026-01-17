import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors, type ThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

type AlertVariant = 'default' | 'destructive';

export interface AlertProps extends Omit<ViewProps, 'style'> {
  /** バリアント */
  variant?: AlertVariant;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

function getVariantStyles(colors: ThemeColors): Record<AlertVariant, ViewStyle> {
  return {
    default: {
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
    destructive: {
      backgroundColor: colors.background,
      borderColor: colors.destructive,
    },
  };
}

const Alert = forwardRef<View, AlertProps>(
  ({ variant = 'default', children, style, ...props }, ref) => {
    const colors = useColors();
    const variantStyles = getVariantStyles(colors);

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(styles.alert, variantStyles[variant], style)}
        {...props}
      >
        {children}
      </View>
    );
  }
);

Alert.displayName = 'Alert';

const styles = StyleSheet.create({
  alert: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
});

export { Alert };
