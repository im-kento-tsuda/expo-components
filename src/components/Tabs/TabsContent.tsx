import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useTabs } from './Tabs';

export interface TabsContentProps extends Omit<ViewProps, 'style' | 'className'> {
  /** タブの値 */
  value: string;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const TabsContent = forwardRef<View, TabsContentProps>(
  ({ value, children, style, className, ...props }, ref) => {
    const { value: selectedValue } = useTabs();

    if (selectedValue !== value) {
      return null;
    }

    return (
      <View
        ref={ref}
        className={className}
        style={[styles.content, style]}
        accessible
        accessibilityLabel="Tab content"
        {...props}
      >
        {children}
      </View>
    );
  }
);

TabsContent.displayName = 'TabsContent';

const styles = StyleSheet.create({
  content: {
    marginTop: 8,
  },
});

export { TabsContent };
