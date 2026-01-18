import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface TabsListProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const TabsList = forwardRef<View, TabsListProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();

    const listStyle: ViewStyle = {
      backgroundColor: colors.muted,
    };

    return (
      <View ref={ref} className={className} style={cn<ViewStyle>(styles.list, listStyle, style)} {...props}>
        {children}
      </View>
    );
  }
);

TabsList.displayName = 'TabsList';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 8,
    gap: 4,
  },
});

export { TabsList };
