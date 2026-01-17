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
  InputGroup,
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  Calendar,
  DatePicker,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  Combobox,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  ChartContainer,
  ChartLegend,
  BarChart,
  LineChart,
  PieChart,
  type ChartDataPoint,
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
  const [togglePressed, setTogglePressed] = useState(false);
  const [toggleGroupValue, setToggleGroupValue] = useState<string[]>(['bold']);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [comboboxValue, setComboboxValue] = useState('');
  const colors = useColors();

  // チャートデータ
  const chartData: ChartDataPoint[] = [
    { label: '1月', value: 186, color: colors.primary },
    { label: '2月', value: 305, color: colors.primary },
    { label: '3月', value: 237, color: colors.primary },
    { label: '4月', value: 273, color: colors.primary },
    { label: '5月', value: 209, color: colors.primary },
    { label: '6月', value: 314, color: colors.primary },
  ];

  const pieChartData: ChartDataPoint[] = [
    { label: 'Chrome', value: 275, color: '#4285f4' },
    { label: 'Safari', value: 200, color: '#34a853' },
    { label: 'Firefox', value: 187, color: '#ff7139' },
    { label: 'Edge', value: 173, color: '#0078d4' },
    { label: 'Other', value: 90, color: '#9e9e9e' },
  ];

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

        {/* InputGroup セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>InputGroup</CardTitle>
            <CardDescription>入力フィールドとアドオン</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.formGroup}>
              <Label>URL入力</Label>
              <InputGroup
                leftAddon="https://"
                placeholder="example.com"
              />
            </View>
            <View style={styles.formGroup}>
              <Label>メールアドレス</Label>
              <InputGroup
                rightAddon="@gmail.com"
                placeholder="username"
              />
            </View>
            <View style={styles.formGroup}>
              <Label>金額入力</Label>
              <InputGroup
                leftAddon="¥"
                rightAddon=".00"
                placeholder="1,000"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroup}>
              <Label>アイコン付き</Label>
              <InputGroup
                leftElement={<Typography variant="muted">🔍</Typography>}
                rightElement={<Typography variant="muted">✕</Typography>}
                placeholder="検索..."
              />
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

        {/* AlertDialog セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>AlertDialog</CardTitle>
            <CardDescription>確認ダイアログ</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">アカウントを削除</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は取り消せません。アカウントとすべてのデータが完全に削除されます。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button variant="outline">キャンセル</Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button variant="destructive">削除</Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Popover セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Popover</CardTitle>
            <CardDescription>ポップオーバー</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.row}>
              <Popover side="bottom" align="start">
                <PopoverTrigger asChild>
                  <Button variant="outline">下に表示</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Typography variant="p" style={{ fontWeight: '500' }}>
                    ポップオーバー
                  </Typography>
                  <Typography variant="muted">
                    追加情報をここに表示できます。
                  </Typography>
                </PopoverContent>
              </Popover>
              <Popover side="top" align="center">
                <PopoverTrigger asChild>
                  <Button variant="outline">上に表示</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Typography variant="p" style={{ fontWeight: '500' }}>
                    上部ポップオーバー
                  </Typography>
                  <Typography variant="muted">
                    トリガーの上に表示されます。
                  </Typography>
                </PopoverContent>
              </Popover>
            </View>
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

        {/* Tabs セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>タブ切り替え</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">アカウント</TabsTrigger>
                <TabsTrigger value="password">パスワード</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>アカウント設定</CardTitle>
                    <CardDescription>
                      アカウント情報を変更します
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <View style={styles.formGroup}>
                      <Label>名前</Label>
                      <Input placeholder="名前を入力..." />
                    </View>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>パスワード変更</CardTitle>
                    <CardDescription>
                      パスワードを変更します
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <View style={styles.formGroup}>
                      <Label>現在のパスワード</Label>
                      <Input placeholder="現在のパスワード" secureTextEntry />
                    </View>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Accordion セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>折りたたみコンテンツ</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>これはアコーディオンですか？</AccordionTrigger>
                <AccordionContent>
                  <Typography variant="p">
                    はい。Shadcn UIのデザインパターンに従った、アクセシブルな折りたたみコンポーネントです。
                  </Typography>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>スタイルのカスタマイズは可能ですか？</AccordionTrigger>
                <AccordionContent>
                  <Typography variant="p">
                    はい。各コンポーネントはstyle propを受け取り、自由にカスタマイズできます。
                  </Typography>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>アニメーションはありますか？</AccordionTrigger>
                <AccordionContent>
                  <Typography variant="p">
                    はい。開閉時にスムーズなアニメーションが適用されます。
                  </Typography>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Collapsible セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Collapsible</CardTitle>
            <CardDescription>展開/折りたたみ</CardDescription>
          </CardHeader>
          <CardContent>
            <Collapsible>
              <View style={styles.collapsibleHeader}>
                <Typography variant="p" style={{ fontWeight: '500' }}>
                  @peduarte starred 3 repositories
                </Typography>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">Toggle</Button>
                </CollapsibleTrigger>
              </View>
              <View style={styles.collapsibleItem}>
                <Typography variant="muted">@radix-ui/primitives</Typography>
              </View>
              <CollapsibleContent>
                <View style={styles.collapsibleItem}>
                  <Typography variant="muted">@radix-ui/colors</Typography>
                </View>
                <View style={styles.collapsibleItem}>
                  <Typography variant="muted">@stitches/react</Typography>
                </View>
              </CollapsibleContent>
            </Collapsible>
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

        {/* Toggle セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Toggle</CardTitle>
            <CardDescription>トグルボタン</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.formGroup}>
              <Typography variant="small">単体トグル</Typography>
              <Toggle
                pressed={togglePressed}
                onPressedChange={setTogglePressed}
              >
                <Typography variant="p">B</Typography>
              </Toggle>
            </View>
            <Separator style={styles.separator} />
            <View style={styles.formGroup}>
              <Typography variant="small">トグルグループ（複数選択）</Typography>
              <ToggleGroup
                type="multiple"
                value={toggleGroupValue}
                onValueChange={setToggleGroupValue}
              >
                <ToggleGroupItem value="bold">
                  <Typography variant="p" style={{ fontWeight: 'bold' }}>B</Typography>
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <Typography variant="p" style={{ fontStyle: 'italic' }}>I</Typography>
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                  <Typography variant="p" style={{ textDecorationLine: 'underline' }}>U</Typography>
                </ToggleGroupItem>
              </ToggleGroup>
            </View>
          </CardContent>
        </Card>

        {/* ButtonGroup セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>ButtonGroup</CardTitle>
            <CardDescription>ボタングループ</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.formGroup}>
              <Typography variant="small">水平</Typography>
              <ButtonGroup>
                <Button variant="outline">左</Button>
                <Button variant="outline">中</Button>
                <Button variant="outline">右</Button>
              </ButtonGroup>
            </View>
            <View style={styles.formGroup}>
              <Typography variant="small">垂直</Typography>
              <ButtonGroup orientation="vertical">
                <Button variant="outline">上</Button>
                <Button variant="outline">中</Button>
                <Button variant="outline">下</Button>
              </ButtonGroup>
            </View>
          </CardContent>
        </Card>

        {/* Breadcrumb セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Breadcrumb</CardTitle>
            <CardDescription>パンくずリスト</CardDescription>
          </CardHeader>
          <CardContent>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink onPress={() => {}}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
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
            </Breadcrumb>
          </CardContent>
        </Card>

        {/* Pagination セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Pagination</CardTitle>
            <CardDescription>ページネーション</CardDescription>
          </CardHeader>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {[1, 2, 3].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onPress={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onPress={() => setCurrentPage((p) => p + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <Typography variant="muted" style={{ textAlign: 'center', marginTop: 8 }}>
              現在のページ: {currentPage}
            </Typography>
          </CardContent>
        </Card>

        {/* Calendar セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>カレンダー</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
            <Typography variant="muted" style={{ marginTop: 8 }}>
              選択日: {selectedDate ? selectedDate.toLocaleDateString('ja-JP') : '未選択'}
            </Typography>
          </CardContent>
        </Card>

        {/* DatePicker セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>DatePicker</CardTitle>
            <CardDescription>日付選択</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.formGroup}>
              <Label>日付</Label>
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                placeholder="日付を選択..."
              />
            </View>
          </CardContent>
        </Card>

        {/* Carousel セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Carousel</CardTitle>
            <CardDescription>カルーセル</CardDescription>
          </CardHeader>
          <CardContent>
            <Carousel style={{ height: 200 }}>
              <CarouselContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <CarouselItem key={num}>
                    <View style={styles.carouselSlide}>
                      <Typography variant="h2">{num}</Typography>
                    </View>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
              <CarouselDots />
            </Carousel>
          </CardContent>
        </Card>

        {/* Combobox セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Combobox</CardTitle>
            <CardDescription>検索可能なドロップダウン</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.formGroup}>
              <Label>フレームワーク</Label>
              <Combobox
                value={comboboxValue}
                onValueChange={setComboboxValue}
                options={[
                  { value: 'next', label: 'Next.js' },
                  { value: 'sveltekit', label: 'SvelteKit' },
                  { value: 'nuxt', label: 'Nuxt.js' },
                  { value: 'remix', label: 'Remix' },
                  { value: 'astro', label: 'Astro' },
                ]}
                placeholder="フレームワークを選択..."
                searchPlaceholder="検索..."
                emptyMessage="見つかりません"
              />
            </View>
            <Typography variant="muted">
              選択値: {comboboxValue || '未選択'}
            </Typography>
          </CardContent>
        </Card>

        {/* NavigationMenu セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>NavigationMenu</CardTitle>
            <CardDescription>ナビゲーションメニュー</CardDescription>
          </CardHeader>
          <CardContent>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger value="getting-started">
                    はじめに
                  </NavigationMenuTrigger>
                  <NavigationMenuContent value="getting-started">
                    <NavigationMenuLink onPress={() => {}}>
                      インストール
                    </NavigationMenuLink>
                    <NavigationMenuLink onPress={() => {}}>
                      クイックスタート
                    </NavigationMenuLink>
                    <NavigationMenuLink onPress={() => {}}>
                      チュートリアル
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger value="components">
                    コンポーネント
                  </NavigationMenuTrigger>
                  <NavigationMenuContent value="components">
                    <NavigationMenuLink onPress={() => {}} active>
                      Button
                    </NavigationMenuLink>
                    <NavigationMenuLink onPress={() => {}}>
                      Card
                    </NavigationMenuLink>
                    <NavigationMenuLink onPress={() => {}}>
                      Dialog
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink onPress={() => {}}>
                    ドキュメント
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </CardContent>
        </Card>

        {/* Chart セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Chart</CardTitle>
            <CardDescription>データ可視化チャート</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant="small" style={styles.label}>BarChart</Typography>
            <ChartContainer>
              <BarChart
                data={chartData}
                width={280}
                height={180}
              />
              <ChartLegend data={chartData} />
            </ChartContainer>

            <Typography variant="small" style={styles.label}>LineChart</Typography>
            <ChartContainer>
              <LineChart
                data={chartData}
                width={280}
                height={180}
                fill
              />
            </ChartContainer>

            <Typography variant="small" style={styles.label}>PieChart</Typography>
            <ChartContainer style={{ alignItems: 'center' }}>
              <PieChart
                data={pieChartData}
                size={180}
                innerRadius={40}
                showValues
              />
              <ChartLegend data={pieChartData} />
            </ChartContainer>
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
  collapsibleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  collapsibleItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 6,
    marginTop: 8,
  },
  carouselSlide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 8,
  },
});
