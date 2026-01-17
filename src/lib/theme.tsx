import React, { createContext, useContext, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

// カラースキームの型
export type ColorScheme = 'light' | 'dark';
export type ThemeMode = 'light' | 'dark' | 'system';

// カラーパレットの型
export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

// デフォルトカラーパレット（Shadcn UI zinc ベース）
export const lightColors: ThemeColors = {
  background: '#FFFFFF',
  foreground: '#09090B', // zinc-950
  card: '#FFFFFF',
  cardForeground: '#09090B',
  primary: '#18181B', // zinc-900
  primaryForeground: '#FAFAFA', // zinc-50
  secondary: '#F4F4F5', // zinc-100
  secondaryForeground: '#18181B',
  muted: '#F4F4F5',
  mutedForeground: '#71717A', // zinc-500
  destructive: '#DC2626', // red-600
  destructiveForeground: '#FAFAFA',
  border: '#E4E4E7', // zinc-200
  input: '#E4E4E7',
  ring: '#18181B',
};

export const darkColors: ThemeColors = {
  background: '#09090B', // zinc-950
  foreground: '#FAFAFA', // zinc-50
  card: '#09090B',
  cardForeground: '#FAFAFA',
  primary: '#FAFAFA',
  primaryForeground: '#18181B',
  secondary: '#27272A', // zinc-800
  secondaryForeground: '#FAFAFA',
  muted: '#27272A',
  mutedForeground: '#A1A1AA', // zinc-400
  destructive: '#DC2626',
  destructiveForeground: '#FAFAFA',
  border: '#27272A',
  input: '#27272A',
  ring: '#D4D4D8', // zinc-300
};

// テーマコンテキストの型
interface ThemeContextType {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider の Props
export interface ThemeProviderProps {
  children: React.ReactNode;
  /** 初期テーマモード */
  defaultMode?: ThemeMode;
  /** カスタムライトテーマカラー */
  lightTheme?: Partial<ThemeColors>;
  /** カスタムダークテーマカラー */
  darkTheme?: Partial<ThemeColors>;
}

export function ThemeProvider({
  children,
  defaultMode = 'system',
  lightTheme,
  darkTheme,
}: ThemeProviderProps) {
  const systemColorScheme = useSystemColorScheme();
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  // 実際のカラースキームを計算
  const colorScheme: ColorScheme =
    mode === 'system' ? (systemColorScheme ?? 'light') : mode;

  // カラーをマージ
  const colors: ThemeColors =
    colorScheme === 'dark'
      ? { ...darkColors, ...darkTheme }
      : { ...lightColors, ...lightTheme };

  const value: ThemeContextType = {
    mode,
    colorScheme,
    colors,
    setMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// useTheme Hook
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    // Provider外で使用された場合のフォールバック
    return {
      mode: 'light',
      colorScheme: 'light',
      colors: lightColors,
      setMode: () => {
        console.warn('useTheme must be used within a ThemeProvider');
      },
    };
  }

  return context;
}

// カラースキームのみ取得する軽量 Hook
export function useColorScheme(): ColorScheme {
  const { colorScheme } = useTheme();
  return colorScheme;
}

// カラーのみ取得する軽量 Hook
export function useColors(): ThemeColors {
  const { colors } = useTheme();
  return colors;
}
