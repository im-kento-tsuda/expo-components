import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface CardProps extends Omit<ViewProps, 'style'> {
  /** カードの内容 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const Card = forwardRef<View, CardProps>(({ children, style, ...props }, ref) => {
  const colors = useColors();

  const cardStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
  };

  return (
    <View ref={ref} style={cn<ViewStyle>(styles.card, cardStyle, style)} {...props}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});

export { Card };
