import React, { useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Label } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function CheckboxExample() {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <Label>利用規約に同意する</Label>
    </View>
  );
}

export const checkboxDoc: ComponentDoc = {
  id: 'checkbox',
  name: 'Checkbox',
  description: 'チェックボックスコンポーネント',
  category: 'form-inputs',
  importStatement: `import { Checkbox } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'checked',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'チェック状態',
    },
    {
      name: 'onCheckedChange',
      type: '(checked: boolean) => void',
      required: false,
      description: '状態変更時のコールバック',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '無効状態',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `const [checked, setChecked] = useState(false);

<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  <Checkbox checked={checked} onCheckedChange={setChecked} />
  <Label>利用規約に同意する</Label>
</View>`,
      render: () => <CheckboxExample />,
    },
    {
      title: '無効状態',
      code: `<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  <Checkbox checked disabled />
  <Label disabled>無効なチェックボックス</Label>
</View>`,
      render: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Checkbox checked disabled />
          <Label disabled>無効なチェックボックス</Label>
        </View>
      ),
    },
  ],
};
