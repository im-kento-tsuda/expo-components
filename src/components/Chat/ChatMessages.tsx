import React, { forwardRef, useRef, useEffect, useCallback } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  type ViewStyle,
  type ScrollViewProps,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useChatContext } from './Chat';
import { ChatMessage } from './ChatMessage';
import { ChatTypingIndicator } from './ChatTypingIndicator';
import type { ChatMessageType } from './types';

export interface ChatMessagesProps
  extends Omit<ScrollViewProps, 'style' | 'className'> {
  /** 子要素（カスタムコンテンツ） */
  children?: React.ReactNode;
  /** 自動スクロールを有効にするか */
  autoScroll?: boolean;
  /** カスタムメッセージレンダラー */
  renderMessage?: (message: ChatMessageType, index: number) => React.ReactNode;
  /** 入力中インジケーターを表示するか */
  showTypingIndicator?: boolean;
  /** カスタム入力中インジケーター */
  renderTypingIndicator?: () => React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** コンテンツコンテナスタイル */
  contentContainerStyle?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const ChatMessages = forwardRef<ScrollView, ChatMessagesProps>(
  (
    {
      children,
      autoScroll = true,
      renderMessage,
      showTypingIndicator,
      renderTypingIndicator,
      style,
      contentContainerStyle,
      className,
      onScroll,
      ...props
    },
    ref
  ) => {
    const colors = useColors();
    const { messages, isTyping } = useChatContext();
    const scrollViewRef = useRef<ScrollView>(null);
    const previousMessageCountRef = useRef(messages.length);
    const isNearBottomRef = useRef(true);

    // Combine refs
    const handleRef = useCallback(
      (instance: ScrollView | null) => {
        (scrollViewRef as React.MutableRefObject<ScrollView | null>).current = instance;
        if (typeof ref === 'function') {
          ref(instance);
        } else if (ref) {
          (ref as React.MutableRefObject<ScrollView | null>).current = instance;
        }
      },
      [ref]
    );

    // Track if user is near bottom
    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } =
          event.nativeEvent;
        const distanceFromBottom =
          contentSize.height - layoutMeasurement.height - contentOffset.y;
        isNearBottomRef.current = distanceFromBottom < 100;

        onScroll?.(event);
      },
      [onScroll]
    );

    // Auto-scroll when messages change
    useEffect(() => {
      if (autoScroll && messages.length > previousMessageCountRef.current) {
        if (isNearBottomRef.current) {
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }
      }
      previousMessageCountRef.current = messages.length;
    }, [messages.length, autoScroll]);

    // Scroll when typing indicator appears
    useEffect(() => {
      if (autoScroll && isTyping && isNearBottomRef.current) {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    }, [isTyping, autoScroll]);

    const containerStyle: ViewStyle = {
      backgroundColor: colors.background,
    };

    const shouldShowTyping = showTypingIndicator ?? isTyping;

    return (
      <ScrollView
        ref={handleRef}
        className={className}
        style={cn<ViewStyle>(styles.container, containerStyle, style)}
        contentContainerStyle={cn<ViewStyle>(
          styles.contentContainer,
          contentContainerStyle
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...props}
      >
        {children ||
          messages.map((message, index) =>
            renderMessage ? (
              renderMessage(message, index)
            ) : (
              <ChatMessage key={message.id} message={message} />
            )
          )}

        {shouldShowTyping && (
          <View style={styles.typingContainer}>
            {renderTypingIndicator ? (
              renderTypingIndicator()
            ) : (
              <ChatTypingIndicator />
            )}
          </View>
        )}
      </ScrollView>
    );
  }
);

ChatMessages.displayName = 'ChatMessages';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 12,
  },
  typingContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 44, // Align with assistant messages (avatar width + gap)
  },
});

export { ChatMessages };
