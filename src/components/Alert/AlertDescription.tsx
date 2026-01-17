import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface AlertDescriptionProps extends Omit<TextProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const AlertDescription = forwardRef<Text, AlertDescriptionProps>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();

    const textStyle: TextStyle = {
      color: colors.mutedForeground,
    };

    return (
      <Text
        ref={ref}
        style={cn<TextStyle>(styles.description, textStyle, style)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

AlertDescription.displayName = 'AlertDescription';

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export { AlertDescription };
