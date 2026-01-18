import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Label } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function InputExample() {
  const [value, setValue] = useState('');
  return (
    <View style={{ gap: 8 }}>
      <Label>名前</Label>
      <Input
        placeholder="名前を入力..."
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
}

function InputDisabledExample() {
  return (
    <Input
      placeholder="入力不可"
      editable={false}
      value="固定値"
    />
  );
}

export const inputDoc: ComponentDoc = {
  id: 'input',
  name: 'Input',
  description: 'テキスト入力フィールドコンポーネント',
  category: 'form-inputs',
  importStatement: `import { Input } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'プレースホルダーテキスト',
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      description: '入力値',
    },
    {
      name: 'onChangeText',
      type: '(text: string) => void',
      required: false,
      description: 'テキスト変更時のコールバック',
    },
    {
      name: 'editable',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: '編集可能かどうか',
    },
    {
      name: 'secureTextEntry',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'パスワード入力モード',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `const [value, setValue] = useState('');

<View style={{ gap: 8 }}>
  <Label>名前</Label>
  <Input
    placeholder="名前を入力..."
    value={value}
    onChangeText={setValue}
  />
</View>`,
      render: () => <InputExample />,
    },
    {
      title: '無効状態',
      code: `<Input
  placeholder="入力不可"
  editable={false}
  value="固定値"
/>`,
      render: () => <InputDisabledExample />,
    },
  ],
  notes: [
    'React Native の TextInput のすべてのプロパティを継承しています',
    'テーマに応じて自動的にスタイルが変更されます',
  ],
};
