import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
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
  type ThemeMode,
} from '@im-kento-tsuda/expo-components';

function ThemeSwitcher() {
  const { mode, setMode, colorScheme } = useTheme();
  const colors = useColors();

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
  const colors = useColors();

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.header, { color: colors.foreground }]}>
          コンポーネントカタログ
        </Text>

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Button セクション */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>Shadcn UI 風ボタンコンポーネント</CardDescription>
          </CardHeader>
          <CardContent>
            <Text style={[styles.label, { color: colors.mutedForeground }]}>Variants</Text>
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

            <Text style={[styles.label, { color: colors.mutedForeground }]}>Sizes</Text>
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

            <Text style={[styles.label, { color: colors.mutedForeground }]}>States</Text>
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
                <Text style={[styles.cardText, { color: colors.cardForeground }]}>
                  CardHeader, CardTitle, CardDescription, CardContent, CardFooter
                  を組み合わせて柔軟にレイアウトできます。
                </Text>
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
            <Text style={[styles.cardText, { color: colors.cardForeground }]}>
              CardFooter を使用してアクションボタンを配置できます。
            </Text>
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
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
  footerActions: {
    gap: 8,
  },
});
