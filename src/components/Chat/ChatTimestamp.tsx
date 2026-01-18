import React, { forwardRef } from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useChatContext } from './Chat';

export interface ChatTimestampProps extends Omit<TextProps, 'style' | 'className'> {
  /** タイムスタンプ */
  timestamp: Date;
  /** カスタムフォーマット関数 */
  format?: (date: Date) => string;
  /** カスタムスタイル */
  style?: TextStyle;
  /** NativeWind className */
  className?: string;
}

const ChatTimestamp = forwardRef<Text, ChatTimestampProps>(
  ({ timestamp, format, style, className, ...props }, ref) => {
    const colors = useColors();
    const { config } = useChatContext();

    const formatFn = format || config.formatTimestamp || defaultFormat;
    const formattedTime = formatFn(timestamp);

    const textStyle: TextStyle = {
      color: colors.mutedForeground,
    };

    return (
      <Text
        ref={ref}
        className={className}
        style={cn<TextStyle>(styles.timestamp, textStyle, style)}
        {...props}
      >
        {formattedTime}
      </Text>
    );
  }
);

function defaultFormat(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

ChatTimestamp.displayName = 'ChatTimestamp';

const styles = StyleSheet.create({
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
});

export { ChatTimestamp };
