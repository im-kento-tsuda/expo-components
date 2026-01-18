import React from 'react';
import { View } from 'react-native';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const dialogDoc: ComponentDoc = {
  id: 'dialog',
  name: 'Dialog',
  description: 'モーダルダイアログコンポーネント',
  category: 'feedback',
  importStatement: `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogFooter', 'DialogClose'],
  props: [
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
      title: '基本的な使用法',
      code: `<Dialog>
  <DialogTrigger asChild>
    <Button>ダイアログを開く</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>確認</DialogTitle>
      <DialogDescription>
        この操作を実行してもよろしいですか？
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">キャンセル</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button>確認</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      render: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button>ダイアログを開く</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>確認</DialogTitle>
              <DialogDescription>
                この操作を実行してもよろしいですか？
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onPress={() => {}}>キャンセル</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onPress={() => {}}>確認</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
  ],
  notes: [
    'Compound Components パターンを使用しています',
    'asChild を使用すると、子要素がトリガーになります',
  ],
};
