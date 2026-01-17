import type { ViewStyle, TextStyle } from 'react-native';

type StyleType = ViewStyle | TextStyle;
type StyleValue = StyleType | false | undefined | null;

/**
 * スタイルを結合するユーティリティ関数
 * falsy な値は無視される
 */
export function cn<T extends StyleType>(...styles: StyleValue[]): T {
  const result: Record<string, unknown> = {};

  for (const style of styles) {
    if (!style) continue;

    if (typeof style === 'object') {
      Object.assign(result, style);
    }
  }

  return result as T;
}
