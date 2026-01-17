import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';

export interface TableBodyProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const TableBody = forwardRef<View, TableBodyProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.body, style]} {...props}>
        {children}
      </View>
    );
  }
);

TableBody.displayName = 'TableBody';

const styles = StyleSheet.create({
  body: {},
});

export { TableBody };
