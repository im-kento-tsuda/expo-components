import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type ViewProps,
} from 'react-native';
import { useColors, type ThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

// Context
interface NavigationMenuContextType {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
  orientation: 'horizontal' | 'vertical';
}

const NavigationMenuContext = createContext<NavigationMenuContextType | null>(null);

const useNavigationMenu = () => {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error('NavigationMenu components must be used within NavigationMenu');
  }
  return context;
};

// NavigationMenu
export interface NavigationMenuProps extends Omit<ViewProps, 'style'> {
  /** 方向 */
  orientation?: 'horizontal' | 'vertical';
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const NavigationMenu = forwardRef<View, NavigationMenuProps>(
  ({ orientation = 'horizontal', children, style, ...props }, ref) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const colors = useColors();

    return (
      <NavigationMenuContext.Provider value={{ activeItem, setActiveItem, orientation }}>
        <View
          ref={ref}
          style={cn<ViewStyle>(
            styles.menu,
            orientation === 'horizontal' ? styles.menuHorizontal : styles.menuVertical,
            { backgroundColor: colors.background },
            style
          )}
          {...props}
        >
          {children}
        </View>
      </NavigationMenuContext.Provider>
    );
  }
);

NavigationMenu.displayName = 'NavigationMenu';

// NavigationMenuList
export interface NavigationMenuListProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const NavigationMenuList = forwardRef<View, NavigationMenuListProps>(
  ({ children, style, ...props }, ref) => {
    const { orientation } = useNavigationMenu();

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(
          styles.list,
          orientation === 'horizontal' ? styles.listHorizontal : styles.listVertical,
          style
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

NavigationMenuList.displayName = 'NavigationMenuList';

// NavigationMenuItem
export interface NavigationMenuItemProps extends Omit<ViewProps, 'style'> {
  /** アイテムの識別子 */
  value?: string;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const NavigationMenuItem = forwardRef<View, NavigationMenuItemProps>(
  ({ value, children, style, ...props }, ref) => {
    const { activeItem } = useNavigationMenu();
    const isActive = activeItem === value;

    return (
      <View
        ref={ref}
        style={[
          styles.item,
          isActive && styles.itemActive,
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

NavigationMenuItem.displayName = 'NavigationMenuItem';

// NavigationMenuTrigger
export interface NavigationMenuTriggerProps {
  /** トリガーの値 */
  value: string;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストスタイル */
  textStyle?: TextStyle;
}

const NavigationMenuTrigger: React.FC<NavigationMenuTriggerProps> = ({
  value,
  children,
  style,
  textStyle,
}) => {
  const colors = useColors();
  const { activeItem, setActiveItem } = useNavigationMenu();
  const isActive = activeItem === value;

  const handlePress = useCallback(() => {
    setActiveItem(isActive ? null : value);
  }, [isActive, value, setActiveItem]);

  const triggerStyles = getTriggerStyles(colors, isActive);

  return (
    <Pressable
      onPress={handlePress}
      style={cn<ViewStyle>(styles.trigger, triggerStyles.container, style)}
    >
      {typeof children === 'string' ? (
        <Text style={cn<TextStyle>(styles.triggerText, triggerStyles.text, textStyle)}>
          {children}
        </Text>
      ) : (
        children
      )}
      <Text style={[styles.chevron, { color: colors.foreground }]}>
        {isActive ? '▲' : '▼'}
      </Text>
    </Pressable>
  );
};

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

// NavigationMenuContent
export interface NavigationMenuContentProps extends Omit<ViewProps, 'style'> {
  /** コンテンツの値（トリガーと一致させる） */
  value: string;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const NavigationMenuContent = forwardRef<View, NavigationMenuContentProps>(
  ({ value, children, style, ...props }, ref) => {
    const colors = useColors();
    const { activeItem } = useNavigationMenu();
    const isVisible = activeItem === value;

    if (!isVisible) return null;

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(
          styles.content,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
          style
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

NavigationMenuContent.displayName = 'NavigationMenuContent';

// NavigationMenuLink
export interface NavigationMenuLinkProps {
  /** リンク押下時のコールバック */
  onPress?: () => void;
  /** アクティブ状態 */
  active?: boolean;
  /** 無効状態 */
  disabled?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストスタイル */
  textStyle?: TextStyle;
}

const NavigationMenuLink: React.FC<NavigationMenuLinkProps> = ({
  onPress,
  active = false,
  disabled = false,
  children,
  style,
  textStyle,
}) => {
  const colors = useColors();
  const { setActiveItem } = useNavigationMenu();
  const linkStyles = getLinkStyles(colors, active);

  const handlePress = () => {
    if (!disabled) {
      setActiveItem(null);
      onPress?.();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={cn<ViewStyle>(
        styles.link,
        linkStyles.container,
        disabled && styles.disabled,
        style
      )}
    >
      {typeof children === 'string' ? (
        <Text style={cn<TextStyle>(styles.linkText, linkStyles.text, textStyle)}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

NavigationMenuLink.displayName = 'NavigationMenuLink';

// NavigationMenuIndicator
export interface NavigationMenuIndicatorProps extends Omit<ViewProps, 'style'> {
  /** カスタムスタイル */
  style?: ViewStyle;
}

const NavigationMenuIndicator = forwardRef<View, NavigationMenuIndicatorProps>(
  ({ style, ...props }, ref) => {
    const colors = useColors();

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(
          styles.indicator,
          { backgroundColor: colors.primary },
          style
        )}
        {...props}
      />
    );
  }
);

NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';

// NavigationMenuViewport (コンテンツ表示エリア)
export interface NavigationMenuViewportProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children?: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const NavigationMenuViewport = forwardRef<View, NavigationMenuViewportProps>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(
          styles.viewport,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
          style
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

NavigationMenuViewport.displayName = 'NavigationMenuViewport';

// Helper functions
function getTriggerStyles(colors: ThemeColors, isActive: boolean) {
  return {
    container: {
      backgroundColor: isActive ? colors.muted : 'transparent',
    } as ViewStyle,
    text: {
      color: colors.foreground,
    } as TextStyle,
  };
}

function getLinkStyles(colors: ThemeColors, active: boolean) {
  return {
    container: {
      backgroundColor: active ? colors.muted : 'transparent',
    } as ViewStyle,
    text: {
      color: active ? colors.foreground : colors.mutedForeground,
      fontWeight: active ? '600' : '400',
    } as TextStyle,
  };
}

const styles = StyleSheet.create({
  menu: {
    position: 'relative',
    zIndex: 100,
  },
  menuHorizontal: {
    flexDirection: 'column',
    overflow: 'visible',
  },
  menuVertical: {
    flexDirection: 'column',
    overflow: 'visible',
  },
  list: {
    gap: 4,
    overflow: 'visible',
  },
  listHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listVertical: {
    flexDirection: 'column',
  },
  item: {
    position: 'relative',
    zIndex: 1,
  },
  itemActive: {
    zIndex: 1000,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 8,
    marginLeft: 4,
  },
  content: {
    position: 'absolute',
    top: '100%',
    left: 0,
    minWidth: 200,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 4,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  link: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  linkText: {
    fontSize: 14,
  },
  disabled: {
    opacity: 0.5,
  },
  indicator: {
    height: 2,
    width: '100%',
    borderRadius: 1,
  },
  viewport: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 8,
  },
});

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  useNavigationMenu,
};
