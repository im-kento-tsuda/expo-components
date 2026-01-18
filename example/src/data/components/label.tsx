import React from 'react';
import { View } from 'react-native';
import { Label, Input } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const labelDoc: ComponentDoc = {
  id: 'label',
  name: 'Label',
  description: 'フォームラベルコンポーネント',
  category: 'form-inputs',
  importStatement: `import { Label } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'ラベルテキスト',
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '必須マーク（*）を表示',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '無効スタイル',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `<View style={{ gap: 8 }}>
  <Label>名前</Label>
  <Input placeholder="名前を入力..." />
</View>`,
      render: () => (
        <View style={{ gap: 8 }}>
          <Label>名前</Label>
          <Input placeholder="名前を入力..." />
        </View>
      ),
    },
    {
      title: '必須ラベル',
      code: `<Label required>メールアドレス</Label>`,
      render: () => <Label required>メールアドレス</Label>,
    },
    {
      title: '無効状態',
      code: `<Label disabled>無効なラベル</Label>`,
      render: () => <Label disabled>無効なラベル</Label>,
    },
  ],
};
