import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
  type ViewStyle,
  type ViewProps,
  type LayoutRectangle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useColors } from '../../lib/theme';

type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
type PopoverAlign = 'start' | 'center' | 'end';

const ARROW_SIZE = 10;

interface ArrowProps {
  size: number;
  color: string;
  borderColor: string;
  side: PopoverSide;
}

const Arrow: React.FC<ArrowProps> = ({ size, color, borderColor, side }) => {
  // 塗りつぶし用の三角形パス
  const getFillPath = (): string => {
    switch (side) {
      case 'bottom': // 上向き矢印
        return `M0,${size} L${size},0 L${size * 2},${size} Z`;
      case 'top': // 下向き矢印
        return `M0,0 L${size},${size} L${size * 2},0 Z`;
      case 'left': // 右向き矢印
        return `M${size},0 L0,${size} L${size},${size * 2} Z`;
      case 'right': // 左向き矢印
        return `M0,0 L${size},${size} L0,${size * 2} Z`;
    }
  };

  // ストローク用のパス（底辺を除く2辺のみ）
  const getStrokePath = (): string => {
    switch (side) {
      case 'bottom': // 上向き矢印：左斜辺と右斜辺のみ
        return `M0,${size} L${size},0 L${size * 2},${size}`;
      case 'top': // 下向き矢印：左斜辺と右斜辺のみ
        return `M0,0 L${size},${size} L${size * 2},0`;
      case 'left': // 右向き矢印：上斜辺と下斜辺のみ
        return `M${size},0 L0,${size} L${size},${size * 2}`;
      case 'right': // 左向き矢印：上斜辺と下斜辺のみ
        return `M0,0 L${size},${size} L0,${size * 2}`;
    }
  };

  const getSize = (): { width: number; height: number } => {
    if (side === 'top' || side === 'bottom') {
      return { width: size * 2, height: size };
    }
    return { width: size, height: size * 2 };
  };

  const { width, height } = getSize();

  return (
    <Svg width={width} height={height} style={{ overflow: 'visible' }}>
      {/* 塗りつぶし */}
      <Path d={getFillPath()} fill={color} />
      {/* 枠線（底辺を除く） */}
      <Path
        d={getStrokePath()}
        fill="none"
        stroke={borderColor}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerLayout: LayoutRectangle | null;
  setTriggerLayout: (layout: LayoutRectangle | null) => void;
  side: PopoverSide;
  align: PopoverAlign;
}

const PopoverContext = createContext<PopoverContextType>({
  open: false,
  setOpen: () => {},
  triggerLayout: null,
  setTriggerLayout: () => {},
  side: 'bottom',
  align: 'center',
});

export const usePopover = () => useContext(PopoverContext);

export interface PopoverProps {
  /** 開閉状態 */
  open?: boolean;
  /** 開閉状態変更時のコールバック */
  onOpenChange?: (open: boolean) => void;
  /** 子要素 */
  children: React.ReactNode;
  /** 表示位置 */
  side?: PopoverSide;
  /** 配置 */
  align?: PopoverAlign;
}

const Popover: React.FC<PopoverProps> = ({
  open: controlledOpen,
  onOpenChange,
  children,
  side = 'bottom',
  align = 'center',
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(
    null
  );

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
    <PopoverContext.Provider
      value={{ open, setOpen, triggerLayout, setTriggerLayout, side, align }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

Popover.displayName = 'Popover';

export interface PopoverTriggerProps {
  /** 子要素 */
  children: React.ReactNode;
  /** トリガーとして使用する場合 */
  asChild?: boolean;
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  children,
  asChild,
}) => {
  const { setOpen, setTriggerLayout } = usePopover();
  const triggerRef = useRef<View>(null);

  const handlePress = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
        setOpen(true);
      });
    }
  };

  if (asChild && React.isValidElement(children)) {
    return (
      <View ref={triggerRef} collapsable={false}>
        {React.cloneElement(
          children as React.ReactElement<{ onPress?: () => void }>,
          {
            onPress: handlePress,
          }
        )}
      </View>
    );
  }

  return (
    <Pressable ref={triggerRef} onPress={handlePress} collapsable={false}>
      {children}
    </Pressable>
  );
};

PopoverTrigger.displayName = 'PopoverTrigger';

export interface PopoverContentProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
  /** コンテンツの幅 */
  width?: number;
}

const PopoverContent = forwardRef<View, PopoverContentProps>(
  ({ children, style, className, width = 200, ...props }, ref) => {
    const colors = useColors();
    const { open, setOpen, triggerLayout, side, align } = usePopover();
    const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

    const getPosition = (): { top: number; left: number } => {
      if (!triggerLayout) {
        return { top: 0, left: 0 };
      }

      const { width: screenWidth, height: screenHeight } =
        Dimensions.get('window');
      // gap = 矢印の高さ + 少しの余白（矢印が1px重なるので調整）
      const gap = ARROW_SIZE + 2;

      let top = 0;
      let left = 0;

      // Calculate position based on side
      switch (side) {
        case 'top':
          top = triggerLayout.y - contentSize.height - gap;
          break;
        case 'bottom':
          top = triggerLayout.y + triggerLayout.height + gap;
          break;
        case 'left':
          left = triggerLayout.x - width - gap;
          top = triggerLayout.y;
          break;
        case 'right':
          left = triggerLayout.x + triggerLayout.width + gap;
          top = triggerLayout.y;
          break;
      }

      // Calculate alignment
      if (side === 'top' || side === 'bottom') {
        switch (align) {
          case 'start':
            left = triggerLayout.x;
            break;
          case 'center':
            left = triggerLayout.x + triggerLayout.width / 2 - width / 2;
            break;
          case 'end':
            left = triggerLayout.x + triggerLayout.width - width;
            break;
        }
      } else {
        switch (align) {
          case 'start':
            top = triggerLayout.y;
            break;
          case 'center':
            top =
              triggerLayout.y + triggerLayout.height / 2 - contentSize.height / 2;
            break;
          case 'end':
            top = triggerLayout.y + triggerLayout.height - contentSize.height;
            break;
        }
      }

      // Ensure content stays within screen bounds
      if (left < 8) left = 8;
      if (left + width > screenWidth - 8) left = screenWidth - width - 8;
      if (top < 8) top = 8;
      if (top + contentSize.height > screenHeight - 8) {
        top = screenHeight - contentSize.height - 8;
      }

      return { top, left };
    };

    const getArrowPosition = (): { top: number; left: number } => {
      if (!triggerLayout) return { top: 0, left: 0 };

      const position = getPosition();
      // SVG の矢印サイズ
      const arrowWidth = side === 'top' || side === 'bottom' ? ARROW_SIZE * 2 : ARROW_SIZE;
      const arrowHeight = side === 'top' || side === 'bottom' ? ARROW_SIZE : ARROW_SIZE * 2;
      // contentSize が 0 の場合のフォールバック
      const actualContentHeight = contentSize.height || 80;

      // 矢印の底辺がコンテンツのボーダーを隠すよう、2px重ねる
      const overlap = 2;

      if (side === 'top' || side === 'bottom') {
        // 矢印を trigger の中心に配置
        const triggerCenter = triggerLayout.x + triggerLayout.width / 2;
        let arrowLeft = triggerCenter - arrowWidth / 2;
        // content の範囲内に収める
        arrowLeft = Math.max(
          position.left + 8,
          Math.min(arrowLeft, position.left + width - 8 - arrowWidth)
        );

        if (side === 'bottom') {
          // コンテンツが下にある → 矢印はコンテンツの上端に配置
          return { top: position.top - arrowHeight + overlap, left: arrowLeft };
        } else {
          // コンテンツが上にある → 矢印はコンテンツの下端に配置
          return { top: position.top + actualContentHeight - overlap, left: arrowLeft };
        }
      } else {
        const triggerCenter = triggerLayout.y + triggerLayout.height / 2;
        let arrowTop = triggerCenter - arrowHeight / 2;
        arrowTop = Math.max(
          position.top + 8,
          Math.min(arrowTop, position.top + actualContentHeight - 8 - arrowHeight)
        );

        if (side === 'right') {
          // コンテンツが右にある → 矢印はコンテンツの左端に配置
          return { top: arrowTop, left: position.left - arrowWidth + overlap };
        } else {
          // コンテンツが左にある → 矢印はコンテンツの右端に配置
          return { top: arrowTop, left: position.left + width - overlap };
        }
      }
    };

    const getArrowContainerStyle = (): ViewStyle => {
      const arrowPos = getArrowPosition();
      return {
        position: 'absolute',
        top: arrowPos.top,
        left: arrowPos.left,
        zIndex: 1,
      };
    };

    const contentStyle: ViewStyle = {
      backgroundColor: colors.background,
      borderColor: colors.border,
    };

    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          {/* Content */}
          <View
            ref={ref}
            className={className}
            style={[
              styles.content,
              contentStyle,
              { width },
              getPosition(),
              style,
            ]}
            onLayout={(e) => {
              const { width: w, height: h } = e.nativeEvent.layout;
              if (w !== contentSize.width || h !== contentSize.height) {
                setContentSize({ width: w, height: h });
              }
            }}
            {...props}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              {children}
            </Pressable>
          </View>

          {/* Arrow - コンテンツの後にレンダリング */}
          <View style={getArrowContainerStyle()} pointerEvents="none">
            <Arrow
              size={ARROW_SIZE}
              color={colors.background}
              borderColor={colors.border}
              side={side}
            />
          </View>
        </Pressable>
      </Modal>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';

export interface PopoverCloseProps {
  /** 子要素 */
  children: React.ReactNode;
  /** トリガーとして使用する場合 */
  asChild?: boolean;
}

const PopoverClose: React.FC<PopoverCloseProps> = ({ children, asChild }) => {
  const { setOpen } = usePopover();

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

PopoverClose.displayName = 'PopoverClose';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    position: 'absolute',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
});

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
