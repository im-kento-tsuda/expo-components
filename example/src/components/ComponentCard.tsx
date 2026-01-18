import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Typography,
  useColors,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../data/types';

interface ComponentCardProps {
  component: ComponentDoc;
  onPress: () => void;
}

export function ComponentCard({ component, onPress }: ComponentCardProps) {
  const colors = useColors();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <CardHeader style={styles.header}>
          <View style={styles.titleRow}>
            <CardTitle style={styles.cardTitle}>{component.name}</CardTitle>
            {component.subComponents && component.subComponents.length > 0 && (
              <Typography
                variant="small"
                style={{ ...styles.subComponentCount, color: colors.mutedForeground }}
              >
                +{component.subComponents.length}
              </Typography>
            )}
          </View>
          <CardDescription numberOfLines={2}>
            {component.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },
  header: {
    paddingVertical: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
  },
  subComponentCount: {
    fontSize: 12,
  },
});
