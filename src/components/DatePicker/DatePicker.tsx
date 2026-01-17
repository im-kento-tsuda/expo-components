import React, { forwardRef, useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  useWindowDimensions,
  type ViewStyle,
  type TextStyle,
  type ViewProps,
  type LayoutChangeEvent,
} from "react-native";
import { useColors } from "../../lib/theme";
import { cn } from "../../lib/utils";
import { Calendar } from "../Calendar";

export interface DatePickerProps extends Omit<ViewProps, "style"> {
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
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const DatePicker = forwardRef<View, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "日付を選択",
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
    const { width: windowWidth } = useWindowDimensions();
    const [triggerWidth, setTriggerWidth] = useState<number | null>(null);

    // overlay padding (16 * 2) を引いた幅で、最大320px
    const calendarWidth =
      triggerWidth !== null
        ? Math.min(triggerWidth, windowWidth - 32)
        : Math.min(windowWidth - 32, 320);

    const handleOpen = useCallback(() => {
      if (disabled) return;
      setOpen(true);
    }, [disabled]);

    const handleSelect = (date: Date | undefined) => {
      onChange?.(date);
      setOpen(false);
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

    const handleLayout = (event: LayoutChangeEvent) => {
      setTriggerWidth(event.nativeEvent.layout.width);
    };

    return (
      <>
        <Pressable
          onPress={handleOpen}
          disabled={disabled}
          style={triggerStyle}
          onLayout={handleLayout}
          {...props}
        >
          <Text style={triggerTextStyle}>
            {value ? formatDate(value) : placeholder}
          </Text>
          <Text style={[styles.icon, { color: colors.mutedForeground }]}>
            📅
          </Text>
        </Pressable>

        <Modal
          visible={open}
          transparent
          animationType="fade"
          onRequestClose={() => setOpen(false)}
        >
          <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <Calendar
                selected={value}
                onSelect={handleSelect}
                disabled={disabledDates}
                fromDate={fromDate}
                toDate={toDate}
                style={{
                  ...styles.calendar,
                  shadowColor: colors.foreground,
                  width: calendarWidth,
                }}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </>
    );
  }
);

DatePicker.displayName = "DatePicker";

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  calendar: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
});

export { DatePicker };
