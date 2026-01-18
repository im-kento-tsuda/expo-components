import React, { useState } from 'react';
import { View } from 'react-native';
import { Slider, Label } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function SliderExample() {
  const [value, setValue] = useState(50);
  return (
    <View style={{ gap: 8 }}>
      <Label>音量: {value}%</Label>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={1}
      />
    </View>
  );
}

export const sliderDoc: ComponentDoc = {
  id: 'slider',
  name: 'Slider',
  description: 'スライダー入力コンポーネント',
  category: 'form-inputs',
  importStatement: `import { Slider } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'value',
      type: 'number',
      required: false,
      defaultValue: '0',
      description: '現在の値',
    },
    {
      name: 'onValueChange',
      type: '(value: number) => void',
      required: false,
      description: '値変更時のコールバック',
    },
    {
      name: 'min',
      type: 'number',
      required: false,
      defaultValue: '0',
      description: '最小値',
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      defaultValue: '100',
      description: '最大値',
    },
    {
      name: 'step',
      type: 'number',
      required: false,
      defaultValue: '1',
      description: 'ステップ値',
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
      code: `const [value, setValue] = useState(50);

<View style={{ gap: 8 }}>
  <Label>音量: {value}%</Label>
  <Slider
    value={value}
    onValueChange={setValue}
    min={0}
    max={100}
    step={1}
  />
</View>`,
      render: () => <SliderExample />,
    },
    {
      title: '無効状態',
      code: `<Slider value={30} disabled />`,
      render: () => <Slider value={30} disabled />,
    },
  ],
};
