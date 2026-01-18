import React from 'react';
import { View } from 'react-native';
import { Spinner, Typography } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const spinnerDoc: ComponentDoc = {
  id: 'spinner',
  name: 'Spinner',
  description: 'ローディングスピナーコンポーネント',
  category: 'feedback',
  importStatement: `import { Spinner } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'size',
      type: '"sm" | "default" | "lg"',
      required: false,
      defaultValue: '"default"',
      description: 'スピナーのサイズ',
    },
    {
      name: 'color',
      type: 'string',
      required: false,
      description: 'カスタムカラー',
    },
  ],
  examples: [
    {
      title: 'サイズ',
      code: `<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
  <View style={{ alignItems: 'center', gap: 8 }}>
    <Spinner size="sm" />
    <Typography variant="small">Small</Typography>
  </View>
  <View style={{ alignItems: 'center', gap: 8 }}>
    <Spinner size="default" />
    <Typography variant="small">Default</Typography>
  </View>
  <View style={{ alignItems: 'center', gap: 8 }}>
    <Spinner size="lg" />
    <Typography variant="small">Large</Typography>
  </View>
</View>`,
      render: () => (
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Spinner size="sm" />
            <Typography variant="small">Small</Typography>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Spinner size="default" />
            <Typography variant="small">Default</Typography>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Spinner size="lg" />
            <Typography variant="small">Large</Typography>
          </View>
        </View>
      ),
    },
  ],
};
