import React, { useState } from 'react';
import { View } from 'react-native';
import { DatePicker, Label } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function DatePickerExample() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <View style={{ gap: 8 }}>
      <Label>日付</Label>
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="日付を選択..."
      />
    </View>
  );
}

export const datePickerDoc: ComponentDoc = {
  id: 'date-picker',
  name: 'DatePicker',
  description: '日付選択コンポーネント',
  category: 'form-inputs',
  importStatement: `import { DatePicker } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'value',
      type: 'Date | undefined',
      required: false,
      description: '選択された日付',
    },
    {
      name: 'onChange',
      type: '(date: Date | undefined) => void',
      required: false,
      description: '日付変更時のコールバック',
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'プレースホルダーテキスト',
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
      code: `const [date, setDate] = useState<Date | undefined>(undefined);

<View style={{ gap: 8 }}>
  <Label>日付</Label>
  <DatePicker
    value={date}
    onChange={setDate}
    placeholder="日付を選択..."
  />
</View>`,
      render: () => <DatePickerExample />,
    },
  ],
  notes: [
    'クリックするとカレンダーが表示されます',
    'Calendar コンポーネントを内部で使用しています',
  ],
};
