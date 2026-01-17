import React, { forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import Svg, {
  Rect,
  Line,
  Circle,
  Path,
  G,
  Text as SvgText,
} from 'react-native-svg';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

// Types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

// ChartContainer
export interface ChartContainerProps extends Omit<ViewProps, 'style'> {
  /** チャート設定 */
  config?: ChartConfig;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const ChartContainer = forwardRef<View, ChartContainerProps>(
  ({ config: _config, children, style, ...props }, ref) => {
    const colors = useColors();

    return (
      <View
        ref={ref}
        style={cn<ViewStyle>(
          styles.container,
          { backgroundColor: colors.card, borderColor: colors.border },
          style
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

ChartContainer.displayName = 'ChartContainer';

// ChartTooltip (簡易版)
export interface ChartTooltipProps {
  /** 表示中かどうか */
  visible: boolean;
  /** ラベル */
  label: string;
  /** 値 */
  value: number | string;
  /** X座標 */
  x?: number;
  /** Y座標 */
  y?: number;
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({
  visible,
  label,
  value,
  x = 0,
  y = 0,
}) => {
  const colors = useColors();

  if (!visible) return null;

  return (
    <View
      style={[
        styles.tooltip,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          left: x,
          top: y,
        },
      ]}
    >
      <Text style={[styles.tooltipLabel, { color: colors.mutedForeground }]}>
        {label}
      </Text>
      <Text style={[styles.tooltipValue, { color: colors.foreground }]}>
        {value}
      </Text>
    </View>
  );
};

ChartTooltip.displayName = 'ChartTooltip';

// ChartLegend
export interface ChartLegendProps {
  /** データ */
  data: ChartDataPoint[];
  /** カスタムスタイル */
  style?: ViewStyle;
}

const ChartLegend: React.FC<ChartLegendProps> = ({ data, style }) => {
  const colors = useColors();

  return (
    <View style={[styles.legend, style]}>
      {data.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              { backgroundColor: item.color || colors.primary },
            ]}
          />
          <Text style={[styles.legendText, { color: colors.foreground }]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

ChartLegend.displayName = 'ChartLegend';

// BarChart
export interface BarChartProps {
  /** データ */
  data: ChartDataPoint[];
  /** 幅 */
  width?: number;
  /** 高さ */
  height?: number;
  /** バーの間隔 */
  barGap?: number;
  /** 横向き */
  horizontal?: boolean;
  /** X軸ラベルを表示 */
  showXLabels?: boolean;
  /** Y軸ラベルを表示 */
  showYLabels?: boolean;
  /** グリッド線を表示 */
  showGrid?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 300,
  height = 200,
  barGap = 8,
  horizontal: _horizontal = false,
  showXLabels = true,
  showYLabels = true,
  showGrid = true,
  style,
}) => {
  const colors = useColors();
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = (chartWidth - barGap * (data.length - 1)) / data.length;

  // Y軸のグリッド線用の値
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => maxValue * ratio);

  return (
    <View style={style}>
      <Svg width={width} height={height}>
        <G x={padding.left} y={padding.top}>
          {/* グリッド線 */}
          {showGrid &&
            gridLines.map((value, i) => {
              const y = chartHeight - (value / maxValue) * chartHeight;
              return (
                <Line
                  key={i}
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke={colors.border}
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
              );
            })}

          {/* Y軸ラベル */}
          {showYLabels &&
            gridLines.map((value, i) => {
              const y = chartHeight - (value / maxValue) * chartHeight;
              return (
                <SvgText
                  key={i}
                  x={-8}
                  y={y + 4}
                  fontSize={10}
                  fill={colors.mutedForeground}
                  textAnchor="end"
                >
                  {Math.round(value)}
                </SvgText>
              );
            })}

          {/* バー */}
          {data.map((item, index) => {
            const x = index * (barWidth + barGap);
            const barHeight = (item.value / maxValue) * chartHeight;
            const y = chartHeight - barHeight;

            return (
              <Rect
                key={index}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color || colors.primary}
                rx={4}
              />
            );
          })}

          {/* X軸ラベル */}
          {showXLabels &&
            data.map((item, index) => {
              const x = index * (barWidth + barGap) + barWidth / 2;
              return (
                <SvgText
                  key={index}
                  x={x}
                  y={chartHeight + 20}
                  fontSize={10}
                  fill={colors.mutedForeground}
                  textAnchor="middle"
                >
                  {item.label}
                </SvgText>
              );
            })}
        </G>
      </Svg>
    </View>
  );
};

BarChart.displayName = 'BarChart';

// LineChart
export interface LineChartProps {
  /** データ */
  data: ChartDataPoint[];
  /** 幅 */
  width?: number;
  /** 高さ */
  height?: number;
  /** 線の色 */
  lineColor?: string;
  /** 線の太さ */
  lineWidth?: number;
  /** ドットを表示 */
  showDots?: boolean;
  /** 塗りつぶし */
  fill?: boolean;
  /** X軸ラベルを表示 */
  showXLabels?: boolean;
  /** Y軸ラベルを表示 */
  showYLabels?: boolean;
  /** グリッド線を表示 */
  showGrid?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 300,
  height = 200,
  lineColor,
  lineWidth = 2,
  showDots = true,
  fill = false,
  showXLabels = true,
  showYLabels = true,
  showGrid = true,
  style,
}) => {
  const colors = useColors();
  const strokeColor = lineColor || colors.primary;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  // ポイントの座標を計算
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((item.value - minValue) / range) * chartHeight;
    return { x, y, ...item };
  });

  // パスを生成
  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  // 塗りつぶしパス
  const fillPath = fill
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`
    : '';

  // グリッド線用の値
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(
    (ratio) => minValue + range * ratio
  );

  return (
    <View style={style}>
      <Svg width={width} height={height}>
        <G x={padding.left} y={padding.top}>
          {/* グリッド線 */}
          {showGrid &&
            gridLines.map((value, i) => {
              const y = chartHeight - ((value - minValue) / range) * chartHeight;
              return (
                <Line
                  key={i}
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke={colors.border}
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
              );
            })}

          {/* Y軸ラベル */}
          {showYLabels &&
            gridLines.map((value, i) => {
              const y = chartHeight - ((value - minValue) / range) * chartHeight;
              return (
                <SvgText
                  key={i}
                  x={-8}
                  y={y + 4}
                  fontSize={10}
                  fill={colors.mutedForeground}
                  textAnchor="end"
                >
                  {Math.round(value)}
                </SvgText>
              );
            })}

          {/* 塗りつぶし */}
          {fill && (
            <Path d={fillPath} fill={strokeColor} fillOpacity={0.1} />
          )}

          {/* 線 */}
          <Path
            d={linePath}
            stroke={strokeColor}
            strokeWidth={lineWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ドット */}
          {showDots &&
            points.map((point, index) => (
              <Circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={4}
                fill={colors.background}
                stroke={strokeColor}
                strokeWidth={2}
              />
            ))}

          {/* X軸ラベル */}
          {showXLabels &&
            points.map((point, index) => (
              <SvgText
                key={index}
                x={point.x}
                y={chartHeight + 20}
                fontSize={10}
                fill={colors.mutedForeground}
                textAnchor="middle"
              >
                {point.label}
              </SvgText>
            ))}
        </G>
      </Svg>
    </View>
  );
};

LineChart.displayName = 'LineChart';

// PieChart
export interface PieChartProps {
  /** データ */
  data: ChartDataPoint[];
  /** サイズ */
  size?: number;
  /** ドーナツの内側半径（0で通常の円グラフ） */
  innerRadius?: number;
  /** ラベルを表示 */
  showLabels?: boolean;
  /** 値を表示 */
  showValues?: boolean;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 200,
  innerRadius = 0,
  showLabels = false,
  showValues = false,
  style,
}) => {
  const colors = useColors();
  const defaultColors = [
    colors.primary,
    '#22c55e',
    '#eab308',
    '#ef4444',
    '#8b5cf6',
    '#06b6d4',
    '#f97316',
    '#ec4899',
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2 - 10;
  const center = size / 2;

  // 各セグメントのパスを計算
  let currentAngle = -90; // 12時の位置から開始
  const segments = data.map((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    let path: string;
    if (innerRadius > 0) {
      const innerX1 = center + innerRadius * Math.cos(startRad);
      const innerY1 = center + innerRadius * Math.sin(startRad);
      const innerX2 = center + innerRadius * Math.cos(endRad);
      const innerY2 = center + innerRadius * Math.sin(endRad);

      path = `
        M ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
        L ${innerX2} ${innerY2}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerX1} ${innerY1}
        Z
      `;
    } else {
      path = `
        M ${center} ${center}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
        Z
      `;
    }

    // ラベル位置（セグメントの中央）
    const midAngle = (startAngle + endAngle) / 2;
    const midRad = (midAngle * Math.PI) / 180;
    const labelRadius = innerRadius > 0 ? (radius + innerRadius) / 2 : radius * 0.65;
    const labelX = center + labelRadius * Math.cos(midRad);
    const labelY = center + labelRadius * Math.sin(midRad);

    return {
      path,
      color: item.color || defaultColors[index % defaultColors.length],
      label: item.label,
      value: item.value,
      percentage: ((item.value / total) * 100).toFixed(1),
      labelX,
      labelY,
    };
  });

  return (
    <View style={style}>
      <Svg width={size} height={size}>
        {segments.map((segment, index) => (
          <G key={index}>
            <Path d={segment.path} fill={segment.color} />
            {(showLabels || showValues) && (
              <SvgText
                x={segment.labelX}
                y={segment.labelY}
                fontSize={10}
                fill={colors.background}
                textAnchor="middle"
                fontWeight="600"
              >
                {showValues ? `${segment.percentage}%` : segment.label}
              </SvgText>
            )}
          </G>
        ))}
      </Svg>
    </View>
  );
};

PieChart.displayName = 'PieChart';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  tooltip: {
    position: 'absolute',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tooltipLabel: {
    fontSize: 12,
  },
  tooltipValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
  },
});

export {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  BarChart,
  LineChart,
  PieChart,
};
