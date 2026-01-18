import React, { forwardRef, Children, isValidElement } from 'react';
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

// Breadcrumb
export interface BreadcrumbProps extends Omit<ViewProps, 'style' | 'className'> {
  /** セパレーター */
  separator?: React.ReactNode;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const Breadcrumb = forwardRef<View, BreadcrumbProps>(
  ({ separator, children, style, className, ...props }, ref) => {
    return (
      <View ref={ref} className={className} style={[styles.breadcrumb, style]} accessibilityRole="none" {...props}>
        <BreadcrumbList separator={separator}>{children}</BreadcrumbList>
      </View>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

// BreadcrumbList
export interface BreadcrumbListProps extends Omit<ViewProps, 'style' | 'className'> {
  /** セパレーター */
  separator?: React.ReactNode;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const BreadcrumbList = forwardRef<View, BreadcrumbListProps>(
  ({ separator, children, style, className, ...props }, ref) => {
    const colors = useColors();
    const childArray = Children.toArray(children).filter(isValidElement);

    return (
      <View ref={ref} className={className} style={[styles.list, style]} {...props}>
        {childArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < childArray.length - 1 && (
              <BreadcrumbSeparator>
                {separator || (
                  <Text style={[styles.separatorText, { color: colors.mutedForeground }]}>/</Text>
                )}
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </View>
    );
  }
);

BreadcrumbList.displayName = 'BreadcrumbList';

// BreadcrumbItem
export interface BreadcrumbItemProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const BreadcrumbItem = forwardRef<View, BreadcrumbItemProps>(
  ({ children, style, className, ...props }, ref) => {
    return (
      <View ref={ref} className={className} style={[styles.item, style]} {...props}>
        {children}
      </View>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

// BreadcrumbLink
export interface BreadcrumbLinkProps {
  /** 押下時のコールバック */
  onPress?: () => void;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
  /** asChild - 子要素をそのまま使用 */
  asChild?: boolean;
  /** NativeWind className */
  className?: string;
}

const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
  onPress,
  children,
  style,
  asChild,
  className,
}) => {
  const colors = useColors();

  if (asChild && isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onPress?: () => void }>, {
      onPress,
    });
  }

  return (
    <Pressable onPress={onPress} className={className}>
      {({ pressed }) => (
        <Text
          style={[
            styles.link,
            { color: colors.foreground },
            pressed && styles.linkPressed,
            style,
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
};

BreadcrumbLink.displayName = 'BreadcrumbLink';

// BreadcrumbPage (現在のページ)
export interface BreadcrumbPageProps {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
  /** NativeWind className */
  className?: string;
}

const BreadcrumbPage: React.FC<BreadcrumbPageProps> = ({ children, style, className }) => {
  const colors = useColors();

  return (
    <Text
      className={className}
      style={[styles.page, { color: colors.foreground }, style]}
      accessibilityRole="text"
    >
      {children}
    </Text>
  );
};

BreadcrumbPage.displayName = 'BreadcrumbPage';

// BreadcrumbSeparator
export interface BreadcrumbSeparatorProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children?: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const BreadcrumbSeparator = forwardRef<View, BreadcrumbSeparatorProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();

    return (
      <View ref={ref} className={className} style={[styles.separator, style]} accessibilityRole="none" {...props}>
        {children || (
          <Text style={[styles.separatorText, { color: colors.mutedForeground }]}>/</Text>
        )}
      </View>
    );
  }
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// BreadcrumbEllipsis (省略記号)
export interface BreadcrumbEllipsisProps {
  /** 押下時のコールバック */
  onPress?: () => void;
  /** カスタムスタイル */
  style?: TextStyle;
  /** NativeWind className */
  className?: string;
}

const BreadcrumbEllipsis: React.FC<BreadcrumbEllipsisProps> = ({ onPress, style, className }) => {
  const colors = useColors();

  return (
    <Pressable onPress={onPress} className={className} style={styles.ellipsisContainer}>
      <Text style={[styles.ellipsis, { color: colors.mutedForeground }, style]}>...</Text>
    </Pressable>
  );
};

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

const styles = StyleSheet.create({
  breadcrumb: {
    flexDirection: 'row',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    fontSize: 14,
    fontWeight: '400',
  },
  linkPressed: {
    opacity: 0.7,
  },
  page: {
    fontSize: 14,
    fontWeight: '400',
  },
  separator: {
    paddingHorizontal: 4,
  },
  separatorText: {
    fontSize: 14,
  },
  ellipsisContainer: {
    padding: 4,
  },
  ellipsis: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
