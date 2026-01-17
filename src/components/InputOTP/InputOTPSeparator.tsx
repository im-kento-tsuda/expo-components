import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';

export interface InputOTPSeparatorProps extends Omit<ViewProps, 'style'> {
  /** カスタムスタイル */
  style?: ViewStyle;
}

const InputOTPSeparator = forwardRef<View, InputOTPSeparatorProps>(
  ({ style, ...props }, ref) => {
    const colors = useColors();

    return (
      <View ref={ref} style={[styles.separator, style]} {...props}>
        <View style={[styles.dash, { backgroundColor: colors.border }]} />
      </View>
    );
  }
);

InputOTPSeparator.displayName = 'InputOTPSeparator';

const styles = StyleSheet.create({
  separator: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dash: {
    width: 12,
    height: 2,
    borderRadius: 1,
  },
});

export { InputOTPSeparator };
