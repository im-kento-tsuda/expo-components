import type { ImageSourcePropType } from 'react-native';

/** メッセージの役割 */
export type MessageRole = 'user' | 'assistant' | 'system';

/** メッセージのステータス */
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error';

/** チャットメッセージの型 */
export interface ChatMessageType {
  /** 一意なID */
  id: string;
  /** メッセージの役割 */
  role: MessageRole;
  /** メッセージ内容 */
  content: string;
  /** タイムスタンプ */
  timestamp: Date;
  /** アバター画像 */
  avatar?: ImageSourcePropType;
  /** アバターフォールバック文字 */
  avatarFallback?: string;
  /** 送信者名 */
  senderName?: string;
  /** メッセージステータス */
  status?: MessageStatus;
  /** ストリーミング中かどうか */
  isStreaming?: boolean;
  /** 追加メタデータ */
  metadata?: Record<string, unknown>;
}

/** チャット設定 */
export interface ChatConfig {
  /** タイムスタンプを表示するか */
  showTimestamps?: boolean;
  /** アバターを表示するか */
  showAvatars?: boolean;
  /** タイムスタンプのフォーマット関数 */
  formatTimestamp?: (date: Date) => string;
  /** Markdownを有効にするか */
  enableMarkdown?: boolean;
  /** ユーザーバブルの位置 */
  userBubblePosition?: 'left' | 'right';
  /** ストリーミングアニメーションを有効にするか */
  enableStreamingAnimation?: boolean;
}

/** デフォルトの設定 */
export const defaultChatConfig: ChatConfig = {
  showTimestamps: true,
  showAvatars: true,
  formatTimestamp: (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },
  enableMarkdown: true,
  userBubblePosition: 'right',
  enableStreamingAnimation: true,
};
