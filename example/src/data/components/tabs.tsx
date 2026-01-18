import React from 'react';
import { View } from 'react-native';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Label,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const tabsDoc: ComponentDoc = {
  id: 'tabs',
  name: 'Tabs',
  description: 'タブ切り替えコンポーネント',
  category: 'layout',
  importStatement: `import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['TabsList', 'TabsTrigger', 'TabsContent'],
  props: [
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      description: 'デフォルトで選択されるタブの値',
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      description: '選択されているタブの値（制御モード）',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: false,
      description: 'タブ変更時のコールバック',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">アカウント</TabsTrigger>
    <TabsTrigger value="password">パスワード</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>アカウント設定</CardTitle>
        <CardDescription>アカウント情報を変更します</CardDescription>
      </CardHeader>
      <CardContent>
        <Label>名前</Label>
        <Input placeholder="名前を入力..." />
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="password">
    <Card>
      <CardHeader>
        <CardTitle>パスワード変更</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>現在のパスワード</Label>
        <Input placeholder="現在のパスワード" secureTextEntry />
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>`,
      render: () => (
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">アカウント</TabsTrigger>
            <TabsTrigger value="password">パスワード</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>アカウント設定</CardTitle>
                <CardDescription>アカウント情報を変更します</CardDescription>
              </CardHeader>
              <CardContent>
                <View style={{ gap: 8 }}>
                  <Label>名前</Label>
                  <Input placeholder="名前を入力..." />
                </View>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>パスワード変更</CardTitle>
              </CardHeader>
              <CardContent>
                <View style={{ gap: 8 }}>
                  <Label>現在のパスワード</Label>
                  <Input placeholder="現在のパスワード" secureTextEntry />
                </View>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ),
    },
  ],
  notes: [
    'Compound Components パターンを使用しています',
    'TabsContent の value は TabsTrigger の value と一致させてください',
  ],
};
