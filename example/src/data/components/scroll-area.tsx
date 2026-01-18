import React from 'react';
import { View } from 'react-native';
import { ScrollArea, Typography, useColors } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function ScrollAreaExample() {
  const colors = useColors();
  return (
    <ScrollArea style={{ height: 150, borderWidth: 1, borderColor: colors.border, borderRadius: 8 }}>
      <View style={{ padding: 12 }}>
        {[...Array(10)].map((_, i) => (
          <Typography key={i} variant="p" style={{ marginBottom: 8 }}>
            アイテム {i + 1}
          </Typography>
        ))}
      </View>
    </ScrollArea>
  );
}

export const scrollAreaDoc: ComponentDoc = {
  id: 'scroll-area',
  name: 'ScrollArea',
  description: 'スクロール可能なコンテナ',
  category: 'layout',
  importStatement: `import { ScrollArea } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'スクロールコンテンツ',
    },
    {
      name: 'horizontal',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '水平スクロールを有効にする',
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
      title: '垂直スクロール',
      code: `<ScrollArea style={{ height: 150, borderWidth: 1, borderRadius: 8 }}>
  <View style={{ padding: 12 }}>
    {[...Array(10)].map((_, i) => (
      <Typography key={i} variant="p">
        アイテム {i + 1}
      </Typography>
    ))}
  </View>
</ScrollArea>`,
      render: () => <ScrollAreaExample />,
    },
  ],
};
