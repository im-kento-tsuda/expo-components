import React from 'react';
import { View, Image } from 'react-native';
import { AspectRatio, Typography, useColors } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function AspectRatioExample() {
  const colors = useColors();
  return (
    <View style={{ width: 200 }}>
      <AspectRatio ratio={16 / 9}>
        <View style={{
          flex: 1,
          backgroundColor: colors.muted,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
          <Typography variant="muted">16:9</Typography>
        </View>
      </AspectRatio>
    </View>
  );
}

function AspectRatioSquareExample() {
  const colors = useColors();
  return (
    <View style={{ width: 120 }}>
      <AspectRatio ratio={1}>
        <View style={{
          flex: 1,
          backgroundColor: colors.muted,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
          <Typography variant="muted">1:1</Typography>
        </View>
      </AspectRatio>
    </View>
  );
}

export const aspectRatioDoc: ComponentDoc = {
  id: 'aspect-ratio',
  name: 'AspectRatio',
  description: 'アスペクト比を維持するコンテナ',
  category: 'layout',
  importStatement: `import { AspectRatio } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'ratio',
      type: 'number',
      required: false,
      defaultValue: '1',
      description: 'アスペクト比（width / height）',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: '子要素',
    },
  ],
  examples: [
    {
      title: '16:9 比率',
      code: `<View style={{ width: 200 }}>
  <AspectRatio ratio={16 / 9}>
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <Typography>16:9</Typography>
    </View>
  </AspectRatio>
</View>`,
      render: () => <AspectRatioExample />,
    },
    {
      title: '1:1 比率（正方形）',
      code: `<View style={{ width: 120 }}>
  <AspectRatio ratio={1}>
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <Typography>1:1</Typography>
    </View>
  </AspectRatio>
</View>`,
      render: () => <AspectRatioSquareExample />,
    },
  ],
  notes: [
    '画像やビデオのレスポンシブな表示に便利です',
    '親要素の幅に基づいて高さが自動計算されます',
  ],
};
