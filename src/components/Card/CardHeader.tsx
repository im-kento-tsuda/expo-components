import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface CardHeaderProps extends Omit<ViewProps, 'style'> {
  /** ヘッダーの内容 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const CardHeader = forwardRef<View, CardHeaderProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={cn<ViewStyle>(styles.header, style)} {...props}>
      {children}
    </View>
  );
});

CardHeader.displayName = 'CardHeader';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    gap: 6,
    padding: 24,
  },
});

export { CardHeader };
