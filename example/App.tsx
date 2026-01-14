import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Card } from '@im-kento-tsuda/expo-components';

export default function App() {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>コンポーネントカタログ</Text>

        {/* Button セクション */}
        <Card title="Button" style={styles.section}>
          <Text style={styles.label}>Variants</Text>
          <View style={styles.row}>
            <Button title="Primary" variant="primary" onPress={() => {}} />
            <Button title="Secondary" variant="secondary" onPress={() => {}} />
          </View>
          <View style={styles.row}>
            <Button title="Outline" variant="outline" onPress={() => {}} />
            <Button title="Ghost" variant="ghost" onPress={() => {}} />
          </View>

          <Text style={styles.label}>Sizes</Text>
          <View style={styles.row}>
            <Button title="Small" size="sm" onPress={() => {}} />
            <Button title="Medium" size="md" onPress={() => {}} />
            <Button title="Large" size="lg" onPress={() => {}} />
          </View>

          <Text style={styles.label}>States</Text>
          <View style={styles.row}>
            <Button title="Disabled" disabled onPress={() => {}} />
            <Button title="Loading" loading={loading} onPress={handlePress} />
          </View>
        </Card>

        {/* Card セクション */}
        <Card title="Card" style={styles.section}>
          <Card title="Nested Card" padding="sm">
            <Text>カードの中にカードを配置</Text>
          </Card>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1C1C1E',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
