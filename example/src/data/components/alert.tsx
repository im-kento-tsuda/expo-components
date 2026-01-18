import React from 'react';
import { View } from 'react-native';
import { Alert, AlertTitle, AlertDescription } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const alertDoc: ComponentDoc = {
  id: 'alert',
  name: 'Alert',
  description: 'アラートメッセージコンポーネント',
  category: 'feedback',
  importStatement: `import { Alert, AlertTitle, AlertDescription } from '@im-kento-tsuda/expo-components';`,
  subComponents: ['AlertTitle', 'AlertDescription'],
  props: [
    {
      name: 'variant',
      type: '"default" | "destructive"',
      required: false,
      defaultValue: '"default"',
      description: 'アラートのスタイルバリアント',
    },
  ],
  examples: [
    {
      title: 'デフォルト',
      code: `<Alert>
  <AlertTitle>お知らせ</AlertTitle>
  <AlertDescription>
    新しいアップデートが利用可能です。
  </AlertDescription>
</Alert>`,
      render: () => (
        <Alert>
          <AlertTitle>お知らせ</AlertTitle>
          <AlertDescription>
            新しいアップデートが利用可能です。
          </AlertDescription>
        </Alert>
      ),
    },
    {
      title: 'エラー',
      code: `<Alert variant="destructive">
  <AlertTitle>エラー</AlertTitle>
  <AlertDescription>
    処理中にエラーが発生しました。
  </AlertDescription>
</Alert>`,
      render: () => (
        <Alert variant="destructive">
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>
            処理中にエラーが発生しました。
          </AlertDescription>
        </Alert>
      ),
    },
  ],
};
