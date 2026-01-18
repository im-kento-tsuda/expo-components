import React, { forwardRef, useState } from 'react';
import { Image, StyleSheet, type ImageStyle, type ImageProps } from 'react-native';
import { cn } from '../../lib/utils';

export interface AvatarImageProps extends Omit<ImageProps, 'style' | 'className'> {
  /** 画像のソース */
  source: ImageProps['source'];
  /** カスタムスタイル */
  style?: ImageStyle;
  /** 読み込み失敗時のコールバック */
  onLoadError?: () => void;
  /** NativeWind className */
  className?: string;
}

const AvatarImage = forwardRef<Image, AvatarImageProps>(
  ({ source, style, onLoadError, onError, className, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);

    const handleError = (e: unknown) => {
      setHasError(true);
      onLoadError?.();
      // @ts-expect-error - onError type mismatch
      onError?.(e);
    };

    if (hasError) {
      return null;
    }

    return (
      <Image
        ref={ref}
        className={className}
        source={source}
        style={cn<ImageStyle>(styles.image, style)}
        onError={handleError}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = 'AvatarImage';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export { AvatarImage };
