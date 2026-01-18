import React, { forwardRef, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
  type TextStyle,
} from 'react-native';
import { useColors, type ThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useChatContext } from './Chat';

export interface ChatMessageContentProps
  extends Omit<ViewProps, 'style' | 'className'> {
  /** メッセージ内容 */
  content: string;
  /** Markdownを有効にするか */
  enableMarkdown?: boolean;
  /** ストリーミング中かどうか */
  isStreaming?: boolean;
  /** テキストカラー */
  textColor?: string;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストスタイル */
  textStyle?: TextStyle;
  /** NativeWind className */
  className?: string;
  /** NativeWind textClassName */
  textClassName?: string;
}

const ChatMessageContent = forwardRef<View, ChatMessageContentProps>(
  (
    {
      content,
      enableMarkdown,
      isStreaming = false,
      textColor,
      style,
      textStyle,
      className,
      textClassName,
      ...props
    },
    ref
  ) => {
    const colors = useColors();
    const { config } = useChatContext();
    const cursorOpacity = useRef(new Animated.Value(1)).current;

    const shouldUseMarkdown = enableMarkdown ?? config.enableMarkdown ?? true;
    const showStreamingCursor =
      isStreaming && (config.enableStreamingAnimation ?? true);

    useEffect(() => {
      if (showStreamingCursor) {
        const animation = Animated.loop(
          Animated.sequence([
            Animated.timing(cursorOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(cursorOpacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        );
        animation.start();
        return () => animation.stop();
      }
    }, [showStreamingCursor, cursorOpacity]);

    const contentTextStyle: TextStyle = {
      color: textColor || colors.foreground,
    };

    // Simple markdown-like rendering without external dependency
    const renderContent = () => {
      if (!shouldUseMarkdown) {
        return (
          <Text
            className={textClassName}
            style={cn<TextStyle>(styles.text, contentTextStyle, textStyle)}
          >
            {content}
            {showStreamingCursor && <StreamingCursor opacity={cursorOpacity} />}
          </Text>
        );
      }

      // Parse and render markdown content
      return (
        <View style={styles.markdownContainer}>
          <MarkdownRenderer
            content={content}
            colors={colors}
            textStyle={cn<TextStyle>(styles.text, contentTextStyle, textStyle)}
            textClassName={textClassName}
          />
          {showStreamingCursor && <StreamingCursor opacity={cursorOpacity} />}
        </View>
      );
    };

    return (
      <View ref={ref} className={className} style={style} {...props}>
        {renderContent()}
      </View>
    );
  }
);

interface StreamingCursorProps {
  opacity: Animated.Value;
}

function StreamingCursor({ opacity }: StreamingCursorProps) {
  const colors = useColors();
  return (
    <Animated.Text
      style={[styles.cursor, { color: colors.foreground, opacity }]}
    >
      |
    </Animated.Text>
  );
}

interface MarkdownRendererProps {
  content: string;
  colors: ThemeColors;
  textStyle: TextStyle;
  textClassName?: string;
}

function MarkdownRenderer({
  content,
  colors,
  textStyle,
  textClassName,
}: MarkdownRendererProps) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLanguage = '';

  const codeBlockStyle: ViewStyle = {
    backgroundColor: colors.muted,
  };

  const codeTextStyle: TextStyle = {
    color: colors.foreground,
  };

  const inlineCodeStyle: TextStyle = {
    backgroundColor: colors.muted,
    color: colors.foreground,
  };

  lines.forEach((line, index) => {
    // Check for code block start/end
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLanguage = line.slice(3).trim();
        codeBlockContent = [];
      } else {
        // End of code block
        elements.push(
          <View key={`code-${index}`} style={[styles.codeBlock, codeBlockStyle]}>
            {codeBlockLanguage && (
              <Text style={[styles.codeLanguage, { color: colors.mutedForeground }]}>
                {codeBlockLanguage}
              </Text>
            )}
            <Text style={[styles.codeText, codeTextStyle]}>
              {codeBlockContent.join('\n')}
            </Text>
          </View>
        );
        inCodeBlock = false;
        codeBlockContent = [];
        codeBlockLanguage = '';
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Handle headers
    if (line.startsWith('### ')) {
      elements.push(
        <Text key={index} style={[styles.h3, textStyle]}>
          {line.slice(4)}
        </Text>
      );
      return;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <Text key={index} style={[styles.h2, textStyle]}>
          {line.slice(3)}
        </Text>
      );
      return;
    }
    if (line.startsWith('# ')) {
      elements.push(
        <Text key={index} style={[styles.h1, textStyle]}>
          {line.slice(2)}
        </Text>
      );
      return;
    }

    // Handle list items
    if (line.match(/^[-*]\s/)) {
      elements.push(
        <View key={index} style={styles.listItem}>
          <Text style={textStyle}>{'\u2022 '}</Text>
          <Text className={textClassName} style={[textStyle, styles.listText]}>
            {renderInlineFormatting(line.slice(2), inlineCodeStyle, textStyle)}
          </Text>
        </View>
      );
      return;
    }

    // Handle numbered list items
    const numberedMatch = line.match(/^(\d+)\.\s/);
    if (numberedMatch) {
      elements.push(
        <View key={index} style={styles.listItem}>
          <Text style={textStyle}>{numberedMatch[1]}. </Text>
          <Text className={textClassName} style={[textStyle, styles.listText]}>
            {renderInlineFormatting(
              line.slice(numberedMatch[0].length),
              inlineCodeStyle,
              textStyle
            )}
          </Text>
        </View>
      );
      return;
    }

    // Handle empty lines
    if (line.trim() === '') {
      elements.push(<View key={index} style={styles.emptyLine} />);
      return;
    }

    // Regular text with inline formatting
    elements.push(
      <Text key={index} className={textClassName} style={textStyle}>
        {renderInlineFormatting(line, inlineCodeStyle, textStyle)}
      </Text>
    );
  });

  return <>{elements}</>;
}

function renderInlineFormatting(
  text: string,
  inlineCodeStyle: TextStyle,
  textStyle: TextStyle
): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    if (codeMatch && codeMatch.index !== undefined) {
      if (codeMatch.index > 0) {
        parts.push(
          ...renderBoldItalic(remaining.slice(0, codeMatch.index), textStyle, key)
        );
        key += 3;
      }
      parts.push(
        <Text key={key++} style={[styles.inlineCode, inlineCodeStyle]}>
          {codeMatch[1]}
        </Text>
      );
      remaining = remaining.slice(codeMatch.index + codeMatch[0].length);
      continue;
    }

    // No more inline code, handle bold/italic
    parts.push(...renderBoldItalic(remaining, textStyle, key));
    break;
  }

  return parts;
}

function renderBoldItalic(
  text: string,
  textStyle: TextStyle,
  startKey: number
): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = startKey;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(
          <Text key={key++} style={textStyle}>
            {remaining.slice(0, boldMatch.index)}
          </Text>
        );
      }
      parts.push(
        <Text key={key++} style={[textStyle, styles.bold]}>
          {boldMatch[1]}
        </Text>
      );
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }

    // Italic
    const italicMatch = remaining.match(/\*([^*]+)\*/);
    if (italicMatch && italicMatch.index !== undefined) {
      if (italicMatch.index > 0) {
        parts.push(
          <Text key={key++} style={textStyle}>
            {remaining.slice(0, italicMatch.index)}
          </Text>
        );
      }
      parts.push(
        <Text key={key++} style={[textStyle, styles.italic]}>
          {italicMatch[1]}
        </Text>
      );
      remaining = remaining.slice(italicMatch.index + italicMatch[0].length);
      continue;
    }

    // Plain text
    parts.push(
      <Text key={key++} style={textStyle}>
        {remaining}
      </Text>
    );
    break;
  }

  return parts;
}

ChatMessageContent.displayName = 'ChatMessageContent';

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
  markdownContainer: {
    gap: 4,
  },
  cursor: {
    fontSize: 15,
    fontWeight: '400',
  },
  h1: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 3,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 2,
  },
  listItem: {
    flexDirection: 'row',
    paddingLeft: 8,
  },
  listText: {
    flex: 1,
  },
  codeBlock: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  codeLanguage: {
    fontSize: 12,
    marginBottom: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 20,
  },
  inlineCode: {
    fontFamily: 'monospace',
    fontSize: 13,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  bold: {
    fontWeight: '700',
  },
  italic: {
    fontStyle: 'italic',
  },
  emptyLine: {
    height: 8,
  },
});

export { ChatMessageContent };
