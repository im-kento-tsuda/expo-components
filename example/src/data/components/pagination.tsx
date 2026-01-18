import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  Typography,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function PaginationExample() {
  const [page, setPage] = useState(1);
  return (
    <View style={{ gap: 8 }}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onPress={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            />
          </PaginationItem>
          {[1, 2, 3].map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={page === p}
                onPress={() => setPage(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onPress={() => setPage((p) => p + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Typography variant="muted" style={{ textAlign: 'center' }}>
        現在のページ: {page}
      </Typography>
    </View>
  );
}

export const paginationDoc: ComponentDoc = {
  id: 'pagination',
  name: 'Pagination',
  description: 'ページネーションコンポーネント',
  category: 'navigation',
  importStatement: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['PaginationContent', 'PaginationItem', 'PaginationLink', 'PaginationPrevious', 'PaginationNext', 'PaginationEllipsis'],
  props: [
    {
      name: 'isActive',
      type: 'boolean',
      required: false,
      description: 'アクティブ状態（PaginationLink）',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: '無効状態',
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
      code: `const [page, setPage] = useState(1);

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious
        onPress={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      />
    </PaginationItem>
    {[1, 2, 3].map((p) => (
      <PaginationItem key={p}>
        <PaginationLink isActive={page === p} onPress={() => setPage(p)}>
          {p}
        </PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext onPress={() => setPage((p) => p + 1)} />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
      render: () => <PaginationExample />,
    },
  ],
};
