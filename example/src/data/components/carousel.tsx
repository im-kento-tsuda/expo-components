import React from 'react';
import { View } from 'react-native';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  Typography,
  useColors,
} from '@im-kento-tsuda/expo-components';
import type { ComponentDoc } from '../types';

function CarouselExample() {
  const colors = useColors();
  return (
    <Carousel style={{ height: 200 }}>
      <CarouselContent>
        {[1, 2, 3, 4, 5].map((num) => (
          <CarouselItem key={num}>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.muted,
              borderRadius: 8,
              margin: 8,
            }}>
              <Typography variant="h2">{num}</Typography>
            </View>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  );
}

export const carouselDoc: ComponentDoc = {
  id: 'carousel',
  name: 'Carousel',
  description: 'カルーセル/スライダーコンポーネント',
  category: 'data-display',
  importStatement: `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '@im-kento-tsuda/expo-components';`,
  subComponents: ['CarouselContent', 'CarouselItem', 'CarouselPrevious', 'CarouselNext', 'CarouselDots'],
  props: [
    {
      name: 'autoPlay',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '自動再生',
    },
    {
      name: 'autoPlayInterval',
      type: 'number',
      required: false,
      defaultValue: '3000',
      description: '自動再生の間隔（ミリ秒）',
    },
    {
      name: 'loop',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: '無限ループ',
    },
  ],
  examples: [
    {
      title: '基本的なカルーセル',
      code: `<Carousel style={{ height: 200 }}>
  <CarouselContent>
    {[1, 2, 3, 4, 5].map((num) => (
      <CarouselItem key={num}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h2">{num}</Typography>
        </View>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselDots />
</Carousel>`,
      render: () => <CarouselExample />,
    },
  ],
  notes: [
    'Compound Components パターンを使用しています',
    'スワイプでスライドを切り替えられます',
  ],
};
