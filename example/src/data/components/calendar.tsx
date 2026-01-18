import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar, Typography } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function CalendarExample() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  return (
    <View style={{ gap: 8 }}>
      <Calendar
        selected={selected}
        onSelect={setSelected}
      />
      <Typography variant="muted">
        選択日: {selected ? selected.toLocaleDateString('ja-JP') : '未選択'}
      </Typography>
    </View>
  );
}

export const calendarDoc: ComponentDoc = {
  id: 'calendar',
  name: 'Calendar',
  description: 'カレンダーコンポーネント',
  category: 'form-inputs',
  importStatement: `import { Calendar } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'selected',
      type: 'Date | undefined',
      required: false,
      description: '選択された日付',
    },
    {
      name: 'onSelect',
      type: '(date: Date | undefined) => void',
      required: false,
      description: '日付選択時のコールバック',
    },
    {
      name: 'minDate',
      type: 'Date',
      required: false,
      description: '選択可能な最小日付',
    },
    {
      name: 'maxDate',
      type: 'Date',
      required: false,
      description: '選択可能な最大日付',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `const [selected, setSelected] = useState<Date | undefined>(undefined);

<Calendar
  selected={selected}
  onSelect={setSelected}
/>`,
      render: () => <CalendarExample />,
    },
  ],
};
