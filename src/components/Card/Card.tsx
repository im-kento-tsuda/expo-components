import React from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';

export interface CardProps {
  /** カードのタイトル */
  title?: string;
  /** カードの内容 */
  children: React.ReactNode;
  /** パディングサイズ */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** シャドウを表示 */
  shadow?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  padding = 'md',
  shadow = true,
  style,
}) => {
  return (
    <View style={[styles.card, shadow && styles.shadow, paddingStyles[padding], style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
});

const paddingStyles = StyleSheet.create({
  none: { padding: 0 },
  sm: { padding: 12 },
  md: { padding: 16 },
  lg: { padding: 24 },
});
