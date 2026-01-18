import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Typography,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
  useColors,
  useTheme,
  Button,
  ScrollArea,
  type ThemeMode,
} from '@im-kento-tsuda/expo-components';
import { categories } from '../data/categories';
import { componentDocs, getComponentsByCategory } from '../data/components';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const colors = useColors();
  const { mode, setMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const modes: ThemeMode[] = ['light', 'dark', 'system'];

  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    return componentDocs.filter(
      (comp) =>
        comp.name.toLowerCase().includes(query) ||
        comp.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('Category', { categoryId: categoryId as any });
  };

  const handleComponentPress = (componentId: string) => {
    navigation.navigate('ComponentDetail', { componentId });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollArea style={styles.scrollArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Typography variant="h1">Components</Typography>
            <Typography variant="muted">
              React Native コンポーネントライブラリ
            </Typography>
          </View>

          {/* Theme Switcher */}
          <View style={styles.themeSwitcher}>
            {modes.map((m) => (
              <Button
                key={m}
                variant={mode === m ? 'default' : 'outline'}
                size="sm"
                onPress={() => setMode(m)}
              >
                {m === 'light' ? '☀️' : m === 'dark' ? '🌙' : '⚙️'}
              </Button>
            ))}
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Input
              placeholder="コンポーネントを検索..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Search Results */}
          {filteredComponents ? (
            <View style={styles.searchResults}>
              <Typography variant="small" style={styles.sectionTitle}>
                検索結果 ({filteredComponents.length})
              </Typography>
              {filteredComponents.length === 0 ? (
                <Typography variant="muted">
                  「{searchQuery}」に一致するコンポーネントが見つかりません
                </Typography>
              ) : (
                filteredComponents.map((comp) => (
                  <TouchableOpacity
                    key={comp.id}
                    onPress={() => handleComponentPress(comp.id)}
                    activeOpacity={0.7}
                  >
                    <Card style={styles.searchResultCard}>
                      <CardHeader style={styles.searchResultHeader}>
                        <CardTitle style={styles.searchResultTitle}>
                          {comp.name}
                        </CardTitle>
                        <CardDescription numberOfLines={1}>
                          {comp.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </TouchableOpacity>
                ))
              )}
            </View>
          ) : (
            /* Categories */
            <View style={styles.categories}>
              {categories.map((category) => {
                const componentCount = getComponentsByCategory(category.id).length;
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => handleCategoryPress(category.id)}
                    activeOpacity={0.7}
                  >
                    <Card style={styles.categoryCard}>
                      <CardHeader>
                        <View style={styles.categoryHeader}>
                          <Typography variant="h3">{category.icon}</Typography>
                          <View style={styles.categoryInfo}>
                            <CardTitle>{category.name}</CardTitle>
                            <CardDescription>
                              {category.description} ({componentCount})
                            </CardDescription>
                          </View>
                        </View>
                      </CardHeader>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollArea>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollArea: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 16,
  },
  themeSwitcher: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  categories: {
    gap: 12,
  },
  categoryCard: {
    marginBottom: 0,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  searchResults: {
    gap: 8,
  },
  searchResultCard: {
    marginBottom: 8,
  },
  searchResultHeader: {
    paddingVertical: 12,
  },
  searchResultTitle: {
    fontSize: 16,
  },
});
