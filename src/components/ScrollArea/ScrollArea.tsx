import React, { forwardRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  type ViewStyle,
  type ScrollViewProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface ScrollAreaProps extends Omit<ScrollViewProps, 'style'> {
  /** スクロール方向 */
  orientation?: 'vertical' | 'horizontal';
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** コンテンツコンテナスタイル */
  contentContainerStyle?: ViewStyle;
}

const ScrollArea = forwardRef<ScrollView, ScrollAreaProps>(
  ({ orientation = 'vertical', children, style, contentContainerStyle, ...props }, ref) => {
    const colors = useColors();
    const isHorizontal = orientation === 'horizontal';

    return (
      <ScrollView
        ref={ref}
        horizontal={isHorizontal}
        showsVerticalScrollIndicator={!isHorizontal}
        showsHorizontalScrollIndicator={isHorizontal}
        style={cn<ViewStyle>(styles.scrollArea, style)}
        contentContainerStyle={contentContainerStyle}
        indicatorStyle={colors.foreground === '#ffffff' ? 'white' : 'black'}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
});

export { ScrollArea };
