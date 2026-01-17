import React, { forwardRef, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  Dimensions,
  type ViewStyle,
  type TextStyle,
  type ViewProps,
  type LayoutRectangle,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from './Command';

export interface ComboboxOption {
  /** 値 */
  value: string;
  /** 表示ラベル */
  label: string;
  /** 無効状態 */
  disabled?: boolean;
  /** グループ */
  group?: string;
}

export interface ComboboxProps extends Omit<ViewProps, 'style'> {
  /** 選択値 */
  value?: string;
  /** 値変更時のコールバック */
  onValueChange?: (value: string) => void;
  /** オプション */
  options: ComboboxOption[];
  /** プレースホルダー */
  placeholder?: string;
  /** 検索プレースホルダー */
  searchPlaceholder?: string;
  /** 空メッセージ */
  emptyMessage?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストのカスタムスタイル */
  textStyle?: TextStyle;
}

const Combobox = forwardRef<View, ComboboxProps>(
  (
    {
      value,
      onValueChange,
      options,
      placeholder = '選択してください',
      searchPlaceholder = '検索...',
      emptyMessage = '見つかりません',
      disabled = false,
      style,
      textStyle,
      ...props
    },
    _ref
  ) => {
    const colors = useColors();
    const [open, setOpen] = useState(false);
    const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
    const triggerRef = useRef<View>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const handleOpen = useCallback(() => {
      if (disabled) return;
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
        setOpen(true);
      });
    }, [disabled]);

    const handleSelect = (selectedValue: string) => {
      onValueChange?.(selectedValue === value ? '' : selectedValue);
      setOpen(false);
    };

    const getPopoverPosition = (): ViewStyle => {
      if (!triggerLayout) return {};

      const { height: screenHeight } = Dimensions.get('window');
      const commandHeight = 300;
      const gap = 8;

      const spaceBelow = screenHeight - triggerLayout.y - triggerLayout.height;
      const showAbove = spaceBelow < commandHeight + gap && triggerLayout.y > commandHeight + gap;

      return {
        position: 'absolute',
        left: triggerLayout.x,
        width: triggerLayout.width,
        top: showAbove
          ? triggerLayout.y - commandHeight - gap
          : triggerLayout.y + triggerLayout.height + gap,
      };
    };

    // オプションをグループ化
    const groupedOptions = options.reduce<Record<string, ComboboxOption[]>>((acc, opt) => {
      const group = opt.group || '';
      if (!acc[group]) acc[group] = [];
      acc[group].push(opt);
      return acc;
    }, {});

    const triggerStyle = cn<ViewStyle>(
      styles.trigger,
      { borderColor: colors.border, backgroundColor: colors.background },
      disabled && styles.disabled,
      style
    );

    const triggerTextStyle = cn<TextStyle>(
      styles.triggerText,
      { color: selectedOption ? colors.foreground : colors.mutedForeground },
      textStyle
    );

    return (
      <>
        <Pressable
          ref={triggerRef}
          onPress={handleOpen}
          disabled={disabled}
          style={triggerStyle}
          {...props}
        >
          <Text style={triggerTextStyle}>
            {selectedOption?.label || placeholder}
          </Text>
          <Text style={[styles.chevron, { color: colors.mutedForeground }]}>
            {open ? '∧' : '∨'}
          </Text>
        </Pressable>

        <Modal
          visible={open}
          transparent
          animationType="fade"
          onRequestClose={() => setOpen(false)}
        >
          <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
            <View style={[getPopoverPosition(), styles.commandContainer]}>
              <Pressable onPress={(e) => e.stopPropagation()}>
                <Command
                  onValueChange={handleSelect}
                  style={{ ...styles.command, shadowColor: colors.foreground }}
                >
                  <CommandInput placeholder={searchPlaceholder} />
                  <CommandList>
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                      <CommandGroup key={group || 'default'} heading={group || undefined}>
                        {groupOptions.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                            onSelect={handleSelect}
                          >
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ))}
                  </CommandList>
                </Command>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </>
    );
  }
);

Combobox.displayName = 'Combobox';

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
  },
  triggerText: {
    fontSize: 14,
    flex: 1,
  },
  chevron: {
    fontSize: 12,
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  commandContainer: {
    maxHeight: 300,
  },
  command: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
});

export { Combobox };
