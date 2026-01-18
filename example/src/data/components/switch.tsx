import React, { useState } from 'react';
import { View } from 'react-native';
import { Switch, Label, Typography } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function SwitchExample() {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ gap: 2 }}>
        <Label>通知を受け取る</Label>
        <Typography variant="muted">メール通知を有効にします</Typography>
      </View>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </View>
  );
}

export const switchDoc: ComponentDoc = {
  id: 'switch',
  name: 'Switch',
  description: 'トグルスイッチコンポーネント',
  category: 'form-inputs',
  importStatement: `import { Switch } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'checked',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'オン状態',
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

<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <View style={{ gap: 2 }}>
    <Label>通知を受け取る</Label>
    <Typography variant="muted">メール通知を有効にします</Typography>
  </View>
  <Switch checked={checked} onCheckedChange={setChecked} />
</View>`,
      render: () => <SwitchExample />,
    },
    {
      title: '無効状態',
      code: `<Switch checked disabled />`,
      render: () => <Switch checked disabled />,
    },
  ],
};
