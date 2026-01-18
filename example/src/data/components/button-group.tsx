import React from 'react';
import { View } from 'react-native';
import { ButtonGroup, Button } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const buttonGroupDoc: ComponentDoc = {
  id: 'button-group',
  name: 'ButtonGroup',
  description: 'ボタンをグループ化するコンテナ',
  category: 'layout',
  importStatement: `import { ButtonGroup, Button } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'orientation',
      type: '"horizontal" | "vertical"',
      required: false,
      defaultValue: '"horizontal"',
      description: 'ボタンの配置方向',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Button コンポーネント',
    },
  ],
  examples: [
    {
      title: '水平ボタングループ',
      code: `<ButtonGroup>
  <Button variant="outline">左</Button>
  <Button variant="outline">中</Button>
  <Button variant="outline">右</Button>
</ButtonGroup>`,
      render: () => (
        <ButtonGroup>
          <Button variant="outline" onPress={() => {}}>左</Button>
          <Button variant="outline" onPress={() => {}}>中</Button>
          <Button variant="outline" onPress={() => {}}>右</Button>
        </ButtonGroup>
      ),
    },
    {
      title: '垂直ボタングループ',
      code: `<ButtonGroup orientation="vertical">
  <Button variant="outline">上</Button>
  <Button variant="outline">中</Button>
  <Button variant="outline">下</Button>
</ButtonGroup>`,
      render: () => (
        <ButtonGroup orientation="vertical">
          <Button variant="outline" onPress={() => {}}>上</Button>
          <Button variant="outline" onPress={() => {}}>中</Button>
          <Button variant="outline" onPress={() => {}}>下</Button>
        </ButtonGroup>
      ),
    },
  ],
  notes: [
    'ボタン間のボーダーが自動的に結合されます',
    'すべての子要素は Button コンポーネントである必要があります',
  ],
};
