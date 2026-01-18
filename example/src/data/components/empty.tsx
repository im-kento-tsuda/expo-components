import React from 'react';
import { View } from 'react-native';
import { Empty, Button } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const emptyDoc: ComponentDoc = {
  id: 'empty',
  name: 'Empty',
  description: '空の状態を表示するコンポーネント',
  category: 'data-display',
  importStatement: `import { Empty } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'title',
      type: 'string',
      required: false,
      description: 'タイトル',
    },
    {
      name: 'description',
      type: 'string',
      required: false,
      description: '説明文',
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      required: false,
      description: 'アイコン',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      description: 'アクションボタン等',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `<Empty
  title="データがありません"
  description="まだデータが登録されていません"
/>`,
      render: () => (
        <Empty
          title="データがありません"
          description="まだデータが登録されていません"
        />
      ),
    },
    {
      title: 'アクション付き',
      code: `<Empty
  title="ファイルが見つかりません"
  description="新しいファイルを作成してください"
>
  <Button>ファイルを作成</Button>
</Empty>`,
      render: () => (
        <Empty
          title="ファイルが見つかりません"
          description="新しいファイルを作成してください"
        >
          <Button onPress={() => {}}>ファイルを作成</Button>
        </Empty>
      ),
    },
  ],
};
