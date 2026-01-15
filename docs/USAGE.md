# @im-kento-tsuda/expo-components 利用ガイド

## 1. 認証設定

### 1.1 .npmrc の設定

利用するExpoプロジェクトのルートに `.npmrc` を作成：

```
@im-kento-tsuda:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

### 1.2 環境変数の設定

#### ローカル開発

```bash
export NPM_TOKEN=ghp_xxxxxxxxxxxx
```

または `~/.bashrc` / `~/.zshrc` に追加：

```bash
echo 'export NPM_TOKEN=ghp_xxxxxxxxxxxx' >> ~/.zshrc
source ~/.zshrc
```

#### CI/CD（GitHub Actions）

リポジトリの Settings → Secrets and variables → Actions → New repository secret

- Name: `NPM_TOKEN`
- Value: Personal Access Token

## 2. インストール

```bash
pnpm add @im-kento-tsuda/expo-components
```

## 3. 使用例

```typescript
import { Button, Card } from '@im-kento-tsuda/expo-components';

export default function HomeScreen() {
  return (
    <Card title="Welcome">
      <Button
        title="Get Started"
        variant="primary"
        onPress={() => console.log('Pressed!')}
      />
    </Card>
  );
}
```

## 4. コンポーネント一覧

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | - | ボタンのラベル |
| variant | 'primary' \| 'secondary' \| 'outline' \| 'ghost' | 'primary' | ボタンのスタイル |
| size | 'sm' \| 'md' \| 'lg' | 'md' | ボタンのサイズ |
| loading | boolean | false | ローディング状態 |
| disabled | boolean | false | 無効状態 |
| onPress | () => void | - | クリック時のコールバック |

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | - | カードのタイトル |
| children | ReactNode | - | カードの内容 |
| padding | 'none' \| 'sm' \| 'md' \| 'lg' | 'md' | パディングサイズ |
| shadow | boolean | true | シャドウの表示 |

## 5. トラブルシューティング

### 401 Unauthorized エラー

- `.npmrc` の設定を確認
- `NPM_TOKEN` 環境変数が設定されているか確認
- トークンの有効期限を確認
- トークンに `read:packages` 権限があるか確認
