import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useTabs } from './Tabs';

export interface TabsContentProps extends Omit<ViewProps, 'style'> {
  /** タブの値 */
  value: string;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const TabsContent = forwardRef<View, TabsContentProps>(
  ({ value, children, style, ...props }, ref) => {
    const { value: selectedValue } = useTabs();

    if (selectedValue !== value) {
      return null;
    }

    return (
      <View
        ref={ref}
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
