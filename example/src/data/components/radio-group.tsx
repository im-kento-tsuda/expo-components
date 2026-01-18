import React, { useState } from 'react';
import { View } from 'react-native';
import { RadioGroup, RadioGroupItem, Typography } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function RadioGroupExample() {
  const [value, setValue] = useState('option1');
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <RadioGroupItem value="option1" />
        <Typography variant="p">無料プラン</Typography>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <RadioGroupItem value="option2" />
        <Typography variant="p">プロプラン</Typography>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <RadioGroupItem value="option3" />
        <Typography variant="p">エンタープライズ</Typography>
      </View>
    </RadioGroup>
  );
}

export const radioGroupDoc: ComponentDoc = {
  id: 'radio-group',
  name: 'RadioGroup',
  description: 'ラジオボタングループコンポーネント',
  category: 'form-inputs',
  importStatement: `import { RadioGroup, RadioGroupItem } from '@im-kento-tsuda/expo-components';`,
  subComponents: ['RadioGroupItem'],
  props: [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: '選択された値',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: false,
      description: '値変更時のコールバック',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '全体を無効にする',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `const [value, setValue] = useState('option1');

<RadioGroup value={value} onValueChange={setValue}>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
    <RadioGroupItem value="option1" />
    <Typography variant="p">無料プラン</Typography>
  </View>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
    <RadioGroupItem value="option2" />
    <Typography variant="p">プロプラン</Typography>
  </View>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
    <RadioGroupItem value="option3" />
    <Typography variant="p">エンタープライズ</Typography>
  </View>
</RadioGroup>`,
      render: () => <RadioGroupExample />,
    },
  ],
};
