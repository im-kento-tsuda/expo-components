import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface CardContentProps extends Omit<ViewProps, 'style'> {
  /** コンテンツの内容 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const CardContent = forwardRef<View, CardContentProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={cn<ViewStyle>(styles.content, style)} {...props}>
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
