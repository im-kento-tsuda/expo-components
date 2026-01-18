import React from 'react';
import { View } from 'react-native';
import { Button } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const buttonDoc: ComponentDoc = {
  id: 'button',
  name: 'Button',
  description: 'クリック可能なボタンコンポーネント。複数のバリアントとサイズをサポートします。',
  category: 'form-inputs',
  importStatement: `import { Button } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: 'variant',
      type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
      required: false,
      defaultValue: '"default"',
      description: 'ボタンのスタイルバリアント',
    },
    {
      name: 'size',
      type: '"sm" | "default" | "lg" | "icon"',
      required: false,
      defaultValue: '"default"',
      description: 'ボタンのサイズ',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '無効状態にする',
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'ローディング状態を表示する',
    },
    {
      name: 'onPress',
      type: '() => void',
      required: false,
      description: 'クリック時のコールバック',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'ボタンのコンテンツ',
    },
  ],
  examples: [
    {
      title: 'バリアント',
      description: '利用可能なボタンバリアント',
      code: `<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</View>`,
      render: () => (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Button onPress={() => {}}>Default</Button>
          <Button variant="secondary" onPress={() => {}}>Secondary</Button>
          <Button variant="destructive" onPress={() => {}}>Destructive</Button>
          <Button variant="outline" onPress={() => {}}>Outline</Button>
          <Button variant="ghost" onPress={() => {}}>Ghost</Button>
          <Button variant="link" onPress={() => {}}>Link</Button>
        </View>
      ),
    },
    {
      title: 'サイズ',
      description: '利用可能なボタンサイズ',
      code: `<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
</View>`,
      render: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Button size="sm" onPress={() => {}}>Small</Button>
          <Button size="default" onPress={() => {}}>Default</Button>
          <Button size="lg" onPress={() => {}}>Large</Button>
        </View>
      ),
    },
    {
      title: '状態',
      description: '無効状態とローディング状態',
      code: `<View style={{ flexDirection: 'row', gap: 8 }}>
  <Button disabled>Disabled</Button>
  <Button loading>Loading</Button>
</View>`,
      render: () => (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button disabled onPress={() => {}}>Disabled</Button>
          <Button loading onPress={() => {}}>Loading</Button>
        </View>
      ),
    },
  ],
  notes: [
    'loading プロパティを true にすると、ボタン内にスピナーが表示されます',
    'disabled と loading は同時に設定可能ですが、loading が優先されます',
  ],
};
