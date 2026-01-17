import React, { forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type TextInputProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export type InputGroupSize = 'default' | 'sm' | 'lg';

export interface InputGroupProps extends Omit<TextInputProps, 'style'> {
  /** 左側のアドオン（テキストまたはコンポーネント） */
  leftAddon?: React.ReactNode;
  /** 右側のアドオン（テキストまたはコンポーネント） */
  rightAddon?: React.ReactNode;
  /** 左側のエレメント（入力フィールド内に配置） */
  leftElement?: React.ReactNode;
  /** 右側のエレメント（入力フィールド内に配置） */
  rightElement?: React.ReactNode;
  /** サイズ */
  size?: InputGroupSize;
  /** コンテナのカスタムスタイル */
  containerStyle?: ViewStyle;
  /** 入力フィールドのカスタムスタイル */
  style?: TextStyle;
}

const InputGroup = forwardRef<TextInput, InputGroupProps>(
  (
    {
      leftAddon,
      rightAddon,
      leftElement,
      rightElement,
      size = 'default',
      containerStyle,
      style,
      editable = true,
      ...props
    },
    ref
  ) => {
    const colors = useColors();

    const hasLeftAddon = leftAddon !== undefined;
    const hasRightAddon = rightAddon !== undefined;

    const inputContainerStyle = cn<ViewStyle>(
      styles.inputContainer,
      {
        borderColor: colors.input,
        backgroundColor: colors.background,
      },
      hasLeftAddon && styles.inputContainerWithLeftAddon,
      hasRightAddon && styles.inputContainerWithRightAddon,
      !editable && styles.disabled
    );

    const inputStyle = cn<TextStyle>(
      styles.input,
      sizeStyles[size],
      { color: colors.foreground },
      leftElement !== undefined && styles.inputWithLeftElement,
      rightElement !== undefined && styles.inputWithRightElement,
      style
    );

    const addonStyle = cn<ViewStyle>(
      styles.addon,
      addonSizeStyles[size],
      {
        backgroundColor: colors.muted,
        borderColor: colors.input,
      }
    );

    const addonTextStyle: TextStyle = {
      color: colors.mutedForeground,
      fontSize: addonTextSizeMap[size],
    };

    const renderAddon = (content: React.ReactNode, position: 'left' | 'right') => {
      const positionStyle = position === 'left' ? styles.addonLeft : styles.addonRight;

      return (
        <View style={[addonStyle, positionStyle]}>
          {typeof content === 'string' ? (
            <Text style={addonTextStyle}>{content}</Text>
          ) : (
            content
          )}
        </View>
      );
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {hasLeftAddon && renderAddon(leftAddon, 'left')}
        <View style={inputContainerStyle}>
          {leftElement && <View style={styles.element}>{leftElement}</View>}
          <TextInput
            ref={ref}
            style={inputStyle}
            placeholderTextColor={colors.mutedForeground}
            editable={editable}
            {...props}
          />
          {rightElement && <View style={styles.element}>{rightElement}</View>}
        </View>
        {hasRightAddon && renderAddon(rightAddon, 'right')}
      </View>
    );
  }
);

InputGroup.displayName = 'InputGroup';

const addonTextSizeMap: Record<InputGroupSize, number> = {
  default: 14,
  sm: 12,
  lg: 16,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
  },
  inputContainerWithLeftAddon: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
  },
  inputContainerWithRightAddon: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },
  input: {
    flex: 1,
  },
  inputWithLeftElement: {
    paddingLeft: 4,
  },
  inputWithRightElement: {
    paddingRight: 4,
  },
  addon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  addonLeft: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderRightWidth: 0,
  },
  addonRight: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderLeftWidth: 0,
  },
  element: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

const sizeStyles = StyleSheet.create({
  default: {
    height: 40,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  sm: {
    height: 36,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  lg: {
    height: 44,
    paddingHorizontal: 14,
    fontSize: 16,
  },
});

const addonSizeStyles = StyleSheet.create({
  default: {
    minWidth: 40,
    paddingHorizontal: 12,
  },
  sm: {
    minWidth: 36,
    paddingHorizontal: 10,
  },
  lg: {
    minWidth: 44,
    paddingHorizontal: 14,
  },
});

export { InputGroup };
