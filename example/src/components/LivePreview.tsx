import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  useColors,
} from '@im-kento-tsuda/expo-components';
import type { ComponentExample } from '../data/types';

interface LivePreviewProps {
  example: ComponentExample;
}

export function LivePreview({ example }: LivePreviewProps) {
  const colors = useColors();

  return (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle style={styles.title}>{example.title}</CardTitle>
        {example.description && (
          <CardDescription>{example.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <View style={[styles.preview, { backgroundColor: colors.background, borderColor: colors.border }]}>
          {example.render()}
        </View>
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
  },
  preview: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 60,
  },
});
