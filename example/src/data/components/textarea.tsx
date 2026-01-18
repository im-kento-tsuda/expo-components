import React, { useState } from 'react';
import { View } from 'react-native';
import { Textarea, Label } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function TextareaExample() {
  const [value, setValue] = useState('');
  return (
    <View style={{ gap: 8 }}>
      <Label>説明</Label>
      <Textarea
        placeholder="説明を入力..."
        value={value}
        onChangeText={setValue}
        minRows={3}
      />
    </View>
  );
}

export const textareaDoc: ComponentDoc = {
  id: 'textarea',
  name: 'Textarea',
  description: '複数行テキスト入力フィールド',
  category: 'form-inputs',
  importStatement: `import { Textarea } from '@im-kento-tsuda/expo-components';`,
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
      name: 'minRows',
      type: 'number',
      required: false,
      defaultValue: '3',
      description: '最小行数',
    },
    {
      name: 'maxRows',
      type: 'number',
      required: false,
      description: '最大行数',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `const [value, setValue] = useState('');

<View style={{ gap: 8 }}>
  <Label>説明</Label>
  <Textarea
    placeholder="説明を入力..."
    value={value}
    onChangeText={setValue}
    minRows={3}
  />
</View>`,
      render: () => <TextareaExample />,
    },
  ],
};
