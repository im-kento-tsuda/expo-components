import React from 'react';
import { View } from 'react-native';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Typography,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

export const accordionDoc: ComponentDoc = {
  id: 'accordion',
  name: 'Accordion',
  description: '折りたたみ可能なコンテンツセクション',
  category: 'layout',
  importStatement: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['AccordionItem', 'AccordionTrigger', 'AccordionContent'],
  props: [
    {
      name: 'type',
      type: '"single" | "multiple"',
      required: false,
      defaultValue: '"single"',
      description: '単一または複数のアイテムを開けるかどうか',
    },
    {
      name: 'collapsible',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'すべてのアイテムを閉じれるかどうか（type="single"の場合）',
    },
    {
      name: 'defaultValue',
      type: 'string | string[]',
      required: false,
      description: 'デフォルトで開いているアイテムの値',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>これはアコーディオンですか？</AccordionTrigger>
    <AccordionContent>
      <Typography variant="p">
        はい。アクセシブルな折りたたみコンポーネントです。
      </Typography>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>スタイルのカスタマイズは可能ですか？</AccordionTrigger>
    <AccordionContent>
      <Typography variant="p">
        はい。style プロパティで自由にカスタマイズできます。
      </Typography>
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
      render: () => (
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>これはアコーディオンですか？</AccordionTrigger>
            <AccordionContent>
              <Typography variant="p">
                はい。アクセシブルな折りたたみコンポーネントです。
              </Typography>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>スタイルのカスタマイズは可能ですか？</AccordionTrigger>
            <AccordionContent>
              <Typography variant="p">
                はい。style プロパティで自由にカスタマイズできます。
              </Typography>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
  ],
  notes: [
    'Compound Components パターンを使用しています',
    '開閉時にアニメーションが適用されます',
  ],
};
