import React from 'react';
import { View } from 'react-native';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const tableDoc: ComponentDoc = {
  id: 'table',
  name: 'Table',
  description: 'データテーブルコンポーネント',
  category: 'data-display',
  importStatement: `import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['TableHeader', 'TableBody', 'TableRow', 'TableHead', 'TableCell'],
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'テーブルの内容',
    },
  ],
  examples: [
    {
      title: '基本的なテーブル',
      code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>名前</TableHead>
      <TableHead>メール</TableHead>
      <TableHead>役割</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>田中太郎</TableCell>
      <TableCell>tanaka@example.com</TableCell>
      <TableCell>管理者</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>佐藤花子</TableCell>
      <TableCell>sato@example.com</TableCell>
      <TableCell>ユーザー</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      render: () => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>メール</TableHead>
              <TableHead>役割</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>田中太郎</TableCell>
              <TableCell>tanaka@example.com</TableCell>
              <TableCell>管理者</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>佐藤花子</TableCell>
              <TableCell>sato@example.com</TableCell>
              <TableCell>ユーザー</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
    },
  ],
  notes: [
    'Compound Components パターンを使用しています',
    'ScrollArea と組み合わせてスクロール可能にできます',
  ],
};
