import React, { useState } from 'react';
import { View } from 'react-native';
import { Toggle, ToggleGroup, ToggleGroupItem, Typography } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function ToggleExample() {
  const [pressed, setPressed] = useState(false);
  return (
    <Toggle pressed={pressed} onPressedChange={setPressed}>
      <Typography variant="p" style={{ fontWeight: 'bold' }}>B</Typography>
    </Toggle>
  );
}

function ToggleGroupExample() {
  const [value, setValue] = useState<string | string[]>(['bold']);
  return (
    <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
      <ToggleGroupItem value="bold">
        <Typography variant="p" style={{ fontWeight: 'bold' }}>B</Typography>
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Typography variant="p" style={{ fontStyle: 'italic' }}>I</Typography>
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Typography variant="p" style={{ textDecorationLine: 'underline' }}>U</Typography>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export const toggleDoc: ComponentDoc = {
  id: 'toggle',
  name: 'Toggle',
  description: 'トグルボタンコンポーネント',
  category: 'form-inputs',
  importStatement: `import { Toggle, ToggleGroup, ToggleGroupItem } from '@im-kento-tsuda/expo-components';`,
  subComponents: ['ToggleGroup', 'ToggleGroupItem'],
  props: [
    {
      name: 'pressed',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '押下状態',
    },
    {
      name: 'onPressedChange',
      type: '(pressed: boolean) => void',
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
      title: '単体トグル',
      code: `const [pressed, setPressed] = useState(false);

<Toggle pressed={pressed} onPressedChange={setPressed}>
  <Typography variant="p" style={{ fontWeight: 'bold' }}>B</Typography>
</Toggle>`,
      render: () => <ToggleExample />,
    },
    {
      title: 'トグルグループ（複数選択）',
      code: `const [value, setValue] = useState(['bold']);

<ToggleGroup type="multiple" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="bold">B</ToggleGroupItem>
  <ToggleGroupItem value="italic">I</ToggleGroupItem>
  <ToggleGroupItem value="underline">U</ToggleGroupItem>
</ToggleGroup>`,
      render: () => <ToggleGroupExample />,
    },
  ],
};
