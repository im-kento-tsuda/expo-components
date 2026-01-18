import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useChatContext } from './Chat';
import { ChatAvatar } from './ChatAvatar';
import { ChatMessageContent } from './ChatMessageContent';
import { ChatTimestamp } from './ChatTimestamp';
import type { ChatMessageType } from './types';

export interface ChatMessageProps extends Omit<ViewProps, 'style' | 'className'> {
  /** メッセージデータ */
  message: ChatMessageType;
  /** バブルの位置（指定しない場合は設定から決定） */
  position?: 'left' | 'right';
  /** アバターを表示するか */
  showAvatar?: boolean;
  /** タイムスタンプを表示するか */
  showTimestamp?: boolean;
  /** カスタムアバターレンダラー */
  renderAvatar?: (message: ChatMessageType) => React.ReactNode;
  /** カスタムコンテンツレンダラー */
  renderContent?: (message: ChatMessageType) => React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** バブルスタイル */
  bubbleStyle?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const ChatMessage = forwardRef<View, ChatMessageProps>(
  (
    {
      message,
      position,
      showAvatar,
      showTimestamp,
      renderAvatar,
      renderContent,
      style,
      bubbleStyle,
      className,
      ...props
    },
    ref
  ) => {
    const colors = useColors();
    const { config, streamingMessageId } = useChatContext();

    const isUser = message.role === 'user';

    // Determine position based on role and config
    const resolvedPosition =
      position ||
      (isUser
        ? config.userBubblePosition || 'right'
        : 'left');

    const isRight = resolvedPosition === 'right';

    // Determine visibility based on config
    const shouldShowAvatar = showAvatar ?? config.showAvatars ?? true;
    const shouldShowTimestamp = showTimestamp ?? config.showTimestamps ?? true;

    // Check if currently streaming
    const isStreaming =
      message.isStreaming || streamingMessageId === message.id;

    // Bubble styles based on role
    const getBubbleStyle = (): ViewStyle => {
      if (isUser) {
        return {
          backgroundColor: colors.primary,
        };
      }
      return {
        backgroundColor: colors.secondary,
      };
    };

    // Text color based on role
    const getTextColor = (): string => {
      if (isUser) {
        return colors.primaryForeground;
      }
      return colors.secondaryForeground;
    };

    const containerStyle: ViewStyle = {
      flexDirection: isRight ? 'row-reverse' : 'row',
    };

    const messageContainerStyle: ViewStyle = {
      alignItems: isRight ? 'flex-end' : 'flex-start',
    };

    return (
      <View
        ref={ref}
        className={className}
        style={cn<ViewStyle>(styles.container, containerStyle, style)}
        {...props}
      >
        {shouldShowAvatar && (
          <View style={styles.avatarContainer}>
            {renderAvatar ? (
              renderAvatar(message)
            ) : (
              <ChatAvatar
                role={message.role}
                source={message.avatar}
                fallback={message.avatarFallback}
                size="default"
              />
            )}
          </View>
        )}

        <View style={cn<ViewStyle>(styles.messageContainer, messageContainerStyle)}>
          <View
            style={cn<ViewStyle>(
              styles.bubble,
              getBubbleStyle(),
              isRight ? styles.bubbleRight : styles.bubbleLeft,
              bubbleStyle
            )}
          >
            {renderContent ? (
              renderContent(message)
            ) : (
              <ChatMessageContent
                content={message.content}
                isStreaming={isStreaming}
                textColor={getTextColor()}
              />
            )}
          </View>

          {shouldShowTimestamp && (
            <ChatTimestamp
              timestamp={message.timestamp}
              style={isRight ? styles.timestampRight : styles.timestampLeft}
            />
          )}
        </View>
      </View>
    );
  }
);

ChatMessage.displayName = 'ChatMessage';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 8,
    alignItems: 'flex-end',
  },
  avatarContainer: {
    paddingBottom: 20,
  },
  messageContainer: {
    flex: 1,
    maxWidth: '80%',
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleLeft: {
    borderRadius: 16,
    borderTopLeftRadius: 4,
  },
  bubbleRight: {
    borderRadius: 16,
    borderTopRightRadius: 4,
  },
  timestampLeft: {
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
  timestampRight: {
    alignSelf: 'flex-end',
    marginRight: 4,
  },
});

export { ChatMessage };
