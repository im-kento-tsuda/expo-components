import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  Children,
} from "react";
import {
  View,
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native";
import { useColors } from "../../lib/theme";
import { cn } from "../../lib/utils";

export type CarouselOrientation = "horizontal" | "vertical";

interface CarouselContextType {
  currentIndex: number;
  totalItems: number;
  orientation: CarouselOrientation;
  scrollToIndex: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used within Carousel");
  }
  return context;
};

export interface CarouselProps extends Omit<ViewProps, "style" | "className"> {
  /** 方向 */
  orientation?: CarouselOrientation;
  /** 自動再生 */
  autoPlay?: boolean;
  /** 自動再生間隔（ミリ秒） */
  autoPlayInterval?: number;
  /** ループ再生 */
  loop?: boolean;
  /** 初期インデックス */
  defaultIndex?: number;
  /** インデックス変更時のコールバック */
  onIndexChange?: (index: number) => void;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const Carousel = forwardRef<View, CarouselProps>(
  (
    {
      orientation = "horizontal",
      autoPlay = false,
      autoPlayInterval = 3000,
      loop = false,
      defaultIndex = 0,
      onIndexChange,
      children,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(defaultIndex);
    const scrollViewRef = useRef<ScrollView>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    // CarouselContent の子要素数をカウント
    const contentChild = Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) &&
        (child.type as React.FC).displayName === "CarouselContent"
    );
    const totalItems =
      contentChild && React.isValidElement(contentChild)
        ? Children.count(contentChild.props.children)
        : 0;

    const canScrollPrev = loop || currentIndex > 0;
    const canScrollNext = loop || currentIndex < totalItems - 1;

    const scrollToIndex = useCallback(
      (index: number) => {
        let targetIndex = index;
        if (loop) {
          targetIndex = ((index % totalItems) + totalItems) % totalItems;
        } else {
          targetIndex = Math.max(0, Math.min(index, totalItems - 1));
        }

        const offset =
          orientation === "horizontal"
            ? { x: targetIndex * containerSize.width, y: 0 }
            : { x: 0, y: targetIndex * containerSize.height };

        scrollViewRef.current?.scrollTo({ ...offset, animated: true });
        setCurrentIndex(targetIndex);
        onIndexChange?.(targetIndex);
      },
      [containerSize, orientation, loop, totalItems, onIndexChange]
    );

    const scrollPrev = useCallback(() => {
      scrollToIndex(currentIndex - 1);
    }, [currentIndex, scrollToIndex]);

    const scrollNext = useCallback(() => {
      scrollToIndex(currentIndex + 1);
    }, [currentIndex, scrollToIndex]);

    // 自動再生
    React.useEffect(() => {
      if (!autoPlay || totalItems <= 1) return;

      const timer = setInterval(() => {
        scrollToIndex(currentIndex + 1);
      }, autoPlayInterval);

      return () => clearInterval(timer);
    }, [autoPlay, autoPlayInterval, currentIndex, scrollToIndex, totalItems]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;
      const offset =
        orientation === "horizontal" ? contentOffset.x : contentOffset.y;
      const size =
        orientation === "horizontal"
          ? containerSize.width
          : containerSize.height;

      if (size > 0) {
        const newIndex = Math.round(offset / size);
        if (
          newIndex !== currentIndex &&
          newIndex >= 0 &&
          newIndex < totalItems
        ) {
          setCurrentIndex(newIndex);
          onIndexChange?.(newIndex);
        }
      }
    };

    const contextValue: CarouselContextType = {
      currentIndex,
      totalItems,
      orientation,
      scrollToIndex,
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
    };

    return (
      <CarouselContext.Provider value={contextValue}>
        <View
          ref={ref}
          className={className}
          style={[styles.container, style]}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            setContainerSize({ width, height });
          }}
          {...props}
        >
          {Children.map(children, (child) => {
            if (
              React.isValidElement(child) &&
              (child.type as React.FC).displayName === "CarouselContent"
            ) {
              return React.cloneElement(
                child as React.ReactElement<{
                  scrollViewRef: React.RefObject<ScrollView>;
                  onScroll: typeof handleScroll;
                  containerSize: typeof containerSize;
                }>,
                {
                  scrollViewRef,
                  onScroll: handleScroll,
                  containerSize,
                }
              );
            }
            return child;
          })}
        </View>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = "Carousel";

// CarouselContent
export interface CarouselContentProps extends Omit<ViewProps, "style" | "className"> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
  /** @internal */
  scrollViewRef?: React.RefObject<ScrollView>;
  /** @internal */
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /** @internal */
  containerSize?: { width: number; height: number };
}

const CarouselContent = forwardRef<View, CarouselContentProps>(
  ({ children, style, className, scrollViewRef, onScroll, containerSize }, _ref) => {
    const { orientation } = useCarousel();
    const isHorizontal = orientation === "horizontal";

    return (
      <ScrollView
        ref={scrollViewRef}
        horizontal={isHorizontal}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        className={className}
        style={[styles.scrollView, style]}
      >
        <View
          style={[
            styles.content,
            isHorizontal ? styles.contentHorizontal : styles.contentVertical,
          ]}
        >
          {Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(
                child as React.ReactElement<{
                  containerSize?: typeof containerSize;
                }>,
                {
                  containerSize,
                }
              );
            }
            return child;
          })}
        </View>
      </ScrollView>
    );
  }
);

CarouselContent.displayName = "CarouselContent";

// CarouselItem
export interface CarouselItemProps extends Omit<ViewProps, "style" | "className"> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
  /** @internal */
  containerSize?: { width: number; height: number };
}

const CarouselItem = forwardRef<View, CarouselItemProps>(
  ({ children, style, className, containerSize, ...props }, ref) => {
    const { orientation } = useCarousel();
    const isHorizontal = orientation === "horizontal";

    const itemStyle: ViewStyle = {
      width: isHorizontal ? containerSize?.width : "100%",
      height: isHorizontal ? "100%" : containerSize?.height,
    };

    return (
      <View ref={ref} className={className} style={[styles.item, itemStyle, style]} {...props}>
        {children}
      </View>
    );
  }
);

CarouselItem.displayName = "CarouselItem";

// CarouselPrevious
export interface CarouselPreviousProps {
  /** カスタムスタイル */
  style?: ViewStyle;
  /** 子要素（カスタムボタン） */
  children?: React.ReactNode;
  /** NativeWind className */
  className?: string;
}

const CarouselPrevious: React.FC<CarouselPreviousProps> = ({
  style,
  children,
  className,
}) => {
  const colors = useColors();
  const { scrollPrev, canScrollPrev, orientation } = useCarousel();

  const buttonStyle = cn<ViewStyle>(
    styles.navButton,
    { backgroundColor: colors.background, borderColor: colors.border },
    !canScrollPrev && styles.navButtonDisabled,
    style
  );

  const wrapperStyle =
    orientation === "horizontal"
      ? styles.navButtonWrapperLeft
      : styles.navButtonWrapperTop;

  return (
    <View style={wrapperStyle}>
      <Pressable
        onPress={scrollPrev}
        disabled={!canScrollPrev}
        className={className}
        style={buttonStyle}
      >
        {children || (
          <Text
            style={[
              styles.navButtonText,
              {
                color: canScrollPrev
                  ? colors.foreground
                  : colors.mutedForeground,
              },
            ]}
          >
            {orientation === "horizontal" ? "‹" : "∧"}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

CarouselPrevious.displayName = "CarouselPrevious";

// CarouselNext
export interface CarouselNextProps {
  /** カスタムスタイル */
  style?: ViewStyle;
  /** 子要素（カスタムボタン） */
  children?: React.ReactNode;
  /** NativeWind className */
  className?: string;
}

const CarouselNext: React.FC<CarouselNextProps> = ({ style, children, className }) => {
  const colors = useColors();
  const { scrollNext, canScrollNext, orientation } = useCarousel();

  const buttonStyle = cn<ViewStyle>(
    styles.navButton,
    { backgroundColor: colors.background, borderColor: colors.border },
    !canScrollNext && styles.navButtonDisabled,
    style
  );

  const wrapperStyle =
    orientation === "horizontal"
      ? styles.navButtonWrapperRight
      : styles.navButtonWrapperBottom;

  return (
    <View style={wrapperStyle}>
      <Pressable
        onPress={scrollNext}
        disabled={!canScrollNext}
        className={className}
        style={buttonStyle}
      >
        {children || (
          <Text
            style={[
              styles.navButtonText,
              {
                color: canScrollNext
                  ? colors.foreground
                  : colors.mutedForeground,
              },
            ]}
          >
            {orientation === "horizontal" ? "›" : "∨"}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

CarouselNext.displayName = "CarouselNext";

// CarouselDots (インジケーター)
export interface CarouselDotsProps {
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({ style, className }) => {
  const colors = useColors();
  const { currentIndex, totalItems, scrollToIndex, orientation } =
    useCarousel();

  const dotsStyle =
    orientation === "horizontal"
      ? [styles.dotsBase, styles.dotsHorizontalOverlay, style]
      : [styles.dotsBase, style];

  return (
    <View className={className} style={dotsStyle}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <Pressable
          key={index}
          onPress={() => scrollToIndex(index)}
          style={[
            styles.dot,
            {
              backgroundColor:
                index === currentIndex ? colors.primary : colors.muted,
            },
          ]}
        />
      ))}
    </View>
  );
};

CarouselDots.displayName = "CarouselDots";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  content: {},
  contentHorizontal: {
    flexDirection: "row",
  },
  contentVertical: {
    flexDirection: "column",
  },
  item: {
    overflow: "hidden",
  },
  navButtonWrapperLeft: {
    position: "absolute",
    left: 8,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 10,
  },
  navButtonWrapperRight: {
    position: "absolute",
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 10,
  },
  navButtonWrapperTop: {
    position: "absolute",
    top: 8,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  navButtonWrapperBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  navButton: {
    width: 20,
    height: 20,
    minWidth: 20,
    minHeight: 20,
    maxWidth: 20,
    maxHeight: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    overflow: "hidden",
    display: "flex",
  },
  navButtonText: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
    position: "relative",
    top: -1,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  dotsBase: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  dotsHorizontalOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
  },
});

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
};
