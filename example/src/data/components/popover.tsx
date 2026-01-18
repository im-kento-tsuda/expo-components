import React from 'react';
import { View } from 'react-native';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Typography,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const popoverDoc: ComponentDoc = {
  id: 'popover',
  name: 'Popover',
  description: 'ポップオーバーコンポーネント',
  category: 'feedback',
  importStatement: `import { Popover, PopoverTrigger, PopoverContent } from '@im-kento-tsuda/expo-components';`,
  subComponents: ['PopoverTrigger', 'PopoverContent'],
  props: [
    {
      name: 'side',
      type: '"top" | "bottom" | "left" | "right"',
      required: false,
      defaultValue: '"bottom"',
      description: '表示位置',
    },
    {
      name: 'align',
      type: '"start" | "center" | "end"',
      required: false,
      defaultValue: '"center"',
      description: '配置',
    },
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
      code: `<View style={{ flexDirection: 'row', gap: 8 }}>
  <Popover side="bottom" align="start">
    <PopoverTrigger asChild>
      <Button variant="outline">下に表示</Button>
    </PopoverTrigger>
    <PopoverContent>
      <Typography variant="p">ポップオーバーの内容</Typography>
    </PopoverContent>
  </Popover>
  <Popover side="top" align="center">
    <PopoverTrigger asChild>
      <Button variant="outline">上に表示</Button>
    </PopoverTrigger>
    <PopoverContent>
      <Typography variant="p">上部に表示</Typography>
    </PopoverContent>
  </Popover>
</View>`,
      render: () => (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Popover side="bottom" align="start">
            <PopoverTrigger asChild>
              <Button variant="outline">下に表示</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Typography variant="p" style={{ fontWeight: '500' }}>ポップオーバー</Typography>
              <Typography variant="muted">追加情報をここに表示できます。</Typography>
            </PopoverContent>
          </Popover>
          <Popover side="top" align="center">
            <PopoverTrigger asChild>
              <Button variant="outline">上に表示</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Typography variant="p" style={{ fontWeight: '500' }}>上部ポップオーバー</Typography>
              <Typography variant="muted">トリガーの上に表示されます。</Typography>
            </PopoverContent>
          </Popover>
        </View>
      ),
    },
  ],
};
