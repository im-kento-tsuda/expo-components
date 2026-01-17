import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Modal,
  Platform,
  type ViewStyle,
  type ViewProps,
} from "react-native";
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
  type PanGestureHandlerGestureEvent,
  type PanGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import { useColors } from "../../lib/theme";

type SheetSide = "bottom" | "top" | "left" | "right";

interface SheetContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  side: SheetSide;
}

const SheetContext = createContext<SheetContextType>({
  open: false,
  setOpen: () => {},
  side: "bottom",
});

export const useSheet = () => useContext(SheetContext);

export interface SheetProps {
  /** 開閉状態 */
  open?: boolean;
  /** 開閉状態変更時のコールバック */
  onOpenChange?: (open: boolean) => void;
  /** 表示位置 */
  side?: SheetSide;
  /** 子要素 */
  children: React.ReactNode;
}

const Sheet: React.FC<SheetProps> = ({
  open: controlledOpen,
  onOpenChange,
  side = "bottom",
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <SheetContext.Provider value={{ open, setOpen, side }}>
      {children}
    </SheetContext.Provider>
  );
};

Sheet.displayName = "Sheet";

export interface SheetTriggerProps {
  /** 子要素 */
  children: React.ReactNode;
  /** トリガーとして使用する場合 */
  asChild?: boolean;
}

const SheetTrigger: React.FC<SheetTriggerProps> = ({ children, asChild }) => {
  const { setOpen } = useSheet();

  const handlePress = () => {
    setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ onPress?: () => void }>,
      {
        onPress: handlePress,
      }
    );
  }

  return <Pressable onPress={handlePress}>{children}</Pressable>;
};

SheetTrigger.displayName = "SheetTrigger";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface SheetContentProps extends Omit<ViewProps, "style"> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const SheetContent = forwardRef<View, SheetContentProps>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();
    const { open, setOpen, side } = useSheet();

    const [isVisible, setIsVisible] = useState(open);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // translate 値（サイドに応じて閉じた位置から 0 へ）
    const translateAnim = useRef(
      new Animated.Value(open ? 0 : getInitialTranslateValue(side))
    ).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);
    const dragStartValueRef = useRef(0);
    const currentValueRef = useRef(open ? 0 : getInitialTranslateValue(side));
    const sideRef = useRef<SheetSide>(side);
    const openRef = useRef(open);

    useEffect(() => {
      const id = translateAnim.addListener(({ value }) => {
        currentValueRef.current = value;
      });
      return () => {
        translateAnim.removeListener(id);
      };
    }, [translateAnim]);

    useEffect(() => {
      sideRef.current = side;
      openRef.current = open;
    }, [side, open]);

    // open が変更されたらアニメーション実行
    useEffect(() => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }

      const toValue = open ? 0 : getInitialTranslateValue(side);
      const duration = open ? 320 : 260;
      const easing = open ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic);

      if (open) {
        setIsVisible(true);
      }

      setIsAnimating(true);

      animationRef.current = Animated.timing(translateAnim, {
        toValue,
        duration,
        easing,
        useNativeDriver: true,
      });

      animationRef.current.start(({ finished }) => {
        animationRef.current = null;
        setIsAnimating(false);
        if (!open && finished) {
          setIsVisible(false);
        }
      });
    }, [open, side, translateAnim]);

    const contentStyle: ViewStyle = {
      backgroundColor: colors.background,
      borderColor: colors.border,
    };

    const getSideStyle = (): ViewStyle => {
      switch (side) {
        case "bottom":
          return {
            bottom: 0,
            left: 0,
            right: 0,
            borderTopWidth: 1,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          };
        case "top":
          return {
            top: 0,
            left: 0,
            right: 0,
            borderBottomWidth: 1,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          };
        case "left":
          return {
            top: 0,
            bottom: 0,
            left: 0,
            width: SCREEN_WIDTH * 0.8,
            maxWidth: 400,
            borderRightWidth: 1,
          };
        case "right":
          return {
            top: 0,
            bottom: 0,
            right: 0,
            width: SCREEN_WIDTH * 0.8,
            maxWidth: 400,
            borderLeftWidth: 1,
          };
      }
    };

    const getTransformStyle = () => {
      if (side === "left" || side === "right") {
        return { transform: [{ translateX: translateAnim }] };
      }
      return { transform: [{ translateY: translateAnim }] };
    };

    const backdropOpacity = translateAnim.interpolate({
      inputRange: [0, getInitialTranslateValue(side)],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const isInteractive = isAnimating || isDragging;
    const shadowStyle =
      Platform.OS === "ios" && isInteractive
        ? styles.contentNoShadow
        : styles.contentShadow;

    const getDragConfig = (currentSide: SheetSide) => {
      if (currentSide === "bottom") {
        return {
          axis: "y",
          min: 0,
          max: SCREEN_HEIGHT,
          size: SCREEN_HEIGHT,
          positive: true,
        };
      }
      if (currentSide === "top") {
        return {
          axis: "y",
          min: -SCREEN_HEIGHT,
          max: 0,
          size: SCREEN_HEIGHT,
          positive: false,
        };
      }
      if (currentSide === "right") {
        return {
          axis: "x",
          min: 0,
          max: SCREEN_WIDTH,
          size: SCREEN_WIDTH,
          positive: true,
        };
      }
      return {
        axis: "x",
        min: -SCREEN_WIDTH,
        max: 0,
        size: SCREEN_WIDTH,
        positive: false,
      };
    };

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
      const { translationX, translationY } = event.nativeEvent;
      const { axis, min, max } = getDragConfig(sideRef.current);
      const delta = axis === "x" ? translationX : translationY;
      const nextValue = clamp(dragStartValueRef.current + delta, min, max);
      translateAnim.setValue(nextValue);
    };

    const animateTo = (toValue: number, velocity?: number) => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
      setIsAnimating(true);
      animationRef.current = Animated.spring(translateAnim, {
        toValue,
        velocity,
        damping: 22,
        stiffness: 260,
        mass: 0.9,
        useNativeDriver: true,
      });
      animationRef.current.start(() => {
        animationRef.current = null;
        setIsAnimating(false);
      });
    };

    const handleGestureStateChange = (
      event: PanGestureHandlerStateChangeEvent
    ) => {
      const { state, translationX, translationY, velocityX, velocityY } =
        event.nativeEvent;

      if (state === State.BEGAN) {
        if (animationRef.current) {
          animationRef.current.stop();
          animationRef.current = null;
        }
        dragStartValueRef.current = currentValueRef.current;
        setIsDragging(true);
        return;
      }

      if (state === State.ACTIVE) {
        handleGestureEvent(event as PanGestureHandlerGestureEvent);
        return;
      }

      if (
        state === State.END ||
        state === State.CANCELLED ||
        state === State.FAILED
      ) {
        setIsDragging(false);
        const { axis, size, positive } = getDragConfig(sideRef.current);
        const delta = axis === "x" ? translationX : translationY;
        const velocity = axis === "x" ? velocityX : velocityY;
        const isClosingDirection = positive ? delta > 0 : delta < 0;
        const distance = Math.abs(delta);
        const shouldClose =
          isClosingDirection &&
          (distance > size * 0.25 || Math.abs(velocity) > 800);

        if (shouldClose) {
          setOpen(false);
          return;
        }

        animateTo(0, velocity);
      }
    };

    const handleBarStyle: ViewStyle = {
      backgroundColor: colors.border,
    };

    const getHandleContainerStyle = (): ViewStyle => {
      if (side === "left" || side === "right") {
        const attachSide = side === "right" ? "left" : "right";
        return {
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 32,
          [attachSide]: 0,
          justifyContent: "center",
          alignItems: "center",
        } as ViewStyle;
      }
      const attachSide = side === "bottom" ? "top" : "bottom";
      return {
        position: "absolute",
        left: 0,
        right: 0,
        height: 32,
        [attachSide]: 0,
        justifyContent: "center",
        alignItems: "center",
      } as ViewStyle;
    };

    const getHandleBarStyle = (): ViewStyle => {
      if (side === "left" || side === "right") {
        return {
          width: 4,
          height: 36,
          borderRadius: 2,
          opacity: 0.7,
        };
      }
      return {
        width: 36,
        height: 4,
        borderRadius: 2,
        opacity: 0.7,
      };
    };

    const dragAxis = getDragConfig(side).axis;

    return (
      <Modal
        transparent
        visible={isVisible}
        animationType="none"
        presentationStyle="overFullScreen"
        onRequestClose={() => setOpen(false)}
      >
        <GestureHandlerRootView style={styles.gestureRoot}>
          <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
            {/* Backdrop */}
            <Animated.View
              style={[styles.backdrop, { opacity: backdropOpacity }]}
              pointerEvents={open ? "auto" : "none"}
            >
              <Pressable
                style={StyleSheet.absoluteFill}
                onPress={() => setOpen(false)}
              />
            </Animated.View>

            {/* Sheet Content */}
            <Animated.View
              ref={ref as React.Ref<View>}
              style={[
                styles.contentBase,
                contentStyle,
                getSideStyle(),
                getTransformStyle(),
                shadowStyle,
                style,
              ]}
              shouldRasterizeIOS
              renderToHardwareTextureAndroid
              {...props}
            >
              <PanGestureHandler
                onGestureEvent={handleGestureEvent}
                onHandlerStateChange={handleGestureStateChange}
                enabled={open}
                hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                activeOffsetX={dragAxis === "x" ? [-8, 8] : undefined}
                activeOffsetY={dragAxis === "y" ? [-8, 8] : undefined}
              >
                <View
                  style={[styles.handleContainer, getHandleContainerStyle()]}
                  collapsable={false}
                  pointerEvents="box-only"
                >
                  <View style={[handleBarStyle, getHandleBarStyle()]} />
                </View>
              </PanGestureHandler>
              {children}
            </Animated.View>
          </View>
        </GestureHandlerRootView>
      </Modal>
    );
  }
);

SheetContent.displayName = "SheetContent";

/**
 * side に応じた初期 translate 値を取得
 */
function getInitialTranslateValue(side: SheetSide): number {
  switch (side) {
    case "bottom":
      return SCREEN_HEIGHT;
    case "top":
      return -SCREEN_HEIGHT;
    case "left":
      return -SCREEN_WIDTH;
    case "right":
      return SCREEN_WIDTH;
  }
}

export interface SheetCloseProps {
  /** 子要素 */
  children: React.ReactNode;
  /** トリガーとして使用する場合 */
  asChild?: boolean;
}

const SheetClose: React.FC<SheetCloseProps> = ({ children, asChild }) => {
  const { setOpen } = useSheet();

  const handlePress = () => {
    setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ onPress?: () => void }>,
      {
        onPress: handlePress,
      }
    );
  }

  return <Pressable onPress={handlePress}>{children}</Pressable>;
};

SheetClose.displayName = "SheetClose";

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentBase: {
    position: "absolute",
    padding: 24,
  },
  contentShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  contentNoShadow: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  gestureRoot: {
    flex: 1,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 8,
  },
});

export { Sheet, SheetTrigger, SheetContent, SheetClose };
