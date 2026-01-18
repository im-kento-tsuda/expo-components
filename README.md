# @im-kento-tsuda/expo-components

React Native / Expo 向けの UI コンポーネントライブラリ。[shadcn/ui](https://ui.shadcn.com/) のデザインパターンを React Native に適用しています。

## 特徴

- shadcn/ui スタイルのモダンなデザイン
- ダークモード対応（light / dark / system）
- TypeScript 完全対応
- Compound Components パターンによる柔軟な構成
- forwardRef による ref 転送サポート
- NativeWind (Tailwind CSS) オプション対応

---

## 導入ガイド

### Step 1: パッケージをインストール

```bash
# npm の場合
npm install @im-kento-tsuda/expo-components

# yarn の場合
yarn add @im-kento-tsuda/expo-components

# pnpm の場合
pnpm add @im-kento-tsuda/expo-components
```

### Step 2: 必要な依存パッケージをインストール

このライブラリは以下のパッケージに依存しています。Expo CLI でインストールしてください：

```bash
npx expo install react-native-gesture-handler react-native-svg
```

### Step 3: ThemeProvider をセットアップ

`App.tsx`（または `_layout.tsx`）でアプリ全体を `ThemeProvider` でラップします：

```tsx
// App.tsx
import { ThemeProvider } from '@im-kento-tsuda/expo-components';

export default function App() {
  return (
    <ThemeProvider defaultMode="system">
      {/* ここにアプリのコンテンツ */}
    </ThemeProvider>
  );
}
```

**ThemeProvider のオプション：**

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `defaultMode` | `'light' \| 'dark' \| 'system'` | `'system'` | 初期テーマモード |
| `children` | `ReactNode` | - | 子コンポーネント |

### Step 4: コンポーネントを使用

これで準備完了です！コンポーネントをインポートして使用できます：

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Typography,
} from '@im-kento-tsuda/expo-components';

function MyScreen() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ようこそ</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography>コンポーネントライブラリへようこそ！</Typography>
        <Button onPress={() => alert('クリック!')}>
          ボタンを押す
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Step 5: Toast を使用する場合（オプション）

Toast 通知を使用する場合は、`ToastProvider` も追加してください：

```tsx
// App.tsx
import { ThemeProvider, ToastProvider } from '@im-kento-tsuda/expo-components';

export default function App() {
  return (
    <ThemeProvider defaultMode="system">
      <ToastProvider>
        {/* ここにアプリのコンテンツ */}
      </ToastProvider>
    </ThemeProvider>
  );
}
```

Toast の使用方法：

```tsx
import { Button, useToast } from '@im-kento-tsuda/expo-components';

function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onPress={() => {
        toast({
          title: '保存しました',
          description: 'データが正常に保存されました',
        });
      }}
    >
      保存
    </Button>
  );
}
```

---

## クイックスタート例

以下は最小限の動作例です：

```tsx
// App.tsx
import { View, StyleSheet } from 'react-native';
import {
  ThemeProvider,
  Button,
  Typography,
  useColors,
} from '@im-kento-tsuda/expo-components';

function HomeScreen() {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Typography variant="h1">Hello World</Typography>
      <Button onPress={() => console.log('pressed!')}>
        はじめる
      </Button>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultMode="system">
      <HomeScreen />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
});
```

---

## コンポーネント一覧

### Form Inputs
| コンポーネント | 説明 |
|--------------|------|
| Button | ボタン（default, secondary, outline, ghost, link, destructive） |
| Input | テキスト入力フィールド |
| Textarea | 複数行テキスト入力 |
| Checkbox | チェックボックス |
| Switch | トグルスイッチ |
| RadioGroup | ラジオボタングループ |
| Select | セレクトボックス |
| Slider | スライダー |
| Calendar | カレンダー |
| DatePicker | 日付選択 |
| InputOTP | ワンタイムパスワード入力 |
| Toggle | トグルボタン |
| Label | ラベル |
| Field | フォームフィールド |
| Form | フォーム |

### Layout
| コンポーネント | 説明 |
|--------------|------|
| Card | カードコンテナ |
| Separator | 区切り線 |
| AspectRatio | アスペクト比コンテナ |
| ScrollArea | スクロールエリア |
| ButtonGroup | ボタングループ |
| Accordion | アコーディオン |
| Collapsible | 折りたたみコンテナ |
| Tabs | タブ |

### Data Display
| コンポーネント | 説明 |
|--------------|------|
| Typography | テキスト表示 |
| Badge | バッジ |
| Avatar | アバター |
| Skeleton | スケルトンローダー |
| Table | テーブル |
| Empty | 空状態表示 |
| Carousel | カルーセル |
| Chart | チャート |
| Progress | プログレスバー |

### Feedback
| コンポーネント | 説明 |
|--------------|------|
| Alert | アラート |
| Dialog | ダイアログ |
| AlertDialog | 確認ダイアログ |
| Sheet | ボトムシート |
| Toast | トースト通知 |
| Tooltip | ツールチップ |
| Popover | ポップオーバー |
| Spinner | ローディングスピナー |

### Navigation
| コンポーネント | 説明 |
|--------------|------|
| Breadcrumb | パンくずリスト |
| Pagination | ページネーション |
| NavigationMenu | ナビゲーションメニュー |
| Command | コマンドパレット |

## テーマ

### useTheme

現在のテーマモードを取得・変更します：

```tsx
import { useTheme } from '@im-kento-tsuda/expo-components';

function ThemeToggle() {
  const { mode, setMode, colorScheme } = useTheme();

  return (
    <Button onPress={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      現在: {colorScheme}
    </Button>
  );
}
```

### useColors

現在のテーマカラーを取得します：

```tsx
import { useColors } from '@im-kento-tsuda/expo-components';

function MyComponent() {
  const colors = useColors();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.foreground }}>テキスト</Text>
    </View>
  );
}
```

### 利用可能なカラー

| カラー名 | 用途 |
|---------|------|
| `background` | 画面背景 |
| `foreground` | メインテキスト |
| `card` | カード背景 |
| `cardForeground` | カード内テキスト |
| `primary` | プライマリ背景 |
| `primaryForeground` | プライマリテキスト |
| `secondary` | セカンダリ背景 |
| `secondaryForeground` | セカンダリテキスト |
| `muted` | ミュート背景 |
| `mutedForeground` | ミュートテキスト |
| `destructive` | 危険なアクション背景 |
| `destructiveForeground` | 危険なアクションテキスト |
| `border` | ボーダー色 |
| `input` | 入力フィールドボーダー |
| `ring` | フォーカスリング |

---

## NativeWind (Tailwind CSS) 対応

このライブラリは NativeWind に対応しています。すべてのコンポーネントに `className` prop が用意されており、Tailwind クラスでスタイルをカスタマイズできます。

**注意**: NativeWind はオプションです。セットアップしなくてもライブラリは正常に動作します。

### セットアップ

1. NativeWind をインストール：

```bash
npx expo install nativewind tailwindcss
```

2. `tailwind.config.js` を作成：

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@im-kento-tsuda/expo-components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. `babel.config.js` を更新：

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
```

4. `global.css` を作成：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. `App.tsx` で CSS をインポート：

```tsx
import './global.css';
```

### 使用例

```tsx
import { Button, Card, CardContent, Badge } from '@im-kento-tsuda/expo-components';

function MyComponent() {
  return (
    <>
      {/* className でスタイルをカスタマイズ */}
      <Button className="bg-blue-500 rounded-full">
        カスタムボタン
      </Button>

      <Card className="border-2 border-red-500">
        <CardContent className="p-8">
          カスタムカード
        </CardContent>
      </Card>

      <Badge className="bg-green-500">
        カスタムバッジ
      </Badge>
    </>
  );
}
```

### スタイルの優先順位

スタイルは以下の順序で適用されます（後のものが優先）：

1. コンポーネントの基本スタイル
2. バリアントスタイル（`variant` prop）
3. `className`（NativeWind）
4. `style` prop

```tsx
{/* style は className より優先される */}
<Button
  variant="default"           {/* 2. バリアント */}
  className="bg-blue-500"     {/* 3. className */}
  style={{ backgroundColor: 'red' }}  {/* 4. 最優先 */}
>
  このボタンは赤色
</Button>
```

### テキスト用 className

一部のコンポーネントでは、テキスト要素用の `textClassName` も提供しています：

```tsx
<Button
  className="bg-blue-500"
  textClassName="text-yellow-300 font-bold"
>
  カスタムテキストスタイル
</Button>

<Badge
  className="bg-purple-500"
  textClassName="text-white text-lg"
>
  カスタムバッジ
</Badge>
```

---

## Example アプリ

`example/` ディレクトリにドキュメントアプリが含まれています。すべてのコンポーネントのデモと使用例を確認できます。

```bash
cd example
pnpm install
npx expo start
```

## 開発

```bash
# 依存関係インストール
pnpm install

# 開発モード（ウォッチ）
pnpm dev

# ビルド
pnpm build

# 型チェック
pnpm typecheck

# Lint
pnpm lint
```

## ライセンス

MIT
