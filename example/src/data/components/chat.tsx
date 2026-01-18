import React, { useState, useCallback, useRef } from 'react';
import { View } from 'react-native';
import {
  Chat,
  ChatMessages,
  ChatMessage,
  ChatInput,
  ChatTypingIndicator,
  type ChatMessageType,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function BasicChatExample() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'こんにちは！何かお手伝いできることはありますか？',
      timestamp: new Date(Date.now() - 60000),
      avatarFallback: 'AI',
    },
    {
      id: '2',
      role: 'user',
      content: 'React Native について教えてください',
      timestamp: new Date(Date.now() - 30000),
      avatarFallback: 'U',
    },
    {
      id: '3',
      role: 'assistant',
      content:
        'React Native は、Facebook が開発したクロスプラットフォームのモバイルアプリ開発フレームワークです。\n\n**主な特徴:**\n- JavaScript と React を使用\n- iOS と Android の両方に対応\n- ネイティブコンポーネントを使用\n\n`npx create-expo-app` で簡単に始められます。',
      timestamp: new Date(),
      avatarFallback: 'AI',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = useCallback((text: string) => {
    const userMessage: ChatMessageType = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      avatarFallback: 'U',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMessage: ChatMessageType = {
        id: generateId(),
        role: 'assistant',
        content: 'ありがとうございます！他にも質問があればお気軽にどうぞ。',
        timestamp: new Date(),
        avatarFallback: 'AI',
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  }, []);

  return (
    <View style={{ height: 400 }}>
      <Chat messages={messages} isTyping={isTyping}>
        <ChatMessages />
        <ChatInput placeholder="メッセージを入力..." onSend={handleSend} />
      </Chat>
    </View>
  );
}

function StreamingExample() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'ストリーミング表示のデモです。メッセージを送信してください。',
      timestamp: new Date(),
      avatarFallback: 'AI',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);

  const handleSend = useCallback((text: string) => {
    const userMessage: ChatMessageType = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      avatarFallback: 'U',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate streaming response
    setTimeout(() => {
      setIsTyping(false);
      const messageId = generateId();
      setStreamingId(messageId);

      const fullResponse =
        'これはストリーミング表示のデモです。テキストが1文字ずつ表示されていきます。';
      let currentText = '';
      let index = 0;

      const aiMessage: ChatMessageType = {
        id: messageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        avatarFallback: 'AI',
        isStreaming: true,
      };
      setMessages((prev) => [...prev, aiMessage]);

      const interval = setInterval(() => {
        if (index < fullResponse.length) {
          currentText += fullResponse[index];
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId ? { ...msg, content: currentText } : msg
            )
          );
          index++;
        } else {
          clearInterval(interval);
          setStreamingId(null);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId ? { ...msg, isStreaming: false } : msg
            )
          );
        }
      }, 50);
    }, 500);
  }, []);

  return (
    <View style={{ height: 400 }}>
      <Chat messages={messages} isTyping={isTyping} streamingMessageId={streamingId}>
        <ChatMessages />
        <ChatInput placeholder="メッセージを入力..." onSend={handleSend} />
      </Chat>
    </View>
  );
}

function TypingIndicatorExample() {
  return (
    <View style={{ padding: 16 }}>
      <ChatTypingIndicator />
    </View>
  );
}

function MarkdownExample() {
  const messages: ChatMessageType[] = [
    {
      id: '1',
      role: 'assistant',
      content: `# Markdown サポート

このコンポーネントは以下の Markdown 記法をサポートしています：

## 見出し
# H1, ## H2, ### H3

## リスト
- 箇条書きリスト
- 番号付きリストも対応

1. 最初の項目
2. 二番目の項目

## テキスト装飾
**太字** と *斜体* が使えます。

## コードブロック
\`インラインコード\` も使えます。

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\``,
      timestamp: new Date(),
      avatarFallback: 'AI',
    },
  ];

  return (
    <View style={{ height: 500 }}>
      <Chat messages={messages}>
        <ChatMessages />
      </Chat>
    </View>
  );
}

export const chatDoc: ComponentDoc = {
  id: 'chat',
  name: 'Chat',
  description: 'AI チャットボット向けの汎用チャット UI コンポーネント',
  category: 'feedback',
  importStatement: `import {
  Chat,
  ChatMessages,
  ChatMessage,
  ChatInput,
  ChatTypingIndicator,
  ChatAvatar,
  ChatTimestamp,
  ChatMessageContent,
  type ChatMessageType,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: [
    'ChatMessages',
    'ChatMessage',
    'ChatMessageContent',
    'ChatInput',
    'ChatTypingIndicator',
    'ChatAvatar',
    'ChatTimestamp',
  ],
  props: [
    {
      name: 'messages',
      type: 'ChatMessageType[]',
      required: true,
      description: 'メッセージ一覧',
    },
    {
      name: 'isTyping',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '入力中インジケーターを表示するか',
    },
    {
      name: 'streamingMessageId',
      type: 'string | null',
      required: false,
      description: 'ストリーミング中のメッセージID',
    },
    {
      name: 'config',
      type: 'Partial<ChatConfig>',
      required: false,
      description: 'チャット設定（タイムスタンプ表示、アバター表示など）',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: '子要素（ChatMessages, ChatInput など）',
    },
  ],
  examples: [
    {
      title: '基本的なチャット',
      description: 'メッセージの送受信、タイピングインジケーター付き',
      code: `const [messages, setMessages] = useState<ChatMessageType[]>([]);
const [isTyping, setIsTyping] = useState(false);

const handleSend = (text: string) => {
  const userMessage: ChatMessageType = {
    id: generateId(),
    role: 'user',
    content: text,
    timestamp: new Date(),
  };
  setMessages(prev => [...prev, userMessage]);
  // AI応答をシミュレート...
};

<Chat messages={messages} isTyping={isTyping}>
  <ChatMessages />
  <ChatInput onSend={handleSend} />
</Chat>`,
      render: () => <BasicChatExample />,
    },
    {
      title: 'ストリーミング表示',
      description: 'リアルタイムで文字が表示されるストリーミング対応',
      code: `const [streamingId, setStreamingId] = useState<string | null>(null);

// ストリーミング開始時
setStreamingId(messageId);

// 文字を追加
setMessages(prev => prev.map(msg =>
  msg.id === messageId
    ? { ...msg, content: msg.content + chunk }
    : msg
));

<Chat messages={messages} streamingMessageId={streamingId}>
  <ChatMessages />
  <ChatInput onSend={handleSend} />
</Chat>`,
      render: () => <StreamingExample />,
    },
    {
      title: '入力中インジケーター',
      description: 'アニメーション付きの入力中表示',
      code: `<ChatTypingIndicator />`,
      render: () => <TypingIndicatorExample />,
    },
    {
      title: 'Markdown レンダリング',
      description: 'コードブロック、リスト、太字などの Markdown 記法をサポート',
      code: `const message: ChatMessageType = {
  id: '1',
  role: 'assistant',
  content: \`# 見出し
**太字** と *斜体*

\\\`\\\`\\\`typescript
const code = "example";
\\\`\\\`\\\`\`,
  timestamp: new Date(),
};`,
      render: () => <MarkdownExample />,
    },
  ],
  notes: [
    'Compound Components パターンを使用しています',
    'ChatMessages は自動スクロール機能を持っています',
    'ストリーミング表示は親コンポーネントが content を更新することで実現します',
    'Markdown レンダリングは組み込みで実装されており、外部依存がありません',
    'ChatConfig で タイムスタンプ表示、アバター表示、ユーザーバブルの位置などをカスタマイズできます',
  ],
};
