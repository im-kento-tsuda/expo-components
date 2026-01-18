# expo-components MCP Server

`@im-kento-tsuda/expo-components` ライブラリのコンポーネント情報を提供するMCPサーバーです。Claude CodeなどのAIツールからコンポーネントのドキュメント、Props、使用例に直接アクセスできます。

## セットアップ

### 1. ビルド

```bash
cd mcp-server
pnpm install
pnpm build
```

### 2. Claude Code に設定

`~/.claude/settings.json` に以下を追加します：

```json
{
  "mcpServers": {
    "expo-components": {
      "command": "node",
      "args": ["/Users/あなたのユーザー名/path/to/expo-components/mcp-server/build/index.js"]
    }
  }
}
```

**注意**: `args` のパスは実際のプロジェクトパスに置き換えてください。

### 3. Claude Code を再起動

設定を反映するため、Claude Code を再起動します。

## 使い方

### コンポーネント一覧を取得

Claude に以下のように質問できます：

```
expo-components のコンポーネント一覧を教えて
```

または特定のカテゴリでフィルタ：

```
expo-components のフォーム入力系コンポーネントを教えて
```

### 特定コンポーネントの詳細を取得

```
expo-components の Button の使い方を教えて
```

```
Card コンポーネントの Props を教えて
```

### コンポーネントを検索

```
expo-components でダイアログ関連のコンポーネントはある？
```

```
入力フィールドに使えるコンポーネントを探して
```

## 提供される情報

### ツール (Tools)

| ツール名 | 説明 | パラメータ |
|---------|------|-----------|
| `list_components` | 全コンポーネント一覧を取得 | `category?`: カテゴリでフィルタ |
| `get_component` | コンポーネント詳細を取得 | `name`: コンポーネント名 |
| `search_components` | キーワード検索 | `query`: 検索キーワード |

### リソース (Resources)

| URI | 説明 |
|-----|------|
| `component://list` | 全コンポーネント一覧（JSON） |
| `component://{id}` | 特定コンポーネントの詳細（JSON） |

### カテゴリ一覧

| カテゴリID | 説明 | 含まれるコンポーネント例 |
|-----------|------|------------------------|
| `form-inputs` | フォーム入力 | Button, Input, Checkbox, Select, Slider |
| `layout` | レイアウト | Card, Tabs, Accordion, Separator |
| `data-display` | データ表示 | Typography, Badge, Avatar, Progress, Skeleton |
| `feedback` | フィードバック | Alert, Dialog, Toast, Sheet, Spinner |
| `navigation` | ナビゲーション | Breadcrumb |

## 使用例

### 例1: Button コンポーネントについて質問

**質問:**
```
expo-components の Button コンポーネントの使い方を教えて
```

**回答（Claude がMCPサーバーから取得した情報を基に回答）:**
```markdown
# Button

クリック可能なボタンコンポーネント。複数のバリアントとサイズをサポートします。

## Import

import { Button } from '@im-kento-tsuda/expo-components';

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| variant | "default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link" | No | "default" | ボタンのスタイルバリアント |
| size | "sm" \| "default" \| "lg" \| "icon" | No | "default" | ボタンのサイズ |
| loading | boolean | No | false | ローディング状態を表示する |
| disabled | boolean | No | false | 無効状態にする |

## Examples

<Button onPress={() => {}}>Default</Button>
<Button variant="destructive">Destructive</Button>
<Button loading>Loading</Button>
```

### 例2: フォーム関連コンポーネントを探す

**質問:**
```
expo-components でフォームを作るのに使えるコンポーネントを教えて
```

**回答:**
Claude が `list_components` ツールを `category: "form-inputs"` で呼び出し、
Button, Input, Textarea, Checkbox, Switch, RadioGroup, Select, Slider, Label などの一覧を返します。

### 例3: ダイアログの実装方法を聞く

**質問:**
```
expo-components でモーダルダイアログを表示する方法を教えて
```

**回答:**
Claude が `get_component` ツールを `name: "dialog"` で呼び出し、
Dialog, DialogTrigger, DialogContent などのサブコンポーネントの使い方と
コード例を返します。

## 開発

### ディレクトリ構成

```
mcp-server/
├── package.json
├── tsconfig.json
├── README.md
├── src/
│   ├── index.ts              # エントリーポイント
│   ├── server.ts             # MCPサーバー実装
│   └── data/
│       └── components.ts     # コンポーネントデータ
└── build/                    # ビルド出力
```

### 開発コマンド

```bash
# ビルド
pnpm build

# ウォッチモード（開発中）
pnpm dev

# サーバー起動
pnpm start

# MCP Inspector でデバッグ
pnpm inspector
```

### コンポーネントの追加・更新

1. `src/data/components.ts` にコンポーネントデータを追加
2. `ComponentInfo` インターフェースに従って記述
3. `pnpm build` で再ビルド

```typescript
// src/data/components.ts に追加
{
  id: "new-component",
  name: "NewComponent",
  description: "新しいコンポーネントの説明",
  category: "form-inputs",
  importStatement: `import { NewComponent } from '@im-kento-tsuda/expo-components';`,
  props: [
    {
      name: "propName",
      type: "string",
      required: true,
      description: "プロパティの説明",
    },
  ],
  examples: [
    {
      title: "基本的な使用法",
      code: `<NewComponent propName="value" />`,
    },
  ],
}
```

## トラブルシューティング

### MCPサーバーが認識されない

1. `~/.claude/settings.json` のパスが正しいか確認
2. `build/index.js` が存在するか確認
3. Claude Code を再起動

### ビルドエラー

```bash
# node_modules を削除して再インストール
rm -rf node_modules
pnpm install
pnpm build
```

## ライセンス

MIT
