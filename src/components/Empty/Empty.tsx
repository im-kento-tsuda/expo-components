import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface EmptyProps extends Omit<ViewProps, 'style' | 'className'> {
  /** タイトル */
  title?: string;
  /** 説明文 */
  description?: string;
  /** アイコン（任意のReact要素） */
  icon?: React.ReactNode;
  /** アクションボタン等 */
  children?: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const Empty = forwardRef<View, EmptyProps>(
  ({ title, description, icon, children, style, className, ...props }, ref) => {
    const colors = useColors();

    return (
      <View ref={ref} className={className} style={cn<ViewStyle>(styles.container, style)} {...props}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        {title && (
          <Text style={[styles.title, { color: colors.foreground }]}>
            {title}
          </Text>
        )}
        {description && (
          <Text style={[styles.description, { color: colors.mutedForeground }]}>
            {description}
          </Text>
        )}
        {children && <View style={styles.actions}>{children}</View>}
      </View>
    );
  }
);

Empty.displayName = 'Empty';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 280,
  },
  actions: {
    marginTop: 8,
  },
});

export { Empty };
