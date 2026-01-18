import React from 'react';
import { View } from 'react-native';
import { Progress, Typography } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const progressDoc: ComponentDoc = {
  id: 'progress',
  name: 'Progress',
  description: 'プログレスバーコンポーネント',
  category: 'data-display',
  importStatement: `import { Progress } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'value',
      type: 'number',
      required: false,
      defaultValue: '0',
      description: '進捗率（0-100）',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '不確定モード（ローディング）',
    },
  ],
  examples: [
    {
      title: '確定的な進捗',
      code: `<View style={{ gap: 8 }}>
  <Typography variant="small">60%</Typography>
  <Progress value={60} />
</View>`,
      render: () => (
        <View style={{ gap: 8 }}>
          <Typography variant="small">60%</Typography>
          <Progress value={60} />
        </View>
      ),
    },
    {
      title: '不確定モード',
      code: `<Progress indeterminate />`,
      render: () => <Progress indeterminate />,
    },
  ],
};
