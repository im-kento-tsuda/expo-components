# CLAUDE.md - コンポーネントライブラリ設計ガイド

このドキュメントは、新規コンポーネント作成時にAIが従うべき設計パターンを定義します。

## 設計原則

このライブラリは **Shadcn UI** のパターンを React Native に適用しています。

### 1. ThemeProvider によるダークモード対応

すべてのコンポーネントは `useColors()` を使用してテーマカラーを取得します。

```typescript
import { useColors } from '../../lib/theme';

const MyComponent = () => {
  const colors = useColors();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.foreground }}>Hello</Text>
    </View>
  );
};
```

#### 利用可能なカラー

| カラー名 | 用途 |
|---------|------|
| `background` | 画面背景 |
| `foreground` | メインテキスト |
| `card` | カード背景 |
| `cardForeground` | カード内テキスト |
| `primary` | プライマリボタン背景 |
| `primaryForeground` | プライマリボタンテキスト |
| `secondary` | セカンダリボタン背景 |
| `secondaryForeground` | セカンダリボタンテキスト |
| `muted` | ミュート背景 |
| `mutedForeground` | ミュートテキスト（説明文等） |
| `destructive` | 危険なアクション背景 |
| `destructiveForeground` | 危険なアクションテキスト |
| `border` | ボーダー色 |
| `input` | 入力フィールドボーダー |
| `ring` | フォーカスリング |

### 2. forwardRef パターン

すべてのコンポーネントは `forwardRef` を使用して ref を転送します。

```typescript
import React, { forwardRef } from 'react';
import { View, type ViewProps } from 'react-native';

const MyComponent = forwardRef<View, MyComponentProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={style} {...props}>
        {children}
      </View>
    );
  }
);

MyComponent.displayName = 'MyComponent';

export { MyComponent };
```

### 3. cn() ユーティリティによるスタイル結合

スタイルの結合には `cn()` ユーティリティを使用します。

```typescript
import { cn } from '../../lib/utils';

const containerStyle = cn<ViewStyle>(
  styles.base,           // 基本スタイル
  variantStyles[variant], // バリアントスタイル
  disabled && styles.disabled, // 条件付きスタイル
  style                  // カスタムスタイル（props）
);
```

### 4. Compound Components パターン

複雑なコンポーネントは Compound Components パターンで分割します。

**例: Card**
```
src/components/Card/
├── Card.tsx           # メインコンテナ
├── CardHeader.tsx     # ヘッダー
├── CardTitle.tsx      # タイトル
├── CardDescription.tsx # 説明文
├── CardContent.tsx    # コンテンツ
├── CardFooter.tsx     # フッター
└── index.ts           # エクスポート
```

**使用例:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>タイトル</CardTitle>
    <CardDescription>説明文</CardDescription>
  </CardHeader>
  <CardContent>
    <Text>コンテンツ</Text>
  </CardContent>
  <CardFooter>
    <Button>アクション</Button>
  </CardFooter>
</Card>
```

### 5. NativeWind (className) 対応

すべてのコンポーネントは `className` prop をサポートしています。NativeWind を使用するプロジェクトでは Tailwind クラスでスタイルをカスタマイズできます。

#### 基本パターン

```typescript
export interface MyComponentProps extends Omit<ViewProps, 'style' | 'className'> {
  children: React.ReactNode;
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const MyComponent = forwardRef<View, MyComponentProps>(
  ({ children, style, className, ...props }, ref) => {
    return (
      <View ref={ref} className={className} style={containerStyle} {...props}>
        {children}
      </View>
    );
  }
);
```

#### テキストを含むコンポーネント

テキスト要素を持つコンポーネントは `textClassName` も提供します：

```typescript
export interface ButtonProps extends Omit<TouchableOpacityProps, 'style' | 'className'> {
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  /** NativeWind className (コンテナ用) */
  className?: string;
  /** NativeWind className (テキスト用) */
  textClassName?: string;
}

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ children, style, textStyle, className, textClassName, ...props }, ref) => {
    return (
      <TouchableOpacity ref={ref} className={className} style={containerStyle} {...props}>
        {typeof children === 'string' ? (
          <Text className={textClassName} style={textStyleMerged}>
            {children}
          </Text>
        ) : children}
      </TouchableOpacity>
    );
  }
);
```

#### スタイルの優先順位

スタイルは以下の順序で適用されます（後のものが優先）：

1. コンポーネントの基本スタイル（StyleSheet.create）
2. バリアントスタイル（variant prop）
3. `className`（NativeWind）
4. `style` prop

#### 重要な注意事項

- NativeWind はユーザー側でセットアップが必要（オプション）
- NativeWind がない環境では `className` は単に無視される
- `style` prop は常に `className` より優先される

## ファイル構造

```
src/
├── components/
│   └── [ComponentName]/
│       ├── [ComponentName].tsx
│       └── index.ts
├── lib/
│   ├── theme.tsx      # ThemeProvider, useTheme, useColors
│   └── utils.ts       # cn() ユーティリティ
└── index.ts           # メインエクスポート
```

## 新規コンポーネント作成手順

### 1. コンポーネントファイル作成

`src/components/[ComponentName]/[ComponentName].tsx`:

```typescript
import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

export interface [ComponentName]Props extends Omit<ViewProps, 'style' | 'className'> {
  children: React.ReactNode;
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const [ComponentName] = forwardRef<View, [ComponentName]Props>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();

    const containerStyle: ViewStyle = {
      backgroundColor: colors.background,
      borderColor: colors.border,
    };

    return (
      <View ref={ref} className={className} style={cn<ViewStyle>(styles.base, containerStyle, style)} {...props}>
        {children}
      </View>
    );
  }
);

[ComponentName].displayName = '[ComponentName]';

const styles = StyleSheet.create({
  base: {
    // 基本スタイル
  },
});

export { [ComponentName] };
```

### 2. index.ts でエクスポート

`src/components/[ComponentName]/index.ts`:

```typescript
export { [ComponentName] } from './[ComponentName]';
export type { [ComponentName]Props } from './[ComponentName]';
```

### 3. メインエクスポートに追加

`src/components/index.ts` に追加:

```typescript
export * from './[ComponentName]';
```

## バリアント対応コンポーネント

バリアントがある場合は、テーマカラーを使用した動的スタイル生成関数を作成します。

```typescript
function getVariantStyles(colors: ThemeColors): Record<Variant, ViewStyle> {
  return {
    default: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.secondary },
    outline: { backgroundColor: 'transparent', borderColor: colors.border },
    // ...
  };
}
```

## 重要なルール

1. **色のハードコードは禁止** - 必ず `useColors()` から取得
2. **forwardRef 必須** - すべてのコンポーネントで ref を転送
3. **displayName 必須** - デバッグ用に設定
4. **Props は Omit<NativeProps, 'style' | 'className'>** - style と className は独自の型で定義
5. **cn() でスタイル結合** - 配列スプレッドではなく cn() を使用
6. **className 必須** - すべてのコンポーネントに `className` prop を追加し、ルート要素にパススルー
7. **textClassName（該当する場合）** - テキスト要素を持つコンポーネントは `textClassName` も提供
8. **ドキュメント更新必須** - コンポーネントの追加・編集時は必ずドキュメントも更新

## ドキュメントアプリの更新

コンポーネントを追加・編集した場合、`example/src/data/components/` 内のドキュメントファイルも更新してください。

### ドキュメントファイルの場所

```
example/src/data/components/
├── index.ts              # 全ドキュメントのエクスポート
├── button.tsx            # Button ドキュメント
├── card.tsx              # Card ドキュメント
└── [component-name].tsx  # 各コンポーネントのドキュメント
```

### 新規コンポーネントのドキュメント作成

`example/src/data/components/[component-name].tsx` を作成:

```typescript
import React from 'react';
import { [ComponentName] } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function [ComponentName]Example() {
  return (
    <[ComponentName]>
      {/* デモ用のコード */}
    </[ComponentName]>
  );
}

export const [componentName]Doc: ComponentDoc = {
  id: '[component-name]',           // ケバブケース
  name: '[ComponentName]',          // 表示名
  description: 'コンポーネントの説明',
  category: 'form-inputs',          // カテゴリID（下記参照）
  importStatement: `import { [ComponentName] } from '@im-kento-tsuda/expo-components';`,
  subComponents: ['SubComponent1', 'SubComponent2'],  // オプション
  props: [
    {
      name: 'propName',
      type: 'string',
      required: true,
      defaultValue: 'default',      // オプション
      description: 'プロパティの説明',
    },
  ],
  examples: [
    {
      title: '基本的な使用法',
      code: `<[ComponentName]>...</[ComponentName]>`,
      render: () => <[ComponentName]Example />,
    },
  ],
  notes: ['注意事項があれば記載'],    // オプション
};
```

### カテゴリID

| ID | カテゴリ名 | 内容 |
|----|-----------|------|
| `form-inputs` | Form Inputs | Button, Input, Select など |
| `layout` | Layout | Card, Tabs, Accordion など |
| `data-display` | Data Display | Typography, Badge, Avatar など |
| `feedback` | Feedback | Alert, Dialog, Toast など |
| `navigation` | Navigation | Breadcrumb, Pagination など |

### index.ts への追加

`example/src/data/components/index.ts` にインポートと登録を追加:

```typescript
// インポート追加
import { [componentName]Doc } from './[component-name]';

// allComponents 配列に追加
export const allComponents: ComponentDoc[] = [
  // ... 既存のドキュメント
  [componentName]Doc,
];
```

### 既存コンポーネントの編集時

Props の追加・変更・削除を行った場合:
1. 該当ドキュメントファイルの `props` 配列を更新
2. 必要に応じて `examples` のコードとデモも更新
