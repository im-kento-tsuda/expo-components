import React, { forwardRef, createContext, useContext, useId } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';

interface FieldContextType {
  id: string;
  error: string | undefined;
  disabled: boolean;
  required: boolean;
}

const FieldContext = createContext<FieldContextType>({
  id: '',
  error: undefined,
  disabled: false,
  required: false,
});

export const useField = () => useContext(FieldContext);

export interface FieldProps extends Omit<ViewProps, 'style'> {
  /** フィールドの一意なID */
  id?: string;
  /** エラーメッセージ */
  error?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 必須項目 */
  required?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const Field = forwardRef<View, FieldProps>(
  ({ id: customId, error, disabled = false, required = false, children, style, ...props }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;

    return (
      <FieldContext.Provider value={{ id, error, disabled, required }}>
        <View ref={ref} style={[styles.field, style]} {...props}>
          {children}
        </View>
      </FieldContext.Provider>
    );
  }
);

Field.displayName = 'Field';

const styles = StyleSheet.create({
  field: {
    gap: 6,
  },
});

export { Field };
