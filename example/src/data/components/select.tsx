import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
  Typography,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function SelectExample() {
  const [value, setValue] = useState('');
  return (
    <View style={{ gap: 8 }}>
      <Label>フレームワーク</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="選択してください..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
        </SelectContent>
      </Select>
      <Typography variant="muted">選択値: {value || '未選択'}</Typography>
    </View>
  );
}

export const selectDoc: ComponentDoc = {
  id: 'select',
  name: 'Select',
  description: 'ドロップダウン選択コンポーネント',
  category: 'form-inputs',
  importStatement: `import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['SelectTrigger', 'SelectValue', 'SelectContent', 'SelectItem'],
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
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'プレースホルダーテキスト（SelectValue）',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: '選択肢を無効にする（SelectItem）',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `const [value, setValue] = useState('');

<View style={{ gap: 8 }}>
  <Label>フレームワーク</Label>
  <Select value={value} onValueChange={setValue}>
    <SelectTrigger>
      <SelectValue placeholder="選択してください..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="angular">Angular</SelectItem>
      <SelectItem value="svelte">Svelte</SelectItem>
    </SelectContent>
  </Select>
</View>`,
      render: () => <SelectExample />,
    },
  ],
  notes: [
    'Compound Components パターンを使用しています',
    'SelectItem に disabled プロパティを指定すると、その選択肢は選択できなくなります',
  ],
};
