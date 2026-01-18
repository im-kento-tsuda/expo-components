import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface CardHeaderProps extends Omit<ViewProps, 'style' | 'className'> {
  /** ヘッダーの内容 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const CardHeader = forwardRef<View, CardHeaderProps>(({ children, style, className, ...props }, ref) => {
  return (
    <View ref={ref} className={className} style={cn<ViewStyle>(styles.header, style)} {...props}>
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
