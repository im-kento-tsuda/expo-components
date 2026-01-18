import React from 'react';
import { View } from 'react-native';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  Typography,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const commandDoc: ComponentDoc = {
  id: 'command',
  name: 'Command',
  description: 'コマンドパレット/検索コンポーネント',
  category: 'navigation',
  importStatement: `import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['CommandInput', 'CommandList', 'CommandEmpty', 'CommandGroup', 'CommandItem', 'CommandSeparator'],
  props: [
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: '検索入力のプレースホルダー（CommandInput）',
    },
    {
      name: 'onSelect',
      type: '() => void',
      required: false,
      description: '選択時のコールバック（CommandItem）',
    },
    {
      name: 'heading',
      type: 'string',
      required: false,
      description: 'グループの見出し（CommandGroup）',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `<Command>
  <CommandInput placeholder="検索..." />
  <CommandList>
    <CommandEmpty>結果が見つかりません</CommandEmpty>
    <CommandGroup heading="提案">
      <CommandItem onSelect={() => {}}>カレンダー</CommandItem>
      <CommandItem onSelect={() => {}}>検索</CommandItem>
      <CommandItem onSelect={() => {}}>設定</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="設定">
      <CommandItem onSelect={() => {}}>プロフィール</CommandItem>
      <CommandItem onSelect={() => {}}>アカウント</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
      render: () => (
        <Command>
          <CommandInput placeholder="検索..." />
          <CommandList>
            <CommandEmpty>結果が見つかりません</CommandEmpty>
            <CommandGroup heading="提案">
              <CommandItem value="calendar" onSelect={() => {}}>カレンダー</CommandItem>
              <CommandItem value="search" onSelect={() => {}}>検索</CommandItem>
              <CommandItem value="settings" onSelect={() => {}}>設定</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="設定">
              <CommandItem value="profile" onSelect={() => {}}>プロフィール</CommandItem>
              <CommandItem value="account" onSelect={() => {}}>アカウント</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      ),
    },
  ],
  notes: [
    'Compound Components パターンを使用しています',
    'CommandInput に入力すると、自動的にフィルタリングされます',
  ],
};
