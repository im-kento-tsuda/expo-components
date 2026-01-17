import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';

export interface InputOTPGroupProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const InputOTPGroup = forwardRef<View, InputOTPGroupProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.group, style]} {...props}>
        {children}
      </View>
    );
  }
);

InputOTPGroup.displayName = 'InputOTPGroup';

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    gap: 4,
  },
});

export { InputOTPGroup };
