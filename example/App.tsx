import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  ThemeProvider,
  ToastProvider,
  useColors,
} from '@im-kento-tsuda/expo-components';
import { RootNavigator } from './src/navigation/RootNavigator';

function AppContent() {
  const colors = useColors();

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.card,
          text: colors.foreground,
          border: colors.border,
          notification: colors.destructive,
        },
        fonts: {
          regular: { fontFamily: 'System', fontWeight: '400' },
          medium: { fontFamily: 'System', fontWeight: '500' },
          bold: { fontFamily: 'System', fontWeight: '600' },
          heavy: { fontFamily: 'System', fontWeight: '700' },
        },
      }}
    >
      <StatusBar style="auto" />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultMode="system">
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
