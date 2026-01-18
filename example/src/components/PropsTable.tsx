import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Typography,
  Badge,
  useColors,
} from '@im-kento-tsuda/expo-components';
import type { PropDefinition } from '../data/types';

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable({ props }: PropsTableProps) {
  const colors = useColors();

  if (props.length === 0) {
    return (
      <Typography variant="muted">Props情報はありません</Typography>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.row, styles.headerRow, { borderBottomColor: colors.border }]}>
          <View style={[styles.cell, styles.nameCell]}>
            <Typography variant="small" style={{ fontWeight: '600' }}>名前</Typography>
          </View>
          <View style={[styles.cell, styles.typeCell]}>
            <Typography variant="small" style={{ fontWeight: '600' }}>型</Typography>
          </View>
          <View style={[styles.cell, styles.defaultCell]}>
            <Typography variant="small" style={{ fontWeight: '600' }}>デフォルト</Typography>
          </View>
          <View style={[styles.cell, styles.descCell]}>
            <Typography variant="small" style={{ fontWeight: '600' }}>説明</Typography>
          </View>
        </View>
        {/* Body */}
        {props.map((prop, index) => (
          <View
            key={prop.name}
            style={[
              styles.row,
              { borderBottomColor: colors.border },
              index === props.length - 1 && styles.lastRow,
            ]}
          >
            <View style={[styles.cell, styles.nameCell]}>
              <View style={styles.nameContainer}>
                <Typography
                  variant="small"
                  style={{ ...styles.propName, color: colors.foreground }}
                >
                  {prop.name}
                </Typography>
                {prop.required && (
                  <Badge variant="destructive" style={styles.requiredBadge}>
                    必須
                  </Badge>
                )}
              </View>
            </View>
            <View style={[styles.cell, styles.typeCell]}>
              <Typography
                variant="small"
                style={{ ...styles.propType, color: colors.primary, backgroundColor: colors.muted }}
              >
                {prop.type}
              </Typography>
            </View>
            <View style={[styles.cell, styles.defaultCell]}>
              <Typography variant="small" style={{ color: colors.mutedForeground }}>
                {prop.defaultValue ?? '-'}
              </Typography>
            </View>
            <View style={[styles.cell, styles.descCell]}>
              <Typography variant="small" style={{ color: colors.mutedForeground }}>
                {prop.description}
              </Typography>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 600,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  headerRow: {
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  nameCell: {
    width: 120,
  },
  typeCell: {
    width: 150,
  },
  defaultCell: {
    width: 100,
  },
  descCell: {
    width: 200,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  requiredBadge: {
    transform: [{ scale: 0.8 }],
  },
  propName: {
    fontFamily: 'monospace',
    fontWeight: '500',
  },
  propType: {
    fontFamily: 'monospace',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
