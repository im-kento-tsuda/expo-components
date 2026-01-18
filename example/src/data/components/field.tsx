import React from 'react';
import { View } from 'react-native';
import { Field, FieldLabel, FieldDescription, FieldError, Input } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const fieldDoc: ComponentDoc = {
  id: 'field',
  name: 'Field',
  description: 'フォームフィールドラッパーコンポーネント',
  category: 'form-inputs',
  importStatement: `import { Field, FieldLabel, FieldDescription, FieldError } from '@im-kento-tsuda/expo-components';`,
  subComponents: ['FieldLabel', 'FieldDescription', 'FieldError'],
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'フィールドの内容',
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      description: '必須フィールド（Fieldに指定）',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: '無効状態',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `<Field required>
  <FieldLabel>メールアドレス</FieldLabel>
  <Input placeholder="email@example.com" />
  <FieldDescription>ログインに使用するメールアドレス</FieldDescription>
</Field>`,
      render: () => (
        <Field required>
          <FieldLabel>メールアドレス</FieldLabel>
          <Input placeholder="email@example.com" />
          <FieldDescription>ログインに使用するメールアドレス</FieldDescription>
        </Field>
      ),
    },
    {
      title: 'エラー表示',
      code: `<Field>
  <FieldLabel>パスワード</FieldLabel>
  <Input placeholder="パスワード" secureTextEntry />
  <FieldError>パスワードは8文字以上必要です</FieldError>
</Field>`,
      render: () => (
        <Field>
          <FieldLabel>パスワード</FieldLabel>
          <Input placeholder="パスワード" secureTextEntry />
          <FieldError>パスワードは8文字以上必要です</FieldError>
        </Field>
      ),
    },
  ],
  notes: [
    'Label, Description, Error を統合したコンポーネントです',
    'Field コンポーネントの required prop で必須マークが表示されます',
  ],
};
