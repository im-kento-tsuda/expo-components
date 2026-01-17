import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type ViewProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

interface CommandContextType {
  search: string;
  setSearch: (search: string) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  registerItem: (id: string, visible: boolean) => void;
  unregisterItem: (id: string) => void;
  visibleCount: number;
}

const CommandContext = createContext<CommandContextType | null>(null);

const useCommand = () => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('Command components must be used within Command');
  }
  return context;
};

export interface CommandProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** 値変更時のコールバック */
  onValueChange?: (value: string) => void;
}

const Command = forwardRef<View, CommandProps>(
  ({ children, style, onValueChange, ...props }, ref) => {
    const colors = useColors();
    const [search, setSearch] = useState('');
    const [selectedValue, setSelectedValueState] = useState('');
    const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});

    const setSelectedValue = useCallback(
      (value: string) => {
        setSelectedValueState(value);
        onValueChange?.(value);
      },
      [onValueChange]
    );

    const registerItem = useCallback((id: string, visible: boolean) => {
      setVisibleItems((prev) => ({ ...prev, [id]: visible }));
    }, []);

    const unregisterItem = useCallback((id: string) => {
      setVisibleItems((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, []);

    const visibleCount = useMemo(
      () => Object.values(visibleItems).filter(Boolean).length,
      [visibleItems]
    );

    const containerStyle = cn<ViewStyle>(
      styles.container,
      { backgroundColor: colors.background, borderColor: colors.border },
      style
    );

    return (
      <CommandContext.Provider
        value={{
          search,
          setSearch,
          selectedValue,
          setSelectedValue,
          registerItem,
          unregisterItem,
          visibleCount,
        }}
      >
        <View ref={ref} style={containerStyle} {...props}>
          {children}
        </View>
      </CommandContext.Provider>
    );
  }
);

Command.displayName = 'Command';

// CommandInput
export interface CommandInputProps {
  /** プレースホルダー */
  placeholder?: string;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストのカスタムスタイル */
  textStyle?: TextStyle;
}

const CommandInput: React.FC<CommandInputProps> = ({
  placeholder = '検索...',
  style,
  textStyle,
}) => {
  const colors = useColors();
  const { search, setSearch } = useCommand();

  return (
    <View style={[styles.inputContainer, { borderColor: colors.border }, style]}>
      <Text style={[styles.searchIcon, { color: colors.mutedForeground }]}>🔍</Text>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, { color: colors.foreground }, textStyle]}
      />
    </View>
  );
};

CommandInput.displayName = 'CommandInput';

// CommandList
export interface CommandListProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const CommandList = forwardRef<View, CommandListProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <ScrollView
        ref={ref as React.Ref<ScrollView>}
        style={[styles.list, style]}
        keyboardShouldPersistTaps="handled"
        {...props}
      >
        {children}
      </ScrollView>
    );
  }
);

CommandList.displayName = 'CommandList';

// CommandEmpty
export interface CommandEmptyProps {
  /** 子要素 */
  children?: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const CommandEmpty: React.FC<CommandEmptyProps> = ({ children, style }) => {
  const colors = useColors();
  const { visibleCount } = useCommand();

  // 表示されているアイテムがある場合は何も表示しない
  if (visibleCount > 0) return null;

  return (
    <View style={[styles.empty, style]}>
      <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
        {children || '結果が見つかりません'}
      </Text>
    </View>
  );
};

CommandEmpty.displayName = 'CommandEmpty';

// CommandGroup
export interface CommandGroupProps extends Omit<ViewProps, 'style'> {
  /** グループ見出し */
  heading?: string;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const CommandGroup = forwardRef<View, CommandGroupProps>(
  ({ heading, children, style, ...props }, ref) => {
    const colors = useColors();

    return (
      <View ref={ref} style={[styles.group, style]} {...props}>
        {heading && (
          <Text style={[styles.groupHeading, { color: colors.mutedForeground }]}>
            {heading}
          </Text>
        )}
        {children}
      </View>
    );
  }
);

CommandGroup.displayName = 'CommandGroup';

// CommandItem
export interface CommandItemProps {
  /** 値 */
  value: string;
  /** 押下時のコールバック */
  onSelect?: (value: string) => void;
  /** 無効状態 */
  disabled?: boolean;
  /** 検索キーワード（valueと異なる場合） */
  keywords?: string[];
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const CommandItem: React.FC<CommandItemProps> = ({
  value,
  onSelect,
  disabled = false,
  keywords = [],
  children,
  style,
}) => {
  const colors = useColors();
  const { search, selectedValue, setSelectedValue, registerItem, unregisterItem } = useCommand();
  const itemId = useRef(`item-${value}-${Math.random().toString(36).substr(2, 9)}`).current;

  // 検索フィルタリング
  const isVisible = useMemo(() => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    const valueLower = value.toLowerCase();
    const keywordsLower = keywords.map((k) => k.toLowerCase());

    return (
      valueLower.includes(searchLower) ||
      keywordsLower.some((k) => k.includes(searchLower)) ||
      (typeof children === 'string' && children.toLowerCase().includes(searchLower))
    );
  }, [search, value, keywords, children]);

  // 可視性をコンテキストに登録
  useEffect(() => {
    registerItem(itemId, isVisible);
    return () => unregisterItem(itemId);
  }, [itemId, isVisible, registerItem, unregisterItem]);

  if (!isVisible) return null;

  const isSelected = selectedValue === value;

  const handlePress = () => {
    if (disabled) return;
    setSelectedValue(value);
    onSelect?.(value);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.item,
        isSelected && { backgroundColor: colors.muted },
        pressed && !disabled && { backgroundColor: colors.muted },
        disabled && styles.itemDisabled,
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.itemText, { color: disabled ? colors.mutedForeground : colors.foreground }]}>
          {children}
        </Text>
      ) : (
        children
      )}
      {isSelected && (
        <Text style={[styles.checkIcon, { color: colors.foreground }]}>✓</Text>
      )}
    </Pressable>
  );
};

CommandItem.displayName = 'CommandItem';

// CommandSeparator
export interface CommandSeparatorProps {
  /** カスタムスタイル */
  style?: ViewStyle;
}

const CommandSeparator: React.FC<CommandSeparatorProps> = ({ style }) => {
  const colors = useColors();

  return <View style={[styles.separator, { backgroundColor: colors.border }, style]} />;
};

CommandSeparator.displayName = 'CommandSeparator';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 14,
  },
  list: {
    maxHeight: 300,
  },
  empty: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
  group: {
    paddingVertical: 4,
  },
  groupHeading: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 14,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  checkIcon: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    marginVertical: 4,
  },
});

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  useCommand,
};
