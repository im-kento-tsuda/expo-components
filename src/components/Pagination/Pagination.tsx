import React, { forwardRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type ViewProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

// Pagination
export interface PaginationProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const Pagination = forwardRef<View, PaginationProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.pagination, style]} accessibilityRole="none" {...props}>
        {children}
      </View>
    );
  }
);

Pagination.displayName = 'Pagination';

// PaginationContent
export interface PaginationContentProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const PaginationContent = forwardRef<View, PaginationContentProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.content, style]} {...props}>
        {children}
      </View>
    );
  }
);

PaginationContent.displayName = 'PaginationContent';

// PaginationItem
export interface PaginationItemProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const PaginationItem = forwardRef<View, PaginationItemProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.item, style]} {...props}>
        {children}
      </View>
    );
  }
);

PaginationItem.displayName = 'PaginationItem';

// PaginationLink
export interface PaginationLinkProps {
  /** 押下時のコールバック */
  onPress?: () => void;
  /** アクティブ状態 */
  isActive?: boolean;
  /** 無効状態 */
  disabled?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストのカスタムスタイル */
  textStyle?: TextStyle;
}

const PaginationLink: React.FC<PaginationLinkProps> = ({
  onPress,
  isActive = false,
  disabled = false,
  children,
  style,
  textStyle,
}) => {
  const colors = useColors();

  const containerStyle = cn<ViewStyle>(
    styles.link,
    isActive
      ? { backgroundColor: colors.primary, borderColor: colors.primary }
      : { backgroundColor: 'transparent', borderColor: colors.border },
    disabled && styles.disabled,
    style
  );

  const textStyleMerged = cn<TextStyle>(
    styles.linkText,
    { color: isActive ? colors.primaryForeground : colors.foreground },
    textStyle
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [containerStyle, pressed && !disabled && styles.linkPressed]}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={textStyleMerged}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

PaginationLink.displayName = 'PaginationLink';

// PaginationPrevious
export interface PaginationPreviousProps {
  /** 押下時のコールバック */
  onPress?: () => void;
  /** 無効状態 */
  disabled?: boolean;
  /** ラベル */
  label?: string;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const PaginationPrevious: React.FC<PaginationPreviousProps> = ({
  onPress,
  disabled = false,
  label = '前へ',
  style,
}) => {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.navButton,
        { borderColor: colors.border },
        disabled && styles.disabled,
        pressed && !disabled && styles.linkPressed,
        style,
      ]}
    >
      <Text style={[styles.navIcon, { color: disabled ? colors.mutedForeground : colors.foreground }]}>
        ‹
      </Text>
      <Text style={[styles.navText, { color: disabled ? colors.mutedForeground : colors.foreground }]}>
        {label}
      </Text>
    </Pressable>
  );
};

PaginationPrevious.displayName = 'PaginationPrevious';

// PaginationNext
export interface PaginationNextProps {
  /** 押下時のコールバック */
  onPress?: () => void;
  /** 無効状態 */
  disabled?: boolean;
  /** ラベル */
  label?: string;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const PaginationNext: React.FC<PaginationNextProps> = ({
  onPress,
  disabled = false,
  label = '次へ',
  style,
}) => {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.navButton,
        { borderColor: colors.border },
        disabled && styles.disabled,
        pressed && !disabled && styles.linkPressed,
        style,
      ]}
    >
      <Text style={[styles.navText, { color: disabled ? colors.mutedForeground : colors.foreground }]}>
        {label}
      </Text>
      <Text style={[styles.navIcon, { color: disabled ? colors.mutedForeground : colors.foreground }]}>
        ›
      </Text>
    </Pressable>
  );
};

PaginationNext.displayName = 'PaginationNext';

// PaginationEllipsis
export interface PaginationEllipsisProps {
  /** カスタムスタイル */
  style?: ViewStyle;
}

const PaginationEllipsis: React.FC<PaginationEllipsisProps> = ({ style }) => {
  const colors = useColors();

  return (
    <View style={[styles.ellipsis, style]}>
      <Text style={[styles.ellipsisText, { color: colors.mutedForeground }]}>...</Text>
    </View>
  );
};

PaginationEllipsis.displayName = 'PaginationEllipsis';

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  item: {},
  link: {
    minWidth: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
  },
  linkPressed: {
    opacity: 0.7,
  },
  navButton: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    gap: 4,
  },
  navIcon: {
    fontSize: 18,
    fontWeight: '500',
  },
  navText: {
    fontSize: 14,
    fontWeight: '500',
  },
  ellipsis: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipsisText: {
    fontSize: 14,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
});

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
