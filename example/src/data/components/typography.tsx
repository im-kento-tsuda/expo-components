import React from 'react';
import { View } from 'react-native';
import { Typography, Separator } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const typographyDoc: ComponentDoc = {
  id: 'typography',
  name: 'Typography',
  description: 'テキストスタイリングコンポーネント',
  category: 'data-display',
  importStatement: `import { Typography } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'variant',
      type: '"h1" | "h2" | "h3" | "h4" | "p" | "lead" | "large" | "small" | "muted"',
      required: false,
      defaultValue: '"p"',
      description: 'テキストスタイルバリアント',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'テキストコンテンツ',
    },
    {
      name: 'style',
      type: 'TextStyle',
      required: false,
      description: 'カスタムスタイル',
    },
  ],
  examples: [
    {
      title: '見出し',
      code: `<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>`,
      render: () => (
        <View style={{ gap: 8 }}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
        </View>
      ),
    },
    {
      title: '本文スタイル',
      code: `<Typography variant="lead">リードテキスト</Typography>
<Typography variant="p">通常のパラグラフ</Typography>
<Typography variant="large">Large text</Typography>
<Typography variant="small">Small text</Typography>
<Typography variant="muted">Muted text</Typography>`,
      render: () => (
        <View style={{ gap: 8 }}>
          <Typography variant="lead">リードテキスト</Typography>
          <Typography variant="p">通常のパラグラフ</Typography>
          <Typography variant="large">Large text</Typography>
          <Typography variant="small">Small text</Typography>
          <Typography variant="muted">Muted text</Typography>
        </View>
      ),
    },
  ],
};
