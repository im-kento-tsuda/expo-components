import React, { forwardRef } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
  type ImageSourcePropType,
  type TextStyle,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import type { MessageRole } from './types';

export type ChatAvatarSize = 'sm' | 'default' | 'lg';

export interface ChatAvatarProps extends Omit<ViewProps, 'style' | 'className' | 'role'> {
  /** メッセージの役割 */
  role?: MessageRole;
  /** アバター画像 */
  source?: ImageSourcePropType;
  /** フォールバック文字（画像がない場合に表示） */
  fallback?: string;
  /** サイズ */
  size?: ChatAvatarSize;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const sizeMap: Record<ChatAvatarSize, number> = {
  sm: 28,
  default: 36,
  lg: 44,
};

const fontSizeMap: Record<ChatAvatarSize, number> = {
  sm: 12,
  default: 14,
  lg: 18,
};

const ChatAvatar = forwardRef<View, ChatAvatarProps>(
  (
    {
      role = 'user',
      source,
      fallback,
      size = 'default',
      style,
      className,
      ...props
    },
    ref
  ) => {
    const colors = useColors();
    const avatarSize = sizeMap[size];
    const fontSize = fontSizeMap[size];

    const isAssistant = role === 'assistant';
    const displayFallback = fallback || (isAssistant ? 'AI' : 'U');

    const containerStyle: ViewStyle = {
      width: avatarSize,
      height: avatarSize,
      backgroundColor: isAssistant ? colors.primary : colors.secondary,
    };

    const textStyle: TextStyle = {
      color: isAssistant ? colors.primaryForeground : colors.secondaryForeground,
      fontSize,
    };

    return (
      <View
        ref={ref}
        className={className}
        style={cn<ViewStyle>(styles.container, containerStyle, style)}
        {...props}
      >
        {source ? (
          <Image source={source} style={styles.image} />
        ) : (
          <Text style={cn<TextStyle>(styles.fallback, textStyle)}>
            {displayFallback.slice(0, 2).toUpperCase()}
          </Text>
        )}
      </View>
    );
  }
);

ChatAvatar.displayName = 'ChatAvatar';

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    fontWeight: '600',
  },
});

export { ChatAvatar };
