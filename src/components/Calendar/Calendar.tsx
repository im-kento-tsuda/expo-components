import React, { forwardRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface CalendarProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 選択された日付 */
  selected?: Date;
  /** 日付選択時のコールバック */
  onSelect?: (date: Date | undefined) => void;
  /** 表示月 */
  month?: Date;
  /** 表示月変更時のコールバック */
  onMonthChange?: (date: Date) => void;
  /** 無効な日付を判定する関数 */
  disabled?: (date: Date) => boolean;
  /** 最小日付 */
  fromDate?: Date;
  /** 最大日付 */
  toDate?: Date;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const DAYS_OF_WEEK = ['日', '月', '火', '水', '木', '金', '土'];
const MONTHS = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月',
];

const Calendar = forwardRef<View, CalendarProps>(
  (
    {
      selected,
      onSelect,
      month: controlledMonth,
      onMonthChange,
      disabled,
      fromDate,
      toDate,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const colors = useColors();
    const [uncontrolledMonth, setUncontrolledMonth] = useState(() => {
      return selected || new Date();
    });

    const currentMonth = controlledMonth || uncontrolledMonth;

    const setCurrentMonth = (date: Date) => {
      if (controlledMonth === undefined) {
        setUncontrolledMonth(date);
      }
      onMonthChange?.(date);
    };

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // 月の日数を取得
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // 月の最初の日の曜日を取得
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // カレンダーのグリッドを生成
    const calendarDays = useMemo(() => {
      const days: (Date | null)[] = [];

      // 前月の空白
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
      }

      // 当月の日付
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
      }

      return days;
    }, [year, month, daysInMonth, firstDayOfMonth]);

    const isDateDisabled = (date: Date): boolean => {
      if (disabled?.(date)) return true;
      if (fromDate && date < fromDate) return true;
      if (toDate && date > toDate) return true;
      return false;
    };

    const isDateSelected = (date: Date): boolean => {
      if (!selected) return false;
      return (
        date.getFullYear() === selected.getFullYear() &&
        date.getMonth() === selected.getMonth() &&
        date.getDate() === selected.getDate()
      );
    };

    const isToday = (date: Date): boolean => {
      const today = new Date();
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    };

    const handlePreviousMonth = () => {
      setCurrentMonth(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
      setCurrentMonth(new Date(year, month + 1, 1));
    };

    const handleSelectDate = (date: Date) => {
      if (isDateDisabled(date)) return;
      onSelect?.(isDateSelected(date) ? undefined : date);
    };

    const containerStyle = cn<ViewStyle>(
      styles.container,
      { backgroundColor: colors.card, borderColor: colors.border },
      style
    );

    return (
      <View ref={ref} className={className} style={containerStyle} {...props}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={handlePreviousMonth}
            style={[styles.navButton, { borderColor: colors.border }]}
          >
            <Text style={[styles.navButtonText, { color: colors.foreground }]}>‹</Text>
          </Pressable>
          <Text style={[styles.headerText, { color: colors.foreground }]}>
            {year}年 {MONTHS[month]}
          </Text>
          <Pressable
            onPress={handleNextMonth}
            style={[styles.navButton, { borderColor: colors.border }]}
          >
            <Text style={[styles.navButtonText, { color: colors.foreground }]}>›</Text>
          </Pressable>
        </View>

        {/* Days of week */}
        <View style={styles.weekHeader}>
          {DAYS_OF_WEEK.map((day, index) => (
            <View key={day} style={styles.weekDay}>
              <Text
                style={[
                  styles.weekDayText,
                  { color: index === 0 ? colors.destructive : index === 6 ? colors.primary : colors.mutedForeground },
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.grid}>
          {calendarDays.map((date, index) => (
            <View key={index} style={styles.dayCell}>
              {date ? (
                <Pressable
                  onPress={() => handleSelectDate(date)}
                  disabled={isDateDisabled(date)}
                  style={({ pressed }) => [
                    styles.dayButton,
                    isDateSelected(date) && { backgroundColor: colors.primary },
                    isToday(date) && !isDateSelected(date) && { borderWidth: 1, borderColor: colors.primary },
                    pressed && !isDateDisabled(date) && { opacity: 0.7 },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      { color: colors.foreground },
                      isDateSelected(date) && { color: colors.primaryForeground },
                      isDateDisabled(date) && { color: colors.mutedForeground, opacity: 0.5 },
                      date.getDay() === 0 && !isDateSelected(date) && { color: colors.destructive },
                      date.getDay() === 6 && !isDateSelected(date) && { color: colors.primary },
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                </Pressable>
              ) : (
                <View style={styles.dayButton} />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }
);

Calendar.displayName = 'Calendar';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  navButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: '500',
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 2,
  },
  dayButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export { Calendar };
