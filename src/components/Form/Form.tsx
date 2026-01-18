import React, { forwardRef, createContext, useContext, useCallback } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';

type FormErrors = Record<string, string | undefined>;

interface FormContextType {
  errors: FormErrors;
  setError: (name: string, error: string | undefined) => void;
  clearErrors: () => void;
  isSubmitting: boolean;
}

const FormContext = createContext<FormContextType>({
  errors: {},
  setError: () => {},
  clearErrors: () => {},
  isSubmitting: false,
});

export const useForm = () => useContext(FormContext);

export interface FormProps extends Omit<ViewProps, 'style' | 'className'> {
  /** フォームのエラー状態 */
  errors?: FormErrors;
  /** エラー設定時のコールバック */
  onErrorChange?: (errors: FormErrors) => void;
  /** 送信中状態 */
  isSubmitting?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const Form = forwardRef<View, FormProps>(
  ({ errors = {}, onErrorChange, isSubmitting = false, children, style, className, ...props }, ref) => {
    const setError = useCallback(
      (name: string, error: string | undefined) => {
        const newErrors = { ...errors };
        if (error === undefined) {
          delete newErrors[name];
        } else {
          newErrors[name] = error;
        }
        onErrorChange?.(newErrors);
      },
      [errors, onErrorChange]
    );

    const clearErrors = useCallback(() => {
      onErrorChange?.({});
    }, [onErrorChange]);

    return (
      <FormContext.Provider value={{ errors, setError, clearErrors, isSubmitting }}>
        <View ref={ref} className={className} style={[styles.form, style]} {...props}>
          {children}
        </View>
      </FormContext.Provider>
    );
  }
);

Form.displayName = 'Form';

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
});

export { Form };
