import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';

export interface TableBodyProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const TableBody = forwardRef<View, TableBodyProps>(
  ({ children, style, className, ...props }, ref) => {
    return (
      <View ref={ref} className={className} style={[styles.body, style]} {...props}>
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
