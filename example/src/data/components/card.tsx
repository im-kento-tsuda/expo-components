import React from 'react';
import { View } from 'react-native';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Typography,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const cardDoc: ComponentDoc = {
  id: 'card',
  name: 'Card',
  description: 'カードコンテナコンポーネント。Compound Components パターンで構成',
  category: 'layout',
  importStatement: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'カードの内容',
    },
    {
      name: 'style',
      type: 'ViewStyle',
      required: false,
      description: 'カスタムスタイル',
    },
  ],
  examples: [
    {
      title: '基本的なカード',
      code: `<Card>
  <CardHeader>
    <CardTitle>カードタイトル</CardTitle>
    <CardDescription>カードの説明文</CardDescription>
  </CardHeader>
  <CardContent>
    <Typography variant="p">
      カードのコンテンツがここに入ります。
    </Typography>
  </CardContent>
  <CardFooter>
    <Button>アクション</Button>
  </CardFooter>
</Card>`,
      render: () => (
        <Card>
          <CardHeader>
            <CardTitle>カードタイトル</CardTitle>
            <CardDescription>カードの説明文</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="p">
              カードのコンテンツがここに入ります。
            </Typography>
          </CardContent>
          <CardFooter>
            <Button onPress={() => {}}>アクション</Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      title: 'フッター付きカード',
      code: `<Card>
  <CardHeader>
    <CardTitle>確認</CardTitle>
    <CardDescription>変更を保存しますか？</CardDescription>
  </CardHeader>
  <CardFooter style={{ gap: 8 }}>
    <Button variant="outline">キャンセル</Button>
    <Button>保存</Button>
  </CardFooter>
</Card>`,
      render: () => (
        <Card>
          <CardHeader>
            <CardTitle>確認</CardTitle>
            <CardDescription>変更を保存しますか？</CardDescription>
          </CardHeader>
          <CardFooter style={{ gap: 8 }}>
            <Button variant="outline" onPress={() => {}}>キャンセル</Button>
            <Button onPress={() => {}}>保存</Button>
          </CardFooter>
        </Card>
      ),
    },
  ],
  notes: [
    'Compound Components パターンを使用しています',
    '各サブコンポーネントは省略可能です',
  ],
};
