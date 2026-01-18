import React from 'react';
import { View } from 'react-native';
import {
  ToastProvider,
  useToast,
  Button,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function ToastDemo() {
  const { toast } = useToast();
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Button
        variant="outline"
        onPress={() => toast({ title: '保存しました', description: '変更が保存されました。' })}
      >
        通常
      </Button>
      <Button
        variant="destructive"
        onPress={() => toast({ title: 'エラー', description: '処理に失敗しました。', variant: 'destructive' })}
      >
        エラー
      </Button>
    </View>
  );
}

export const toastDoc: ComponentDoc = {
  id: 'toast',
  name: 'Toast',
  description: 'トースト通知コンポーネント',
  category: 'feedback',
  importStatement: `import { ToastProvider, useToast } from '@im-kento-tsuda/expo-components';`,
  subComponents: ['ToastProvider'],
  props: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'トーストのタイトル',
    },
    {
      name: 'description',
      type: 'string',
      required: false,
      description: 'トーストの説明',
    },
    {
      name: 'variant',
      type: '"default" | "destructive"',
      required: false,
      defaultValue: '"default"',
      description: 'トーストのスタイル',
    },
    {
      name: 'duration',
      type: 'number',
      required: false,
      defaultValue: '3000',
      description: '表示時間（ミリ秒）',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      description: 'ToastProvider でアプリをラップし、useToast フックを使用',
      code: `// App.tsx
<ToastProvider>
  <AppContent />
</ToastProvider>

// コンポーネント内
const { toast } = useToast();

<Button onPress={() => toast({ title: '保存しました' })}>
  トースト表示
</Button>`,
      render: () => <ToastDemo />,
    },
  ],
  notes: [
    'ToastProvider をアプリのルートに配置する必要があります',
    'useToast フックで toast 関数を取得して使用します',
  ],
};
