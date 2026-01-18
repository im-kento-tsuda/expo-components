import React from 'react';
import { View } from 'react-native';
import { Badge } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const badgeDoc: ComponentDoc = {
  id: 'badge',
  name: 'Badge',
  description: 'ステータスやラベルを表示するバッジ',
  category: 'data-display',
  importStatement: `import { Badge } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'variant',
      type: '"default" | "secondary" | "destructive" | "outline"',
      required: false,
      defaultValue: '"default"',
      description: 'バッジのスタイルバリアント',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'バッジのコンテンツ',
    },
  ],
  examples: [
    {
      title: 'バリアント',
      code: `<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</View>`,
      render: () => (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </View>
      ),
    },
  ],
};
