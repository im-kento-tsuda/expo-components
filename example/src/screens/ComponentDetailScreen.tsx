import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Typography,
  Badge,
  Separator,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useColors,
  ScrollArea,
} from '@im-kento-tsuda/expo-components';
import { getComponentById } from '../data/components';
import { getCategoryById } from '../data/categories';
import { PropsTable } from '../components/PropsTable';
import { CodeBlock } from '../components/CodeBlock';
import { LivePreview } from '../components/LivePreview';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ComponentDetail'>;

export function ComponentDetailScreen({ route }: Props) {
  const { componentId } = route.params;
  const colors = useColors();

  const component = getComponentById(componentId);

  if (!component) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <Typography variant="h2">コンポーネントが見つかりません</Typography>
        </View>
      </SafeAreaView>
    );
  }

  const category = getCategoryById(component.category);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollArea style={styles.scrollArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Typography variant="h1">{component.name}</Typography>
              {category && (
                <Badge variant="secondary">{category.name}</Badge>
              )}
            </View>
            <Typography variant="lead">{component.description}</Typography>
          </View>

          {/* Import */}
          <View style={styles.section}>
            <Typography variant="h4" style={styles.sectionTitle}>インポート</Typography>
            <CodeBlock code={component.importStatement} />
          </View>

          {/* Sub Components */}
          {component.subComponents && component.subComponents.length > 0 && (
            <View style={styles.section}>
              <Typography variant="h4" style={styles.sectionTitle}>サブコンポーネント</Typography>
              <View style={styles.subComponents}>
                {component.subComponents.map((sub) => (
                  <Badge key={sub} variant="outline">{sub}</Badge>
                ))}
              </View>
            </View>
          )}

          <Separator style={styles.separator} />

          {/* Examples */}
          <View style={styles.section}>
            <Typography variant="h4" style={styles.sectionTitle}>使用例</Typography>
            {component.examples.map((example, index) => (
              <View key={index} style={styles.exampleContainer}>
                <LivePreview example={example} />
                <Accordion type="single" collapsible>
                  <AccordionItem value="code">
                    <AccordionTrigger>コードを表示</AccordionTrigger>
                    <AccordionContent>
                      <CodeBlock code={example.code} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </View>
            ))}
          </View>

          <Separator style={styles.separator} />

          {/* Props */}
          <View style={styles.section}>
            <Typography variant="h4" style={styles.sectionTitle}>Props</Typography>
            <PropsTable props={component.props} />
          </View>

          {/* Notes */}
          {component.notes && component.notes.length > 0 && (
            <View style={styles.section}>
              <Typography variant="h4" style={styles.sectionTitle}>注意事項</Typography>
              {component.notes.map((note, index) => (
                <View key={index} style={styles.noteItem}>
                  <Typography variant="p">• {note}</Typography>
                </View>
              ))}
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
    marginBottom: 24,
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  separator: {
    marginVertical: 16,
  },
  subComponents: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exampleContainer: {
    marginBottom: 16,
  },
  noteItem: {
    marginBottom: 8,
  },
});
