import React, { forwardRef, Children, cloneElement, isValidElement } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupProps extends Omit<ViewProps, 'style'> {
  /** 方向 */
  orientation?: ButtonGroupOrientation;
  /** 子要素（Buttonコンポーネント） */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const ButtonGroup = forwardRef<View, ButtonGroupProps>(
  ({ orientation = 'horizontal', children, style, ...props }, ref) => {
    const colors = useColors();

    const containerStyle = cn<ViewStyle>(
      styles.container,
      orientation === 'horizontal' ? styles.horizontal : styles.vertical,
      { borderColor: colors.border },
      style
    );

    // 子要素を処理してスタイルを調整
    const childCount = Children.count(children);
    const enhancedChildren = Children.map(children, (child, index) => {
      if (!isValidElement(child)) return child;

      const isFirst = index === 0;
      const isLast = index === childCount - 1;

      // ボタンのスタイルを調整
      const buttonStyle: ViewStyle = {
        borderRadius: 0,
        ...(orientation === 'horizontal' && {
          borderLeftWidth: isFirst ? 1 : 0,
          borderRightWidth: 1,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopLeftRadius: isFirst ? 6 : 0,
          borderBottomLeftRadius: isFirst ? 6 : 0,
          borderTopRightRadius: isLast ? 6 : 0,
          borderBottomRightRadius: isLast ? 6 : 0,
        }),
        ...(orientation === 'vertical' && {
          borderTopWidth: isFirst ? 1 : 0,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopLeftRadius: isFirst ? 6 : 0,
          borderTopRightRadius: isFirst ? 6 : 0,
          borderBottomLeftRadius: isLast ? 6 : 0,
          borderBottomRightRadius: isLast ? 6 : 0,
        }),
        borderColor: colors.border,
      };

      return cloneElement(child as React.ReactElement<{ style?: ViewStyle }>, {
        style: cn<ViewStyle>(buttonStyle, (child.props as { style?: ViewStyle }).style),
      });
    });

    return (
      <View ref={ref} style={containerStyle} {...props}>
        {enhancedChildren}
      </View>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
});

export { ButtonGroup };
