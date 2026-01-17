import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export type AvatarSize = 'sm' | 'default' | 'lg';

export interface AvatarProps extends Omit<ViewProps, 'style'> {
  /** アバターのサイズ */
  size?: AvatarSize;
  /** 子要素（AvatarImage, AvatarFallback） */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  default: 40,
  lg: 56,
};

const Avatar = forwardRef<View, AvatarProps>(
  ({ size = 'default', children, style, ...props }, ref) => {
    const colors = useColors();
    const avatarSize = sizeMap[size];

    const avatarStyle: ViewStyle = {
      width: avatarSize,
      height: avatarSize,
      backgroundColor: colors.muted,
    };

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(styles.avatar, avatarStyle, style)}
        {...props}
      >
        {children}
      </View>
    );
  }
);

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 9999,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { Avatar };
