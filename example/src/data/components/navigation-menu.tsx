import React from 'react';
import { View } from 'react-native';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const navigationMenuDoc: ComponentDoc = {
  id: 'navigation-menu',
  name: 'NavigationMenu',
  description: 'ナビゲーションメニューコンポーネント',
  category: 'navigation',
  importStatement: `import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['NavigationMenuList', 'NavigationMenuItem', 'NavigationMenuTrigger', 'NavigationMenuContent', 'NavigationMenuLink'],
  props: [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'アイテムの識別子',
    },
    {
      name: 'active',
      type: 'boolean',
      required: false,
      description: 'アクティブ状態（NavigationMenuLink）',
    },
    {
      name: 'onPress',
      type: '() => void',
      required: false,
      description: 'クリック時のコールバック',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="getting-started">
      <NavigationMenuTrigger value="getting-started">
        はじめに
      </NavigationMenuTrigger>
      <NavigationMenuContent value="getting-started">
        <NavigationMenuLink onPress={() => {}}>
          インストール
        </NavigationMenuLink>
        <NavigationMenuLink onPress={() => {}}>
          クイックスタート
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem value="components">
      <NavigationMenuTrigger value="components">
        コンポーネント
      </NavigationMenuTrigger>
      <NavigationMenuContent value="components">
        <NavigationMenuLink onPress={() => {}} active>
          Button
        </NavigationMenuLink>
        <NavigationMenuLink onPress={() => {}}>
          Card
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink onPress={() => {}}>
        ドキュメント
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
      render: () => (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem value="getting-started">
              <NavigationMenuTrigger value="getting-started">
                はじめに
              </NavigationMenuTrigger>
              <NavigationMenuContent value="getting-started">
                <NavigationMenuLink onPress={() => {}}>
                  インストール
                </NavigationMenuLink>
                <NavigationMenuLink onPress={() => {}}>
                  クイックスタート
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="components">
              <NavigationMenuTrigger value="components">
                コンポーネント
              </NavigationMenuTrigger>
              <NavigationMenuContent value="components">
                <NavigationMenuLink onPress={() => {}} active>
                  Button
                </NavigationMenuLink>
                <NavigationMenuLink onPress={() => {}}>
                  Card
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink onPress={() => {}}>
                ドキュメント
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ),
    },
  ],
  notes: [
    'Compound Components パターンを使用しています',
    'NavigationMenuTrigger をタップするとコンテンツが表示されます',
  ],
};
