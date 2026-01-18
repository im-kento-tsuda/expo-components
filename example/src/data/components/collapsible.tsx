import React from 'react';
import { View } from 'react-native';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Typography,
  Button,
  useColors,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function CollapsibleExample() {
  const colors = useColors();
  return (
    <Collapsible>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
        <Typography variant="p" style={{ fontWeight: '500' }}>
          @peduarte starred 3 repositories
        </Typography>
        <CollapsibleTrigger>
          <Button variant="ghost" size="sm" onPress={() => {}}>Toggle</Button>
        </CollapsibleTrigger>
      </View>
      <View style={{ paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 6, marginTop: 8 }}>
        <Typography variant="muted">@radix-ui/primitives</Typography>
      </View>
      <CollapsibleContent>
        <View style={{ paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 6, marginTop: 8 }}>
          <Typography variant="muted">@radix-ui/colors</Typography>
        </View>
        <View style={{ paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 6, marginTop: 8 }}>
          <Typography variant="muted">@stitches/react</Typography>
        </View>
      </CollapsibleContent>
    </Collapsible>
  );
}

export const collapsibleDoc: ComponentDoc = {
  id: 'collapsible',
  name: 'Collapsible',
  description: '展開/折りたたみ可能なコンテナ',
  category: 'layout',
  importStatement: `import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['CollapsibleTrigger', 'CollapsibleContent'],
  props: [
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: '開閉状態（制御モード）',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: '開閉状態変更時のコールバック',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'デフォルトの開閉状態',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `<Collapsible>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Typography>@peduarte starred 3 repositories</Typography>
    <CollapsibleTrigger>
      <Button variant="ghost" size="sm">Toggle</Button>
    </CollapsibleTrigger>
  </View>
  <View style={{ ... }}>
    <Typography variant="muted">@radix-ui/primitives</Typography>
  </View>
  <CollapsibleContent>
    <View style={{ ... }}>
      <Typography variant="muted">@radix-ui/colors</Typography>
    </View>
  </CollapsibleContent>
</Collapsible>`,
      render: () => <CollapsibleExample />,
    },
  ],
};
