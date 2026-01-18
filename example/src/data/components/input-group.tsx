import React from 'react';
import { View } from 'react-native';
import { InputGroup, Label, Typography } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const inputGroupDoc: ComponentDoc = {
  id: 'input-group',
  name: 'InputGroup',
  description: 'アドオンやアイコン付きの入力フィールド',
  category: 'form-inputs',
  importStatement: `import { InputGroup } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'leftAddon',
      type: 'string',
      required: false,
      description: '左側のアドオンテキスト',
    },
    {
      name: 'rightAddon',
      type: 'string',
      required: false,
      description: '右側のアドオンテキスト',
    },
    {
      name: 'leftElement',
      type: 'React.ReactNode',
      required: false,
      description: '左側のカスタム要素',
    },
    {
      name: 'rightElement',
      type: 'React.ReactNode',
      required: false,
      description: '右側のカスタム要素',
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'プレースホルダーテキスト',
    },
  ],
  examples: [
    {
      title: 'テキストアドオン',
      description: '左右にテキストを追加',
      code: `<View style={{ gap: 16 }}>
  <View style={{ gap: 8 }}>
    <Label>URL入力</Label>
    <InputGroup
      leftAddon="https://"
      placeholder="example.com"
    />
  </View>
  <View style={{ gap: 8 }}>
    <Label>メールアドレス</Label>
    <InputGroup
      rightAddon="@gmail.com"
      placeholder="username"
    />
  </View>
  <View style={{ gap: 8 }}>
    <Label>金額入力</Label>
    <InputGroup
      leftAddon="¥"
      rightAddon=".00"
      placeholder="1,000"
    />
  </View>
</View>`,
      render: () => (
        <View style={{ gap: 16 }}>
          <View style={{ gap: 8 }}>
            <Label>URL入力</Label>
            <InputGroup
              leftAddon="https://"
              placeholder="example.com"
            />
          </View>
          <View style={{ gap: 8 }}>
            <Label>メールアドレス</Label>
            <InputGroup
              rightAddon="@gmail.com"
              placeholder="username"
            />
          </View>
          <View style={{ gap: 8 }}>
            <Label>金額入力</Label>
            <InputGroup
              leftAddon="¥"
              rightAddon=".00"
              placeholder="1,000"
            />
          </View>
        </View>
      ),
    },
    {
      title: 'カスタム要素',
      description: 'アイコンなどのカスタム要素を追加',
      code: `<InputGroup
  leftElement={<Typography variant="muted">🔍</Typography>}
  rightElement={<Typography variant="muted">✕</Typography>}
  placeholder="検索..."
/>`,
      render: () => (
        <InputGroup
          leftElement={<Typography variant="muted">🔍</Typography>}
          rightElement={<Typography variant="muted">✕</Typography>}
          placeholder="検索..."
        />
      ),
    },
  ],
};
