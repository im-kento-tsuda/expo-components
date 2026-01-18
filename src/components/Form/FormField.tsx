import React, { forwardRef } from 'react';
import { View, type ViewStyle, type ViewProps } from 'react-native';
import { Field } from '../Field';
import { useForm } from './Form';

export interface FormFieldProps extends Omit<ViewProps, 'style' | 'className'> {
  /** フィールド名（エラーのキー） */
  name: string;
  /** 無効状態 */
  disabled?: boolean;
  /** 必須項目 */
  required?: boolean;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const FormField = forwardRef<View, FormFieldProps>(
  ({ name, disabled = false, required = false, children, style, className, ...props }, ref) => {
    const { errors, isSubmitting } = useForm();
    const error = errors[name];

    return (
      <Field
        ref={ref}
        id={name}
        error={error}
        disabled={disabled || isSubmitting}
        required={required}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </Field>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField };
