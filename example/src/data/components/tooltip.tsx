import React from 'react';
import { View } from 'react-native';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Button,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const tooltipDoc: ComponentDoc = {
  id: 'tooltip',
  name: 'Tooltip',
  description: 'ツールチップコンポーネント（長押しで表示）',
  category: 'feedback',
  importStatement: `import { Tooltip, TooltipTrigger, TooltipContent } from '@im-kento-tsuda/expo-components';`,
  subComponents: ['TooltipTrigger', 'TooltipContent'],
  props: [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: '表示状態（制御モード）',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: '表示状態変更時のコールバック',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      description: 'ボタンを長押しするとツールチップが表示されます',
      code: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">長押ししてください</Button>
  </TooltipTrigger>
  <TooltipContent>ヒント: これはツールチップです</TooltipContent>
</Tooltip>`,
      render: () => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">長押ししてください</Button>
          </TooltipTrigger>
          <TooltipContent>ヒント: これはツールチップです</TooltipContent>
        </Tooltip>
      ),
    },
  ],
  notes: [
    'モバイルでは長押しで表示されます',
    'TooltipContent の表示位置は自動調整されます',
  ],
};
