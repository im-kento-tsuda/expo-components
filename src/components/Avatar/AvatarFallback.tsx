import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, type ViewStyle, type TextStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface AvatarFallbackProps extends Omit<ViewProps, 'style'> {
  /** フォールバックの内容（通常はイニシャル） */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストのカスタムスタイル */
  textStyle?: TextStyle;
}

const AvatarFallback = forwardRef<View, AvatarFallbackProps>(
  ({ children, style, textStyle, ...props }, ref) => {
    const colors = useColors();

    const fallbackStyle: ViewStyle = {
      backgroundColor: colors.muted,
    };

    const textColorStyle: TextStyle = {
      color: colors.mutedForeground,
    };

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(styles.fallback, fallbackStyle, style)}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text style={cn<TextStyle>(styles.text, textColorStyle, textStyle)}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

AvatarFallback.displayName = 'AvatarFallback';

const styles = StyleSheet.create({
  fallback: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export { AvatarFallback };
