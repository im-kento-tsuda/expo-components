import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Typography,
  useColors,
  ScrollArea,
} from '@im-kento-tsuda/expo-components';
import { getCategoryById } from '../data/categories';
import { getComponentsByCategory } from '../data/components';
import { ComponentCard } from '../components/ComponentCard';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Category'>;

export function CategoryScreen({ route, navigation }: Props) {
  const { categoryId } = route.params;
  const colors = useColors();

  const category = getCategoryById(categoryId);
  const components = getComponentsByCategory(categoryId);

  if (!category) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Typography variant="h2">カテゴリが見つかりません</Typography>
      </SafeAreaView>
    );
  }

  const handleComponentPress = (componentId: string) => {
    navigation.navigate('ComponentDetail', { componentId });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollArea style={styles.scrollArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Typography variant="h2">{category.icon} {category.name}</Typography>
            <Typography variant="muted">{category.description}</Typography>
            <Typography variant="small" style={styles.count}>
              {components.length} コンポーネント
            </Typography>
          </View>

          {/* Component List */}
          <View style={styles.componentList}>
            {components.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                onPress={() => handleComponentPress(component.id)}
              />
            ))}
          </View>
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
    marginBottom: 24,
    gap: 4,
  },
  count: {
    marginTop: 8,
  },
  componentList: {
    gap: 8,
  },
});
