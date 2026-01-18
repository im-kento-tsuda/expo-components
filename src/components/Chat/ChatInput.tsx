import React, { forwardRef, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
  type TextStyle,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface ChatInputProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 入力値（制御コンポーネント用） */
  value?: string;
  /** 入力変更コールバック */
  onChangeText?: (text: string) => void;
  /** 送信コールバック */
  onSend?: (text: string) => void;
  /** プレースホルダー */
  placeholder?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 送信ボタンを表示するか */
  showSendButton?: boolean;
  /** カスタム送信ボタンレンダラー */
  renderSendButton?: (onPress: () => void, disabled: boolean) => React.ReactNode;
  /** 左側アクセサリーレンダラー */
  renderLeftAccessory?: () => React.ReactNode;
  /** 右側アクセサリーレンダラー */
  renderRightAccessory?: () => React.ReactNode;
  /** 複数行入力を許可 */
  multiline?: boolean;
  /** 最大行数 */
  maxLines?: number;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** 入力スタイル */
  inputStyle?: TextStyle;
  /** NativeWind className */
  className?: string;
  /** NativeWind inputClassName */
  inputClassName?: string;
}

const ChatInput = forwardRef<View, ChatInputProps>(
  (
    {
      value,
      onChangeText,
      onSend,
      placeholder = 'Type a message...',
      disabled = false,
      showSendButton = true,
      renderSendButton,
      renderLeftAccessory,
      renderRightAccessory,
      multiline = true,
      maxLines = 4,
      style,
      inputStyle,
      className,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const colors = useColors();
    const [internalValue, setInternalValue] = useState('');

    // Use controlled or uncontrolled value
    const inputValue = value ?? internalValue;
    const isEmpty = inputValue.trim().length === 0;
    const isSendDisabled = disabled || isEmpty;

    const handleChangeText = useCallback(
      (text: string) => {
        if (value === undefined) {
          setInternalValue(text);
        }
        onChangeText?.(text);
      },
      [value, onChangeText]
    );

    const handleSend = useCallback(() => {
      if (isSendDisabled) return;

      const text = inputValue.trim();
      onSend?.(text);

      // Clear input after send (for uncontrolled mode)
      if (value === undefined) {
        setInternalValue('');
      }
    }, [inputValue, isSendDisabled, onSend, value]);

    const containerStyle: ViewStyle = {
      backgroundColor: colors.background,
      borderTopColor: colors.border,
    };

    const inputContainerStyle: ViewStyle = {
      backgroundColor: colors.secondary,
    };

    const textInputStyle: TextStyle = {
      color: colors.foreground,
    };

    const sendButtonStyle: ViewStyle = {
      backgroundColor: isSendDisabled ? colors.muted : colors.primary,
    };

    const sendButtonIconColor = isSendDisabled
      ? colors.mutedForeground
      : colors.primaryForeground;

    return (
      <View
        ref={ref}
        className={className}
        style={cn<ViewStyle>(styles.container, containerStyle, style)}
        {...props}
      >
        {renderLeftAccessory && (
          <View style={styles.accessory}>{renderLeftAccessory()}</View>
        )}

        <View
          style={cn<ViewStyle>(styles.inputContainer, inputContainerStyle)}
        >
          <TextInput
            className={inputClassName}
            style={cn<TextStyle>(styles.input, textInputStyle, inputStyle)}
            value={inputValue}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.mutedForeground}
            editable={!disabled}
            multiline={multiline}
            textAlignVertical="center"
            onSubmitEditing={multiline ? undefined : handleSend}
            blurOnSubmit={!multiline}
            returnKeyType={multiline ? 'default' : 'send'}
            {...(maxLines && { maxNumberOfLines: maxLines })}
          />
        </View>

        {renderRightAccessory && (
          <View style={styles.accessory}>{renderRightAccessory()}</View>
        )}

        {showSendButton &&
          (renderSendButton ? (
            renderSendButton(handleSend, isSendDisabled)
          ) : (
            <TouchableOpacity
              onPress={handleSend}
              disabled={isSendDisabled}
              style={cn<ViewStyle>(styles.sendButton, sendButtonStyle)}
              activeOpacity={0.7}
            >
              <SendIcon color={sendButtonIconColor} />
            </TouchableOpacity>
          ))}
      </View>
    );
  }
);

interface SendIconProps {
  color: string;
  size?: number;
}

function SendIcon({ color, size = 20 }: SendIconProps) {
  return (
    <View style={styles.sendIcon}>
      <View
        style={[
          styles.sendArrow,
          {
            borderBottomColor: color,
            borderBottomWidth: size * 0.6,
            borderLeftWidth: size * 0.3,
            borderRightWidth: size * 0.3,
          },
        ]}
      />
    </View>
  );
}

ChatInput.displayName = 'ChatInput';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderTopWidth: 1,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 40,
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    lineHeight: 20,
    maxHeight: 100,
    paddingTop: 0,
    paddingBottom: 0,
  },
  accessory: {
    paddingBottom: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendArrow: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderStyle: 'solid',
  },
});

export { ChatInput };
