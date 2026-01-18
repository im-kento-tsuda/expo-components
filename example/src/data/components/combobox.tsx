import React, { useState } from 'react';
import { View } from 'react-native';
import { Combobox, Label, Typography } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function ComboboxExample() {
  const [value, setValue] = useState('');
  return (
    <View style={{ gap: 8 }}>
      <Label>フレームワーク</Label>
      <Combobox
        value={value}
        onValueChange={setValue}
        options={[
          { value: 'next', label: 'Next.js' },
          { value: 'sveltekit', label: 'SvelteKit' },
          { value: 'nuxt', label: 'Nuxt.js' },
          { value: 'remix', label: 'Remix' },
          { value: 'astro', label: 'Astro' },
        ]}
        placeholder="フレームワークを選択..."
        searchPlaceholder="検索..."
        emptyMessage="見つかりません"
      />
      <Typography variant="muted">選択値: {value || '未選択'}</Typography>
    </View>
  );
}

export const comboboxDoc: ComponentDoc = {
  id: 'combobox',
  name: 'Combobox',
  description: '検索可能なドロップダウン選択コンポーネント',
  category: 'form-inputs',
  importStatement: `import { Combobox } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: '選択された値',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: false,
      description: '値変更時のコールバック',
    },
    {
      name: 'options',
      type: '{ value: string; label: string }[]',
      required: true,
      description: '選択肢の配列',
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'プレースホルダーテキスト',
    },
    {
      name: 'searchPlaceholder',
      type: 'string',
      required: false,
      description: '検索入力のプレースホルダー',
    },
    {
      name: 'emptyMessage',
      type: 'string',
      required: false,
      description: '検索結果が空の場合のメッセージ',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `const [value, setValue] = useState('');

<Combobox
  value={value}
  onValueChange={setValue}
  options={[
    { value: 'next', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
  ]}
  placeholder="フレームワークを選択..."
  searchPlaceholder="検索..."
  emptyMessage="見つかりません"
/>`,
      render: () => <ComboboxExample />,
    },
  ],
  notes: [
    'Select とは異なり、検索機能が組み込まれています',
    '大量の選択肢がある場合に便利です',
  ],
};
