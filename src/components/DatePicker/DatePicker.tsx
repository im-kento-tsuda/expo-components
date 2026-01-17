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
import { Calendar } from '../Calendar';

export interface DatePickerProps extends Omit<ViewProps, 'style'> {
  /** 選択された日付 */
  value?: Date;
  /** 日付変更時のコールバック */
  onChange?: (date: Date | undefined) => void;
  /** プレースホルダー */
  placeholder?: string;
  /** 日付フォーマット関数 */
  formatDate?: (date: Date) => string;
  /** 無効状態 */
  disabled?: boolean;
  /** 無効な日付を判定する関数 */
  disabledDates?: (date: Date) => boolean;
  /** 最小日付 */
  fromDate?: Date;
  /** 最大日付 */
  toDate?: Date;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** テキストのカスタムスタイル */
  textStyle?: TextStyle;
}

const defaultFormatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

const DatePicker = forwardRef<View, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = '日付を選択',
      formatDate = defaultFormatDate,
      disabled = false,
      disabledDates,
      fromDate,
      toDate,
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

    const handleOpen = useCallback(() => {
      if (disabled) return;
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
        setOpen(true);
      });
    }, [disabled]);

    const handleSelect = (date: Date | undefined) => {
      onChange?.(date);
      setOpen(false);
    };

    const getPopoverPosition = (): ViewStyle => {
      if (!triggerLayout) return {};

      const { height: screenHeight } = Dimensions.get('window');
      const calendarHeight = 340;
      const gap = 8;

      // 下に表示するか上に表示するか決定
      const spaceBelow = screenHeight - triggerLayout.y - triggerLayout.height;
      const showAbove = spaceBelow < calendarHeight + gap && triggerLayout.y > calendarHeight + gap;

      return {
        position: 'absolute',
        left: triggerLayout.x,
        top: showAbove
          ? triggerLayout.y - calendarHeight - gap
          : triggerLayout.y + triggerLayout.height + gap,
      };
    };

    const triggerStyle = cn<ViewStyle>(
      styles.trigger,
      { borderColor: colors.border, backgroundColor: colors.background },
      disabled && styles.disabled,
      style
    );

    const triggerTextStyle = cn<TextStyle>(
      styles.triggerText,
      { color: value ? colors.foreground : colors.mutedForeground },
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
            {value ? formatDate(value) : placeholder}
          </Text>
          <Text style={[styles.icon, { color: colors.mutedForeground }]}>📅</Text>
        </Pressable>

        <Modal
          visible={open}
          transparent
          animationType="fade"
          onRequestClose={() => setOpen(false)}
        >
          <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
            <View style={getPopoverPosition()}>
              <Pressable onPress={(e) => e.stopPropagation()}>
                <Calendar
                  selected={value}
                  onSelect={handleSelect}
                  disabled={disabledDates}
                  fromDate={fromDate}
                  toDate={toDate}
                  style={{ ...styles.calendar, shadowColor: colors.foreground }}
                />
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </>
    );
  }
);

DatePicker.displayName = 'DatePicker';

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
  },
  icon: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  calendar: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
});

export { DatePicker };
