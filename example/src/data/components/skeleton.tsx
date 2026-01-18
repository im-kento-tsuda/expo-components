import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const skeletonDoc: ComponentDoc = {
  id: 'skeleton',
  name: 'Skeleton',
  description: 'ローディングプレースホルダーコンポーネント',
  category: 'data-display',
  importStatement: `import { Skeleton } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'width',
      type: 'number | string',
      required: false,
      defaultValue: '"100%"',
      description: '幅',
    },
    {
      name: 'height',
      type: 'number',
      required: false,
      defaultValue: '20',
      description: '高さ',
    },
    {
      name: 'circle',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '円形にする',
    },
    {
      name: 'borderRadius',
      type: 'number',
      required: false,
      defaultValue: '4',
      description: '角丸',
    },
  ],
  examples: [
    {
      title: 'ユーザーカードのスケルトン',
      code: `<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
  <Skeleton width={48} height={48} circle />
  <View style={{ gap: 8 }}>
    <Skeleton width={150} height={16} />
    <Skeleton width={100} height={14} />
  </View>
</View>`,
      render: () => (
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Skeleton width={48} height={48} circle />
          <View style={{ gap: 8 }}>
            <Skeleton width={150} height={16} />
            <Skeleton width={100} height={14} />
          </View>
        </View>
      ),
    },
    {
      title: 'カードのスケルトン',
      code: `<Skeleton width="100%" height={100} borderRadius={8} />`,
      render: () => (
        <Skeleton width="100%" height={100} borderRadius={8} />
      ),
    },
  ],
};
