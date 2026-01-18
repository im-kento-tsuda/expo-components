import React, { createContext, useContext, forwardRef, useMemo } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';
import {
  type ChatMessageType,
  type ChatConfig,
  defaultChatConfig,
} from './types';

/** Chat コンテキストの型 */
interface ChatContextType {
  messages: ChatMessageType[];
  isTyping: boolean;
  streamingMessageId: string | null;
  config: ChatConfig;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

/** Chat コンテキストを取得するフック */
export function useChatContext(): ChatContextType {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('Chat components must be used within a Chat provider');
  }
  return context;
}

export interface ChatProps extends Omit<ViewProps, 'style' | 'className'> {
  /** メッセージ一覧 */
  messages: ChatMessageType[];
  /** 入力中かどうか */
  isTyping?: boolean;
  /** ストリーミング中のメッセージID */
  streamingMessageId?: string | null;
  /** チャット設定 */
  config?: Partial<ChatConfig>;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const Chat = forwardRef<View, ChatProps>(
  (
    {
      messages,
      isTyping = false,
      streamingMessageId = null,
      config: configOverrides,
      children,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const config = useMemo(
      () => ({ ...defaultChatConfig, ...configOverrides }),
      [configOverrides]
    );

    const contextValue: ChatContextType = useMemo(
      () => ({
        messages,
        isTyping,
        streamingMessageId,
        config,
      }),
      [messages, isTyping, streamingMessageId, config]
    );

    return (
      <ChatContext.Provider value={contextValue}>
        <View
          ref={ref}
          className={className}
          style={cn<ViewStyle>(styles.container, style)}
          {...props}
        >
          {children}
        </View>
      </ChatContext.Provider>
    );
  }
);

Chat.displayName = 'Chat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { Chat };
