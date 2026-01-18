import React from 'react';
import { View } from 'react-native';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  Button,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const alertDialogDoc: ComponentDoc = {
  id: 'alert-dialog',
  name: 'AlertDialog',
  description: '確認ダイアログコンポーネント',
  category: 'feedback',
  importStatement: `import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['AlertDialogTrigger', 'AlertDialogContent', 'AlertDialogHeader', 'AlertDialogFooter', 'AlertDialogTitle', 'AlertDialogDescription', 'AlertDialogCancel', 'AlertDialogAction'],
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
      title: '削除確認ダイアログ',
      code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">アカウントを削除</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
      <AlertDialogDescription>
        この操作は取り消せません。
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel asChild>
        <Button variant="outline">キャンセル</Button>
      </AlertDialogCancel>
      <AlertDialogAction asChild>
        <Button variant="destructive">削除</Button>
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      render: () => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">アカウントを削除</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
              <AlertDialogDescription>
                この操作は取り消せません。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline" onPress={() => {}}>キャンセル</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive" onPress={() => {}}>削除</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
  ],
  notes: [
    'Dialog とは異なり、確認/キャンセルアクションに特化しています',
    'AlertDialogCancel と AlertDialogAction は asChild で使用します',
  ],
};
