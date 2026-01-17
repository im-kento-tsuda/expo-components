import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  ThemeProvider,
  useTheme,
  useColors,
  Typography,
  Badge,
  Separator,
  Skeleton,
  Spinner,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Input,
  Textarea,
  Label,
  Checkbox,
  Switch,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Slider,
  Progress,
  Alert,
  AlertTitle,
  AlertDescription,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  ToastProvider,
  useToast,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  type ThemeMode,
} from '@im-kento-tsuda/expo-components';

function ToastDemo() {
  const { toast } = useToast();

  return (
    <Card style={styles.section}>
      <CardHeader>
        <CardTitle>Toast</CardTitle>
        <CardDescription>トースト通知</CardDescription>
      </CardHeader>
      <CardContent>
        <View style={styles.row}>
          <Button
            variant="outline"
            onPress={() => toast({ title: '保存しました', description: '変更が保存されました。' })}
          >
            通常
          </Button>
          <Button
            variant="destructive"
            onPress={() => toast({ title: 'エラー', description: '処理に失敗しました。', variant: 'destructive' })}
          >
            エラー
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}

function ThemeSwitcher() {
  const { mode, setMode, colorScheme } = useTheme();

  const modes: ThemeMode[] = ['light', 'dark', 'system'];

  return (
    <Card style={styles.section}>
      <CardHeader>
        <CardTitle>Theme Switcher</CardTitle>
        <CardDescription>
          現在のモード: {mode} (実際: {colorScheme})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <View style={styles.row}>
          {modes.map((m) => (
            <Button
              key={m}
              variant={mode === m ? 'default' : 'outline'}
              size="sm"
              onPress={() => setMode(m)}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </Button>
          ))}
        </View>
      </CardContent>
    </Card>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [progressValue, setProgressValue] = useState(60);
  const colors = useColors();

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        <Typography variant="h1" style={styles.header}>
          コンポーネントカタログ
        </Typography>

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Typography セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>テキストスタイルバリアント</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Separator style={styles.separator} />
            <Typography variant="p">
              これは通常のパラグラフテキストです。本文に使用します。
            </Typography>
            <Typography variant="lead">
              これはリードテキストです。導入文に使用します。
            </Typography>
            <Typography variant="large">Large text</Typography>
            <Typography variant="small">Small text</Typography>
            <Typography variant="muted">Muted text - 補足説明に使用</Typography>
          </CardContent>
        </Card>

        {/* Badge セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Badge</CardTitle>
            <CardDescription>ステータスラベル</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.row}>
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </View>
          </CardContent>
        </Card>

        {/* Separator セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Separator</CardTitle>
            <CardDescription>区切り線</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="p">上のコンテンツ</Typography>
            <Separator style={styles.separator} />
            <Typography variant="p">下のコンテンツ</Typography>
            <View style={styles.rowCenter}>
              <Typography variant="small">左</Typography>
              <Separator orientation="vertical" style={styles.verticalSeparator} />
              <Typography variant="small">中</Typography>
              <Separator orientation="vertical" style={styles.verticalSeparator} />
              <Typography variant="small">右</Typography>
            </View>
          </CardContent>
        </Card>

        {/* Skeleton セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Skeleton</CardTitle>
            <CardDescription>ローディングプレースホルダー</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.skeletonRow}>
              <Skeleton width={48} height={48} circle />
              <View style={styles.skeletonText}>
                <Skeleton width={150} height={16} />
                <Skeleton width={100} height={14} />
              </View>
            </View>
            <Separator style={styles.separator} />
            <Skeleton width="100%" height={100} borderRadius={8} />
          </CardContent>
        </Card>

        {/* Spinner セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Spinner</CardTitle>
            <CardDescription>ローディングスピナー</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.row}>
              <View style={styles.spinnerItem}>
                <Spinner size="sm" />
                <Typography variant="small">Small</Typography>
              </View>
              <View style={styles.spinnerItem}>
                <Spinner size="default" />
                <Typography variant="small">Default</Typography>
              </View>
              <View style={styles.spinnerItem}>
                <Spinner size="lg" />
                <Typography variant="small">Large</Typography>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Avatar セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>プロフィール画像</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.row}>
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
              <Avatar size="lg">
                <AvatarFallback>KT</AvatarFallback>
              </Avatar>
            </View>
          </CardContent>
        </Card>

        {/* Form コンポーネント セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>フォーム入力コンポーネント</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Input */}
            <View style={styles.formGroup}>
              <Label required>名前</Label>
              <Input
                placeholder="名前を入力..."
                value={inputValue}
                onChangeText={setInputValue}
              />
            </View>

            {/* Textarea */}
            <View style={styles.formGroup}>
              <Label>説明</Label>
              <Textarea
                placeholder="説明を入力..."
                value={textareaValue}
                onChangeText={setTextareaValue}
                minRows={3}
              />
            </View>

            {/* Checkbox */}
            <View style={styles.formGroup}>
              <View style={styles.checkboxRow}>
                <Checkbox
                  checked={checkboxChecked}
                  onCheckedChange={setCheckboxChecked}
                />
                <Label disabled={!checkboxChecked}>利用規約に同意する</Label>
              </View>
            </View>

            {/* Switch */}
            <View style={styles.formGroup}>
              <View style={styles.switchRow}>
                <View style={styles.switchLabel}>
                  <Label>通知を受け取る</Label>
                  <Typography variant="muted">
                    メール通知を有効にします
                  </Typography>
                </View>
                <Switch
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                />
              </View>
            </View>

            {/* RadioGroup */}
            <View style={styles.formGroup}>
              <Label>プランを選択</Label>
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <View style={styles.radioRow}>
                  <RadioGroupItem value="option1" />
                  <Typography variant="p">無料プラン</Typography>
                </View>
                <View style={styles.radioRow}>
                  <RadioGroupItem value="option2" />
                  <Typography variant="p">プロプラン</Typography>
                </View>
                <View style={styles.radioRow}>
                  <RadioGroupItem value="option3" />
                  <Typography variant="p">エンタープライズ</Typography>
                </View>
              </RadioGroup>
            </View>

            {/* Disabled states */}
            <Separator style={styles.separator} />
            <Typography variant="small" style={styles.label}>Disabled States</Typography>
            <View style={styles.formGroup}>
              <Input placeholder="無効なInput" editable={false} />
            </View>
            <View style={styles.checkboxRow}>
              <Checkbox checked disabled />
              <Label disabled>無効なCheckbox</Label>
            </View>
            <View style={styles.switchRow}>
              <Label disabled>無効なSwitch</Label>
              <Switch checked disabled />
            </View>
          </CardContent>
        </Card>

        {/* Select セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Select</CardTitle>
            <CardDescription>ドロップダウン選択</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.formGroup}>
              <Label>フレームワーク</Label>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger>
                  <SelectValue placeholder="選択してください..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                  <SelectItem value="solid" disabled>Solid (準備中)</SelectItem>
                </SelectContent>
              </Select>
            </View>
            <Typography variant="muted">
              選択された値: {selectValue || '未選択'}
            </Typography>
          </CardContent>
        </Card>

        {/* Slider セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Slider</CardTitle>
            <CardDescription>スライダー入力</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.formGroup}>
              <Label>音量: {sliderValue}%</Label>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                min={0}
                max={100}
                step={1}
              />
            </View>
            <Separator style={styles.separator} />
            <View style={styles.formGroup}>
              <Label disabled>無効なスライダー</Label>
              <Slider value={30} disabled />
            </View>
          </CardContent>
        </Card>

        {/* Progress セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>プログレスバー</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.formGroup}>
              <Typography variant="small">確定的 ({progressValue}%)</Typography>
              <Progress value={progressValue} />
            </View>
            <View style={styles.formGroup}>
              <Typography variant="small">不確定的（ローディング）</Typography>
              <Progress indeterminate />
            </View>
          </CardContent>
        </Card>

        {/* Alert セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Alert</CardTitle>
            <CardDescription>アラートメッセージ</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert style={styles.alertItem}>
              <AlertTitle>お知らせ</AlertTitle>
              <AlertDescription>
                新しいアップデートが利用可能です。
              </AlertDescription>
            </Alert>
            <Alert variant="destructive" style={styles.alertItem}>
              <AlertTitle>エラー</AlertTitle>
              <AlertDescription>
                処理中にエラーが発生しました。もう一度お試しください。
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Button セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>Shadcn UI 風ボタンコンポーネント</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="small" style={styles.label}>Variants</Typography>
            <View style={styles.row}>
              <Button onPress={() => {}}>Default</Button>
              <Button variant="secondary" onPress={() => {}}>
                Secondary
              </Button>
            </View>
            <View style={styles.row}>
              <Button variant="destructive" onPress={() => {}}>
                Destructive
              </Button>
              <Button variant="outline" onPress={() => {}}>
                Outline
              </Button>
            </View>
            <View style={styles.row}>
              <Button variant="ghost" onPress={() => {}}>
                Ghost
              </Button>
              <Button variant="link" onPress={() => {}}>
                Link
              </Button>
            </View>

            <Typography variant="small" style={styles.label}>Sizes</Typography>
            <View style={styles.row}>
              <Button size="sm" onPress={() => {}}>
                Small
              </Button>
              <Button size="default" onPress={() => {}}>
                Default
              </Button>
              <Button size="lg" onPress={() => {}}>
                Large
              </Button>
            </View>

            <Typography variant="small" style={styles.label}>States</Typography>
            <View style={styles.row}>
              <Button disabled onPress={() => {}}>
                Disabled
              </Button>
              <Button loading={loading} onPress={handlePress}>
                Loading
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Dialog セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Dialog</CardTitle>
            <CardDescription>モーダルダイアログ</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
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
            </Dialog>
          </CardContent>
        </Card>

        {/* Sheet セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Sheet</CardTitle>
            <CardDescription>ボトムシート</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.row}>
              <Sheet side="bottom">
                <SheetTrigger asChild>
                  <Button variant="outline">下から</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>メニュー</SheetTitle>
                    <SheetDescription>
                      アクションを選択してください
                    </SheetDescription>
                  </SheetHeader>
                  <View style={styles.sheetButtons}>
                    <SheetClose asChild>
                      <Button variant="outline">オプション1</Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="outline">オプション2</Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button>閉じる</Button>
                    </SheetClose>
                  </View>
                </SheetContent>
              </Sheet>
              <Sheet side="right">
                <SheetTrigger asChild>
                  <Button variant="outline">右から</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>サイドパネル</SheetTitle>
                    <SheetDescription>
                      詳細情報を表示
                    </SheetDescription>
                  </SheetHeader>
                  <SheetClose asChild>
                    <Button>閉じる</Button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </View>
          </CardContent>
        </Card>

        {/* Toast セクション */}
        <ToastDemo />

        {/* Tooltip セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Tooltip</CardTitle>
            <CardDescription>ツールチップ（長押しで表示）</CardDescription>
          </CardHeader>
          <CardContent>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">長押ししてください</Button>
              </TooltipTrigger>
              <TooltipContent>ヒント: これはツールチップです</TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>

        {/* Card セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>
              Compound Components パターンで構成されたカード
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Card>
              <CardHeader>
                <CardTitle>ネストしたカード</CardTitle>
                <CardDescription>カードの中にカードを配置</CardDescription>
              </CardHeader>
              <CardContent>
                <Typography variant="p">
                  CardHeader, CardTitle, CardDescription, CardContent, CardFooter
                  を組み合わせて柔軟にレイアウトできます。
                </Typography>
              </CardContent>
              <CardFooter>
                <Button size="sm" onPress={() => {}}>
                  詳細を見る
                </Button>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>

        {/* フッター付きカード */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>アクションカード</CardTitle>
            <CardDescription>フッターにボタンを配置した例</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="p">
              CardFooter を使用してアクションボタンを配置できます。
            </Typography>
          </CardContent>
          <CardFooter style={styles.footerActions}>
            <Button variant="outline" onPress={() => {}}>
              キャンセル
            </Button>
            <Button onPress={() => {}}>保存</Button>
          </CardFooter>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultMode="system">
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  separator: {
    marginVertical: 12,
  },
  verticalSeparator: {
    height: 20,
  },
  skeletonRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  skeletonText: {
    gap: 8,
  },
  spinnerItem: {
    alignItems: 'center',
    gap: 8,
    padding: 8,
  },
  footerActions: {
    gap: 8,
  },
  formGroup: {
    marginBottom: 16,
    gap: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    flex: 1,
    gap: 2,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertItem: {
    marginBottom: 12,
  },
  sheetButtons: {
    marginTop: 16,
    gap: 8,
  },
});
