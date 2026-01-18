import React from 'react';
import { View } from 'react-native';
import { Separator, Typography } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const separatorDoc: ComponentDoc = {
  id: 'separator',
  name: 'Separator',
  description: '区切り線コンポーネント',
  category: 'layout',
  importStatement: `import { Separator } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'orientation',
      type: '"horizontal" | "vertical"',
      required: false,
      defaultValue: '"horizontal"',
      description: '区切り線の方向',
    },
    {
      name: 'style',
      type: 'ViewStyle',
      required: false,
      description: 'カスタムスタイル',
    },
  ],
  examples: [
    {
      title: '水平区切り線',
      code: `<View>
  <Typography variant="p">上のコンテンツ</Typography>
  <Separator style={{ marginVertical: 12 }} />
  <Typography variant="p">下のコンテンツ</Typography>
</View>`,
      render: () => (
        <View>
          <Typography variant="p">上のコンテンツ</Typography>
          <Separator style={{ marginVertical: 12 }} />
          <Typography variant="p">下のコンテンツ</Typography>
        </View>
      ),
    },
    {
      title: '垂直区切り線',
      code: `<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
  <Typography variant="small">左</Typography>
  <Separator orientation="vertical" style={{ height: 20 }} />
  <Typography variant="small">中</Typography>
  <Separator orientation="vertical" style={{ height: 20 }} />
  <Typography variant="small">右</Typography>
</View>`,
      render: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Typography variant="small">左</Typography>
          <Separator orientation="vertical" style={{ height: 20 }} />
          <Typography variant="small">中</Typography>
          <Separator orientation="vertical" style={{ height: 20 }} />
          <Typography variant="small">右</Typography>
        </View>
      ),
    },
  ],
};
