import React, { forwardRef, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, type ViewStyle, type ViewProps } from 'react-native';
import { useCollapsible } from './Collapsible';

export interface CollapsibleContentProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const CollapsibleContent = forwardRef<View, CollapsibleContentProps>(
  ({ children, style, ...props }, ref) => {
    const { open } = useCollapsible();
    const heightAnim = useRef(new Animated.Value(open ? 1 : 0)).current;
    const [contentHeight, setContentHeight] = React.useState(0);

    useEffect(() => {
      Animated.timing(heightAnim, {
        toValue: open ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [open, heightAnim]);

    const animatedHeight = heightAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentHeight],
    });

    const opacity = heightAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            height: contentHeight === 0 ? undefined : animatedHeight,
            opacity,
          },
        ]}
      >
        <View
          ref={ref}
          style={[styles.content, style]}
          onLayout={(e) => {
            const height = e.nativeEvent.layout.height;
            if (contentHeight === 0 && height > 0) {
              setContentHeight(height);
            }
          }}
          {...props}
        >
          {children}
        </View>
      </Animated.View>
    );
  }
);

CollapsibleContent.displayName = 'CollapsibleContent';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  content: {},
});

export { CollapsibleContent };
