import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface CardProps extends Omit<ViewProps, 'style'> {
  /** カードの内容 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const Card = forwardRef<View, CardProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={cn<ViewStyle>(styles.card, style)} {...props}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E4E7', // zinc-200
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});

export { Card };
