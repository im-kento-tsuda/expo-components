import React from 'react';
import { View } from 'react-native';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  Button,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const sheetDoc: ComponentDoc = {
  id: 'sheet',
  name: 'Sheet',
  description: 'ボトムシート/サイドパネルコンポーネント',
  category: 'feedback',
  importStatement: `import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['SheetTrigger', 'SheetContent', 'SheetHeader', 'SheetTitle', 'SheetDescription', 'SheetClose'],
  props: [
    {
      name: 'side',
      type: '"top" | "bottom" | "left" | "right"',
      required: false,
      defaultValue: '"bottom"',
      description: '表示位置',
    },
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: '開閉状態（制御モード）',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: '開閉状態変更時のコールバック',
    },
  ],
  examples: [
    {
      title: 'ボトムシート',
      code: `<Sheet side="bottom">
  <SheetTrigger asChild>
    <Button variant="outline">下から</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>メニュー</SheetTitle>
      <SheetDescription>アクションを選択</SheetDescription>
    </SheetHeader>
    <SheetClose asChild>
      <Button>閉じる</Button>
    </SheetClose>
  </SheetContent>
</Sheet>`,
      render: () => (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Sheet side="bottom">
            <SheetTrigger asChild>
              <Button variant="outline">下から</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>メニュー</SheetTitle>
                <SheetDescription>アクションを選択</SheetDescription>
              </SheetHeader>
              <View style={{ marginTop: 16 }}>
                <SheetClose asChild>
                  <Button onPress={() => {}}>閉じる</Button>
                </SheetClose>
              </View>
            </SheetContent>
          </Sheet>
          <Sheet side="right">
            <SheetTrigger asChild>
              <Button variant="outline">右から</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>サイドパネル</SheetTitle>
              </SheetHeader>
              <View style={{ marginTop: 16 }}>
                <SheetClose asChild>
                  <Button onPress={() => {}}>閉じる</Button>
                </SheetClose>
              </View>
            </SheetContent>
          </Sheet>
        </View>
      ),
    },
  ],
};
