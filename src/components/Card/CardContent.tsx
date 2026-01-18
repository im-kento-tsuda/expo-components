import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface CardContentProps extends Omit<ViewProps, 'style' | 'className'> {
  /** コンテンツの内容 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const CardContent = forwardRef<View, CardContentProps>(({ children, style, className, ...props }, ref) => {
  return (
    <View ref={ref} className={className} style={cn<ViewStyle>(styles.content, style)} {...props}>
      {children}
    </View>
  );
});

CardContent.displayName = 'CardContent';

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingTop: 0,
  },
});

export { CardContent };
