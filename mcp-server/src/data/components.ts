export type CategoryId =
  | "form-inputs"
  | "layout"
  | "data-display"
  | "feedback"
  | "navigation";

export interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

export interface ExampleInfo {
  title: string;
  description?: string;
  code: string;
}

export interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  importStatement: string;
  props: PropInfo[];
  subComponents?: string[];
  examples: ExampleInfo[];
  notes?: string[];
}

export const components: ComponentInfo[] = [
  // Form Inputs
  {
    id: "button",
    name: "Button",
    description:
      "クリック可能なボタンコンポーネント。複数のバリアントとサイズをサポートします。",
    category: "form-inputs",
    importStatement: `import { Button } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
        required: false,
        defaultValue: '"default"',
        description: "ボタンのスタイルバリアント",
      },
      {
        name: "size",
        type: '"sm" | "default" | "lg" | "icon"',
        required: false,
        defaultValue: '"default"',
        description: "ボタンのサイズ",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "無効状態にする",
      },
      {
        name: "loading",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "ローディング状態を表示する",
      },
      {
        name: "onPress",
        type: "() => void",
        required: false,
        description: "クリック時のコールバック",
      },
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "ボタンのコンテンツ",
      },
    ],
    examples: [
      {
        title: "バリアント",
        description: "利用可能なボタンバリアント",
        code: `<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</View>`,
      },
      {
        title: "サイズ",
        description: "利用可能なボタンサイズ",
        code: `<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
</View>`,
      },
      {
        title: "状態",
        description: "無効状態とローディング状態",
        code: `<View style={{ flexDirection: 'row', gap: 8 }}>
  <Button disabled>Disabled</Button>
  <Button loading>Loading</Button>
</View>`,
      },
    ],
    notes: [
      "loading プロパティを true にすると、ボタン内にスピナーが表示されます",
      "disabled と loading は同時に設定可能ですが、loading が優先されます",
    ],
  },
  {
    id: "input",
    name: "Input",
    description: "テキスト入力フィールドコンポーネント",
    category: "form-inputs",
    importStatement: `import { Input } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "placeholder",
        type: "string",
        required: false,
        description: "プレースホルダーテキスト",
      },
      {
        name: "value",
        type: "string",
        required: false,
        description: "入力値",
      },
      {
        name: "onChangeText",
        type: "(text: string) => void",
        required: false,
        description: "テキスト変更時のコールバック",
      },
      {
        name: "editable",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "編集可能かどうか",
      },
      {
        name: "secureTextEntry",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "パスワード入力モード",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `const [value, setValue] = useState('');

<View style={{ gap: 8 }}>
  <Label>名前</Label>
  <Input
    placeholder="名前を入力..."
    value={value}
    onChangeText={setValue}
  />
</View>`,
      },
    ],
    notes: [
      "React Native の TextInput のすべてのプロパティを継承しています",
      "テーマに応じて自動的にスタイルが変更されます",
    ],
  },
  {
    id: "textarea",
    name: "Textarea",
    description: "複数行テキスト入力フィールド",
    category: "form-inputs",
    importStatement: `import { Textarea } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "placeholder",
        type: "string",
        required: false,
        description: "プレースホルダーテキスト",
      },
      {
        name: "value",
        type: "string",
        required: false,
        description: "入力値",
      },
      {
        name: "onChangeText",
        type: "(text: string) => void",
        required: false,
        description: "テキスト変更時のコールバック",
      },
      {
        name: "minRows",
        type: "number",
        required: false,
        defaultValue: "3",
        description: "最小行数",
      },
      {
        name: "maxRows",
        type: "number",
        required: false,
        description: "最大行数",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `const [value, setValue] = useState('');

<View style={{ gap: 8 }}>
  <Label>説明</Label>
  <Textarea
    placeholder="説明を入力..."
    value={value}
    onChangeText={setValue}
    minRows={3}
  />
</View>`,
      },
    ],
  },
  {
    id: "checkbox",
    name: "Checkbox",
    description: "チェックボックスコンポーネント",
    category: "form-inputs",
    importStatement: `import { Checkbox } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "checked",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "チェック状態",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        required: false,
        description: "状態変更時のコールバック",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "無効状態",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `const [checked, setChecked] = useState(false);

<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  <Checkbox checked={checked} onCheckedChange={setChecked} />
  <Label>利用規約に同意する</Label>
</View>`,
      },
    ],
  },
  {
    id: "switch",
    name: "Switch",
    description: "トグルスイッチコンポーネント",
    category: "form-inputs",
    importStatement: `import { Switch } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "checked",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "オン状態",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        required: false,
        description: "状態変更時のコールバック",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "無効状態",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `const [checked, setChecked] = useState(false);

<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <View style={{ gap: 2 }}>
    <Label>通知を受け取る</Label>
    <Typography variant="muted">メール通知を有効にします</Typography>
  </View>
  <Switch checked={checked} onCheckedChange={setChecked} />
</View>`,
      },
    ],
  },
  {
    id: "radio-group",
    name: "RadioGroup",
    description: "ラジオボタングループコンポーネント",
    category: "form-inputs",
    importStatement: `import { RadioGroup, RadioGroupItem } from '@im-kento-tsuda/expo-components';`,
    subComponents: ["RadioGroupItem"],
    props: [
      {
        name: "value",
        type: "string",
        required: false,
        description: "選択された値",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        required: false,
        description: "値変更時のコールバック",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "全体を無効にする",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `const [value, setValue] = useState('option1');

<RadioGroup value={value} onValueChange={setValue}>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
    <RadioGroupItem value="option1" />
    <Typography variant="p">無料プラン</Typography>
  </View>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
    <RadioGroupItem value="option2" />
    <Typography variant="p">プロプラン</Typography>
  </View>
</RadioGroup>`,
      },
    ],
  },
  {
    id: "select",
    name: "Select",
    description: "ドロップダウン選択コンポーネント",
    category: "form-inputs",
    importStatement: `import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@im-kento-tsuda/expo-components';`,
    subComponents: ["SelectTrigger", "SelectValue", "SelectContent", "SelectItem"],
    props: [
      {
        name: "value",
        type: "string",
        required: false,
        description: "選択された値",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        required: false,
        description: "値変更時のコールバック",
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        description: "プレースホルダーテキスト（SelectValue）",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `const [value, setValue] = useState('');

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="選択してください..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="react">React</SelectItem>
    <SelectItem value="vue">Vue</SelectItem>
    <SelectItem value="angular">Angular</SelectItem>
  </SelectContent>
</Select>`,
      },
    ],
    notes: ["Compound Components パターンを使用しています"],
  },
  {
    id: "slider",
    name: "Slider",
    description: "スライダー入力コンポーネント",
    category: "form-inputs",
    importStatement: `import { Slider } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "value",
        type: "number",
        required: false,
        defaultValue: "0",
        description: "現在の値",
      },
      {
        name: "onValueChange",
        type: "(value: number) => void",
        required: false,
        description: "値変更時のコールバック",
      },
      {
        name: "min",
        type: "number",
        required: false,
        defaultValue: "0",
        description: "最小値",
      },
      {
        name: "max",
        type: "number",
        required: false,
        defaultValue: "100",
        description: "最大値",
      },
      {
        name: "step",
        type: "number",
        required: false,
        defaultValue: "1",
        description: "ステップ値",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "無効状態",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `const [value, setValue] = useState(50);

<View style={{ gap: 8 }}>
  <Label>音量: {value}%</Label>
  <Slider
    value={value}
    onValueChange={setValue}
    min={0}
    max={100}
    step={1}
  />
</View>`,
      },
    ],
  },
  {
    id: "label",
    name: "Label",
    description: "フォームラベルコンポーネント",
    category: "form-inputs",
    importStatement: `import { Label } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "ラベルテキスト",
      },
      {
        name: "required",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "必須マーク（*）を表示",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "無効スタイル",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `<View style={{ gap: 8 }}>
  <Label>名前</Label>
  <Input placeholder="名前を入力..." />
</View>`,
      },
      {
        title: "必須ラベル",
        code: `<Label required>メールアドレス</Label>`,
      },
    ],
  },
  // Layout
  {
    id: "card",
    name: "Card",
    description: "カードコンテナコンポーネント。Compound Components パターンで構成",
    category: "layout",
    importStatement: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@im-kento-tsuda/expo-components';`,
    subComponents: [
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter",
    ],
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "カードの内容",
      },
      {
        name: "style",
        type: "ViewStyle",
        required: false,
        description: "カスタムスタイル",
      },
    ],
    examples: [
      {
        title: "基本的なカード",
        code: `<Card>
  <CardHeader>
    <CardTitle>カードタイトル</CardTitle>
    <CardDescription>カードの説明文</CardDescription>
  </CardHeader>
  <CardContent>
    <Typography variant="p">
      カードのコンテンツがここに入ります。
    </Typography>
  </CardContent>
  <CardFooter>
    <Button>アクション</Button>
  </CardFooter>
</Card>`,
      },
    ],
    notes: [
      "Compound Components パターンを使用しています",
      "各サブコンポーネントは省略可能です",
    ],
  },
  {
    id: "separator",
    name: "Separator",
    description: "区切り線コンポーネント",
    category: "layout",
    importStatement: `import { Separator } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        required: false,
        defaultValue: '"horizontal"',
        description: "区切り線の方向",
      },
      {
        name: "style",
        type: "ViewStyle",
        required: false,
        description: "カスタムスタイル",
      },
    ],
    examples: [
      {
        title: "水平区切り線",
        code: `<View>
  <Typography variant="p">上のコンテンツ</Typography>
  <Separator style={{ marginVertical: 12 }} />
  <Typography variant="p">下のコンテンツ</Typography>
</View>`,
      },
      {
        title: "垂直区切り線",
        code: `<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
  <Typography variant="small">左</Typography>
  <Separator orientation="vertical" style={{ height: 20 }} />
  <Typography variant="small">右</Typography>
</View>`,
      },
    ],
  },
  {
    id: "accordion",
    name: "Accordion",
    description: "折りたたみ可能なコンテンツセクション",
    category: "layout",
    importStatement: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@im-kento-tsuda/expo-components';`,
    subComponents: ["AccordionItem", "AccordionTrigger", "AccordionContent"],
    props: [
      {
        name: "type",
        type: '"single" | "multiple"',
        required: false,
        defaultValue: '"single"',
        description: "単一または複数のアイテムを開けるかどうか",
      },
      {
        name: "collapsible",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "すべてのアイテムを閉じれるかどうか（type=\"single\"の場合）",
      },
      {
        name: "defaultValue",
        type: "string | string[]",
        required: false,
        description: "デフォルトで開いているアイテムの値",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
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
      },
    ],
    notes: [
      "Compound Components パターンを使用しています",
      "開閉時にアニメーションが適用されます",
    ],
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "タブ切り替えコンポーネント",
    category: "layout",
    importStatement: `import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@im-kento-tsuda/expo-components';`,
    subComponents: ["TabsList", "TabsTrigger", "TabsContent"],
    props: [
      {
        name: "defaultValue",
        type: "string",
        required: false,
        description: "デフォルトで選択されるタブの値",
      },
      {
        name: "value",
        type: "string",
        required: false,
        description: "選択されているタブの値（制御モード）",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        required: false,
        description: "タブ変更時のコールバック",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">アカウント</TabsTrigger>
    <TabsTrigger value="password">パスワード</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>アカウント設定</CardTitle>
      </CardHeader>
    </Card>
  </TabsContent>
  <TabsContent value="password">
    <Card>
      <CardHeader>
        <CardTitle>パスワード変更</CardTitle>
      </CardHeader>
    </Card>
  </TabsContent>
</Tabs>`,
      },
    ],
    notes: [
      "Compound Components パターンを使用しています",
      "TabsContent の value は TabsTrigger の value と一致させてください",
    ],
  },
  // Data Display
  {
    id: "typography",
    name: "Typography",
    description: "テキストスタイリングコンポーネント",
    category: "data-display",
    importStatement: `import { Typography } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "variant",
        type: '"h1" | "h2" | "h3" | "h4" | "p" | "lead" | "large" | "small" | "muted"',
        required: false,
        defaultValue: '"p"',
        description: "テキストスタイルバリアント",
      },
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "テキストコンテンツ",
      },
      {
        name: "style",
        type: "TextStyle",
        required: false,
        description: "カスタムスタイル",
      },
    ],
    examples: [
      {
        title: "見出し",
        code: `<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>`,
      },
      {
        title: "本文スタイル",
        code: `<Typography variant="lead">リードテキスト</Typography>
<Typography variant="p">通常のパラグラフ</Typography>
<Typography variant="large">Large text</Typography>
<Typography variant="small">Small text</Typography>
<Typography variant="muted">Muted text</Typography>`,
      },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    description: "ステータスやラベルを表示するバッジ",
    category: "data-display",
    importStatement: `import { Badge } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "destructive" | "outline"',
        required: false,
        defaultValue: '"default"',
        description: "バッジのスタイルバリアント",
      },
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "バッジのコンテンツ",
      },
    ],
    examples: [
      {
        title: "バリアント",
        code: `<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</View>`,
      },
    ],
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "ユーザープロフィール画像コンポーネント",
    category: "data-display",
    importStatement: `import { Avatar, AvatarImage, AvatarFallback } from '@im-kento-tsuda/expo-components';`,
    subComponents: ["AvatarImage", "AvatarFallback"],
    props: [
      {
        name: "size",
        type: '"sm" | "default" | "lg"',
        required: false,
        defaultValue: '"default"',
        description: "アバターのサイズ",
      },
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "AvatarImage と AvatarFallback",
      },
    ],
    examples: [
      {
        title: "サイズ",
        code: `<View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
  <Avatar size="sm">
    <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar size="default">
    <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar size="lg">
    <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</View>`,
      },
    ],
    notes: [
      "AvatarImage が読み込めない場合、AvatarFallback が表示されます",
      "フォールバックには通常イニシャルを使用します",
    ],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    description: "ローディングプレースホルダーコンポーネント",
    category: "data-display",
    importStatement: `import { Skeleton } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "width",
        type: 'number | string',
        required: false,
        defaultValue: '"100%"',
        description: "幅",
      },
      {
        name: "height",
        type: "number",
        required: false,
        defaultValue: "20",
        description: "高さ",
      },
      {
        name: "circle",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "円形にする",
      },
      {
        name: "borderRadius",
        type: "number",
        required: false,
        defaultValue: "4",
        description: "角丸",
      },
    ],
    examples: [
      {
        title: "ユーザーカードのスケルトン",
        code: `<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
  <Skeleton width={48} height={48} circle />
  <View style={{ gap: 8 }}>
    <Skeleton width={150} height={16} />
    <Skeleton width={100} height={14} />
  </View>
</View>`,
      },
    ],
  },
  {
    id: "progress",
    name: "Progress",
    description: "プログレスバーコンポーネント",
    category: "data-display",
    importStatement: `import { Progress } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "value",
        type: "number",
        required: false,
        defaultValue: "0",
        description: "進捗率（0-100）",
      },
      {
        name: "indeterminate",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "不確定モード（ローディング）",
      },
    ],
    examples: [
      {
        title: "確定的な進捗",
        code: `<View style={{ gap: 8 }}>
  <Typography variant="small">60%</Typography>
  <Progress value={60} />
</View>`,
      },
      {
        title: "不確定モード",
        code: `<Progress indeterminate />`,
      },
    ],
  },
  // Feedback
  {
    id: "alert",
    name: "Alert",
    description: "アラートメッセージコンポーネント",
    category: "feedback",
    importStatement: `import { Alert, AlertTitle, AlertDescription } from '@im-kento-tsuda/expo-components';`,
    subComponents: ["AlertTitle", "AlertDescription"],
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        required: false,
        defaultValue: '"default"',
        description: "アラートのスタイルバリアント",
      },
    ],
    examples: [
      {
        title: "デフォルト",
        code: `<Alert>
  <AlertTitle>お知らせ</AlertTitle>
  <AlertDescription>
    新しいアップデートが利用可能です。
  </AlertDescription>
</Alert>`,
      },
      {
        title: "エラー",
        code: `<Alert variant="destructive">
  <AlertTitle>エラー</AlertTitle>
  <AlertDescription>
    処理中にエラーが発生しました。
  </AlertDescription>
</Alert>`,
      },
    ],
  },
  {
    id: "dialog",
    name: "Dialog",
    description: "モーダルダイアログコンポーネント",
    category: "feedback",
    importStatement: `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@im-kento-tsuda/expo-components';`,
    subComponents: [
      "DialogTrigger",
      "DialogContent",
      "DialogHeader",
      "DialogTitle",
      "DialogDescription",
      "DialogFooter",
      "DialogClose",
    ],
    props: [
      {
        name: "open",
        type: "boolean",
        required: false,
        description: "開閉状態（制御モード）",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: false,
        description: "開閉状態変更時のコールバック",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button>ダイアログを開く</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>確認</DialogTitle>
      <DialogDescription>
        この操作を実行してもよろしいですか？
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">キャンセル</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button>確認</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    ],
    notes: [
      "Compound Components パターンを使用しています",
      "asChild を使用すると、子要素がトリガーになります",
    ],
  },
  {
    id: "sheet",
    name: "Sheet",
    description: "ボトムシート/サイドパネルコンポーネント",
    category: "feedback",
    importStatement: `import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@im-kento-tsuda/expo-components';`,
    subComponents: [
      "SheetTrigger",
      "SheetContent",
      "SheetHeader",
      "SheetTitle",
      "SheetDescription",
      "SheetClose",
    ],
    props: [
      {
        name: "side",
        type: '"top" | "bottom" | "left" | "right"',
        required: false,
        defaultValue: '"bottom"',
        description: "表示位置",
      },
      {
        name: "open",
        type: "boolean",
        required: false,
        description: "開閉状態（制御モード）",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: false,
        description: "開閉状態変更時のコールバック",
      },
    ],
    examples: [
      {
        title: "ボトムシート",
        code: `<Sheet side="bottom">
  <SheetTrigger asChild>
    <Button variant="outline">下から</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>メニュー</SheetTitle>
      <SheetDescription>アクションを選択</SheetDescription>
    </SheetHeader>
    <SheetClose asChild>
      <Button>閉じる</Button>
    </SheetClose>
  </SheetContent>
</Sheet>`,
      },
    ],
  },
  {
    id: "toast",
    name: "Toast",
    description: "トースト通知コンポーネント",
    category: "feedback",
    importStatement: `import { ToastProvider, useToast } from '@im-kento-tsuda/expo-components';`,
    subComponents: ["ToastProvider"],
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "トーストのタイトル",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "トーストの説明",
      },
      {
        name: "variant",
        type: '"default" | "destructive"',
        required: false,
        defaultValue: '"default"',
        description: "トーストのスタイル",
      },
      {
        name: "duration",
        type: "number",
        required: false,
        defaultValue: "3000",
        description: "表示時間（ミリ秒）",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        description: "ToastProvider でアプリをラップし、useToast フックを使用",
        code: `// App.tsx
<ToastProvider>
  <AppContent />
</ToastProvider>

// コンポーネント内
const { toast } = useToast();

<Button onPress={() => toast({ title: '保存しました' })}>
  トースト表示
</Button>`,
      },
    ],
    notes: [
      "ToastProvider をアプリのルートに配置する必要があります",
      "useToast フックで toast 関数を取得して使用します",
    ],
  },
  {
    id: "popover",
    name: "Popover",
    description: "ポップオーバーコンポーネント",
    category: "feedback",
    importStatement: `import { Popover, PopoverTrigger, PopoverContent } from '@im-kento-tsuda/expo-components';`,
    subComponents: ["PopoverTrigger", "PopoverContent"],
    props: [
      {
        name: "side",
        type: '"top" | "bottom" | "left" | "right"',
        required: false,
        defaultValue: '"bottom"',
        description: "表示位置",
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        required: false,
        defaultValue: '"center"',
        description: "配置",
      },
      {
        name: "open",
        type: "boolean",
        required: false,
        description: "表示状態（制御モード）",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: false,
        description: "表示状態変更時のコールバック",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `<Popover side="bottom" align="start">
  <PopoverTrigger asChild>
    <Button variant="outline">下に表示</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Typography variant="p">ポップオーバーの内容</Typography>
  </PopoverContent>
</Popover>`,
      },
    ],
  },
  {
    id: "spinner",
    name: "Spinner",
    description: "ローディングスピナーコンポーネント",
    category: "feedback",
    importStatement: `import { Spinner } from '@im-kento-tsuda/expo-components';`,
    props: [
      {
        name: "size",
        type: '"sm" | "default" | "lg"',
        required: false,
        defaultValue: '"default"',
        description: "スピナーのサイズ",
      },
      {
        name: "color",
        type: "string",
        required: false,
        description: "カスタムカラー",
      },
    ],
    examples: [
      {
        title: "サイズ",
        code: `<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
  <Spinner size="sm" />
  <Spinner size="default" />
  <Spinner size="lg" />
</View>`,
      },
    ],
  },
  // Navigation
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    description: "パンくずリストコンポーネント",
    category: "navigation",
    importStatement: `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@im-kento-tsuda/expo-components';`,
    subComponents: [
      "BreadcrumbList",
      "BreadcrumbItem",
      "BreadcrumbLink",
      "BreadcrumbPage",
      "BreadcrumbSeparator",
      "BreadcrumbEllipsis",
    ],
    props: [
      {
        name: "onPress",
        type: "() => void",
        required: false,
        description: "リンククリック時のコールバック（BreadcrumbLink）",
      },
    ],
    examples: [
      {
        title: "基本的な使用法",
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink onPress={() => {}}>Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink onPress={() => {}}>Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
    ],
    notes: [
      "BreadcrumbPage は現在のページを示します",
      "BreadcrumbEllipsis は省略記号を表示します",
    ],
  },
];

// Helper functions
export function getComponentById(id: string): ComponentInfo | undefined {
  return components.find((comp) => comp.id === id);
}

export function getComponentsByCategory(categoryId: CategoryId): ComponentInfo[] {
  return components.filter((comp) => comp.category === categoryId);
}

export function searchComponents(query: string): ComponentInfo[] {
  const lowerQuery = query.toLowerCase();
  return components.filter((comp) => {
    // Search in name
    if (comp.name.toLowerCase().includes(lowerQuery)) return true;
    // Search in description
    if (comp.description.toLowerCase().includes(lowerQuery)) return true;
    // Search in props
    if (comp.props.some((p) => p.name.toLowerCase().includes(lowerQuery))) return true;
    // Search in subComponents
    if (comp.subComponents?.some((s) => s.toLowerCase().includes(lowerQuery))) return true;
    return false;
  });
}
