import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {
  Typography,
  useColors,
  ScrollArea,
} from '@im-kento-tsuda/expo-components';
import * as Clipboard from 'expo-clipboard';

interface CodeBlockProps {
  code: string;
  title?: string;
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  const colors = useColors();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.muted, borderColor: colors.border }]}>
      {title && (
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Typography variant="small" style={{ color: colors.mutedForeground }}>
            {title}
          </Typography>
          <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
            <Typography variant="small" style={{ color: colors.primary }}>
              {copied ? 'コピーしました' : 'コピー'}
            </Typography>
          </TouchableOpacity>
        </View>
      )}
      <ScrollArea style={styles.scrollArea} horizontal>
        <Text style={[styles.code, { color: colors.foreground }]}>
          {code}
        </Text>
      </ScrollArea>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  copyButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  scrollArea: {
    maxHeight: 300,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 20,
    padding: 12,
  },
});
