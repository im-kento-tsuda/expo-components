import React from 'react';
import { View } from 'react-native';
import {
  ChartContainer,
  ChartLegend,
  BarChart,
  LineChart,
  PieChart,
  useColors,
  type ChartDataPoint,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function BarChartExample() {
  const colors = useColors();
  const data: ChartDataPoint[] = [
    { label: '1月', value: 186, color: colors.primary },
    { label: '2月', value: 305, color: colors.primary },
    { label: '3月', value: 237, color: colors.primary },
    { label: '4月', value: 273, color: colors.primary },
  ];
  return (
    <ChartContainer>
      <BarChart data={data} width={280} height={150} />
      <ChartLegend data={data} />
    </ChartContainer>
  );
}

function LineChartExample() {
  const colors = useColors();
  const data: ChartDataPoint[] = [
    { label: '1月', value: 186, color: colors.primary },
    { label: '2月', value: 305, color: colors.primary },
    { label: '3月', value: 237, color: colors.primary },
    { label: '4月', value: 273, color: colors.primary },
  ];
  return (
    <ChartContainer>
      <LineChart data={data} width={280} height={150} fill />
    </ChartContainer>
  );
}

function PieChartExample() {
  const data: ChartDataPoint[] = [
    { label: 'Chrome', value: 275, color: '#4285f4' },
    { label: 'Safari', value: 200, color: '#34a853' },
    { label: 'Firefox', value: 187, color: '#ff7139' },
    { label: 'Edge', value: 173, color: '#0078d4' },
  ];
  return (
    <ChartContainer style={{ alignItems: 'center' }}>
      <PieChart data={data} size={150} innerRadius={30} showValues />
      <ChartLegend data={data} />
    </ChartContainer>
  );
}

export const chartDoc: ComponentDoc = {
  id: 'chart',
  name: 'Chart',
  description: 'データ可視化チャートコンポーネント',
  category: 'data-display',
  importStatement: `import {
  ChartContainer,
  ChartLegend,
  BarChart,
  LineChart,
  PieChart,
  type ChartDataPoint,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['ChartContainer', 'ChartLegend', 'BarChart', 'LineChart', 'PieChart'],
  props: [
    {
      name: 'data',
      type: 'ChartDataPoint[]',
      required: true,
      description: 'チャートデータ',
    },
    {
      name: 'width',
      type: 'number',
      required: false,
      description: 'チャートの幅（BarChart, LineChart）',
    },
    {
      name: 'height',
      type: 'number',
      required: false,
      description: 'チャートの高さ（BarChart, LineChart）',
    },
    {
      name: 'size',
      type: 'number',
      required: false,
      description: 'チャートのサイズ（PieChart）',
    },
  ],
  examples: [
    {
      title: 'BarChart',
      code: `const data: ChartDataPoint[] = [
  { label: '1月', value: 186, color: colors.primary },
  { label: '2月', value: 305, color: colors.primary },
];

<ChartContainer>
  <BarChart data={data} width={280} height={150} />
  <ChartLegend data={data} />
</ChartContainer>`,
      render: () => <BarChartExample />,
    },
    {
      title: 'LineChart',
      code: `<ChartContainer>
  <LineChart data={data} width={280} height={150} fill />
</ChartContainer>`,
      render: () => <LineChartExample />,
    },
    {
      title: 'PieChart',
      code: `<ChartContainer>
  <PieChart data={data} size={150} innerRadius={30} showValues />
  <ChartLegend data={data} />
</ChartContainer>`,
      render: () => <PieChartExample />,
    },
  ],
  notes: [
    'ChartDataPoint は { label, value, color } の形式です',
    'react-native-svg を使用しています',
  ],
};
