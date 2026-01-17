import React, { forwardRef, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, type ViewStyle, type ViewProps } from 'react-native';
import { useAccordionItem } from './AccordionItem';

export interface AccordionContentProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const AccordionContent = forwardRef<View, AccordionContentProps>(
  ({ children, style, ...props }, ref) => {
    const { isOpen } = useAccordionItem();
    const heightAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
    const [contentHeight, setContentHeight] = React.useState(0);

    useEffect(() => {
      Animated.timing(heightAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [isOpen, heightAnim]);

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

AccordionContent.displayName = 'AccordionContent';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  content: {
    paddingBottom: 16,
  },
});

export { AccordionContent };
