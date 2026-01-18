import type { Category } from './types';

export const categories: Category[] = [
  {
    id: 'form-inputs',
    name: 'Form Inputs',
    description: 'フォーム入力コンポーネント',
    icon: '📝',
  },
  {
    id: 'layout',
    name: 'Layout',
    description: 'レイアウトコンポーネント',
    icon: '📐',
  },
  {
    id: 'data-display',
    name: 'Data Display',
    description: 'データ表示コンポーネント',
    icon: '📊',
  },
  {
    id: 'feedback',
    name: 'Feedback',
    description: 'フィードバックコンポーネント',
    icon: '💬',
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'ナビゲーションコンポーネント',
    icon: '🧭',
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}
