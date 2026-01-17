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

export interface [ComponentName]Props extends Omit<ViewProps, 'style'> {
  children: React.ReactNode;
  style?: ViewStyle;
}

const [ComponentName] = forwardRef<View, [ComponentName]Props>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();

    const containerStyle: ViewStyle = {
      backgroundColor: colors.background,
      borderColor: colors.border,
    };

    return (
      <View ref={ref} style={cn<ViewStyle>(styles.base, containerStyle, style)} {...props}>
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
4. **Props は Omit<NativeProps, 'style'>** - style は独自の型で定義
5. **cn() でスタイル結合** - 配列スプレッドではなく cn() を使用
