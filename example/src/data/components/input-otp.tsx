import React, { useState } from 'react';
import { View } from 'react-native';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, Typography } from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function InputOTPExample() {
  const [value, setValue] = useState('');
  return (
    <View style={{ gap: 8 }}>
      <InputOTP value={value} onValueChange={setValue} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Typography variant="muted">入力値: {value || '-'}</Typography>
    </View>
  );
}

export const inputOTPDoc: ComponentDoc = {
  id: 'input-otp',
  name: 'InputOTP',
  description: 'ワンタイムパスワード入力コンポーネント',
  category: 'form-inputs',
  importStatement: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['InputOTPGroup', 'InputOTPSlot', 'InputOTPSeparator'],
  props: [
    {
      name: 'value',
      type: 'string',
      required: true,
      description: '入力値',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      required: true,
      description: '値変更時のコールバック',
    },
    {
      name: 'maxLength',
      type: 'number',
      required: false,
      defaultValue: '6',
      description: '最大入力文字数',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '無効状態',
    },
  ],
  examples: [
    {
      title: '6桁OTP入力',
      code: `const [value, setValue] = useState('');

<InputOTP value={value} onValueChange={setValue} maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
      render: () => <InputOTPExample />,
    },
  ],
  notes: [
    'Compound Components パターンを使用しています',
    'InputOTPSlot の index は 0 から始まります',
  ],
};
