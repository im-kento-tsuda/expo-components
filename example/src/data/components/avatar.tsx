import React from 'react';
import { View } from 'react-native';
import { Avatar, AvatarImage, AvatarFallback } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const avatarDoc: ComponentDoc = {
  id: 'avatar',
  name: 'Avatar',
  description: 'ユーザープロフィール画像コンポーネント',
  category: 'data-display',
  importStatement: `import { Avatar, AvatarImage, AvatarFallback } from '@im-kento-tsuda/expo-components';`,
  subComponents: ['AvatarImage', 'AvatarFallback'],
  props: [
    {
      name: 'size',
      type: '"sm" | "default" | "lg"',
      required: false,
      defaultValue: '"default"',
      description: 'アバターのサイズ',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'AvatarImage と AvatarFallback',
    },
  ],
  examples: [
    {
      title: 'サイズ',
      code: `<View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
  <Avatar size="sm">
    <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar size="default">
    <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar size="lg">
    <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</View>`,
      render: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Avatar size="sm">
            <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </View>
      ),
    },
    {
      title: 'フォールバック',
      description: '画像が読み込めない場合にイニシャルを表示',
      code: `<Avatar size="lg">
  <AvatarFallback>KT</AvatarFallback>
</Avatar>`,
      render: () => (
        <Avatar size="lg">
          <AvatarFallback>KT</AvatarFallback>
        </Avatar>
      ),
    },
  ],
  notes: [
    'AvatarImage が読み込めない場合、AvatarFallback が表示されます',
    'フォールバックには通常イニシャルを使用します',
  ],
};
