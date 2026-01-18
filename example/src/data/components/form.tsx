import React from 'react';
import { View } from 'react-native';
import { Form, FormField, Input, Button, Label, Typography } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const formDoc: ComponentDoc = {
  id: 'form',
  name: 'Form',
  description: 'フォーム管理コンポーネント',
  category: 'form-inputs',
  importStatement: `import { Form, FormField } from '@im-kento-tsuda/expo-components';`,
  subComponents: ['FormField'],
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'フォームの内容',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      description: 'react-hook-form と組み合わせて使用するフォームコンポーネント',
      code: `<Form>
  <View style={{ gap: 8 }}>
    <Label>ユーザー名</Label>
    <Input placeholder="username" />
    <Typography variant="muted">
      公開プロフィールに表示される名前です
    </Typography>
  </View>
  <Button type="submit">送信</Button>
</Form>`,
      render: () => (
        <View style={{ gap: 16 }}>
          <View style={{ gap: 8 }}>
            <Label>ユーザー名</Label>
            <Input placeholder="username" />
            <Typography variant="muted">公開プロフィールに表示される名前です</Typography>
          </View>
          <Button onPress={() => {}}>送信</Button>
        </View>
      ),
    },
  ],
  notes: [
    'react-hook-form と組み合わせて使用することを想定しています',
    'FormField でフィールドをラップします',
  ],
};
