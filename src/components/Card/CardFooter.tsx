import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface CardFooterProps extends Omit<ViewProps, 'style' | 'className'> {
  /** フッターの内容 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const CardFooter = forwardRef<View, CardFooterProps>(({ children, style, className, ...props }, ref) => {
  return (
    <View ref={ref} className={className} style={cn<ViewStyle>(styles.footer, style)} {...props}>
      {children}
    </View>
  );
});

CardFooter.displayName = 'CardFooter';

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: 0,
  },
});

export { CardFooter };
