import React, { forwardRef, createContext, useContext, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import { useColors } from '../../lib/theme';

interface TooltipContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerLayout: { x: number; y: number; width: number; height: number };
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void;
}

const TooltipContext = createContext<TooltipContextType>({
  open: false,
  setOpen: () => {},
  triggerLayout: { x: 0, y: 0, width: 0, height: 0 },
  setTriggerLayout: () => {},
});

export const useTooltip = () => useContext(TooltipContext);

export interface TooltipProps {
  /** 開閉状態 */
  open?: boolean;
  /** 開閉状態変更時のコールバック */
  onOpenChange?: (open: boolean) => void;
  /** 子要素 */
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ open: controlledOpen, onOpenChange, children }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

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
    <TooltipContext.Provider value={{ open, setOpen, triggerLayout, setTriggerLayout }}>
      {children}
    </TooltipContext.Provider>
  );
};

Tooltip.displayName = 'Tooltip';

export interface TooltipTriggerProps {
  /** 子要素 */
  children: React.ReactNode;
  /** トリガーとして使用する場合 */
  asChild?: boolean;
}

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children, asChild }) => {
  const { setOpen, setTriggerLayout } = useTooltip();
  const triggerRef = useRef<View>(null);

  const handleLongPress = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
        setOpen(true);
      });
    }
  };

  const handlePressOut = () => {
    setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{
      ref?: React.Ref<View>;
      onLongPress?: () => void;
      onPressOut?: () => void;
    }>, {
      ref: triggerRef,
      onLongPress: handleLongPress,
      onPressOut: handlePressOut,
    });
  }

  return (
    <Pressable
      ref={triggerRef}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}
    >
      {children}
    </Pressable>
  );
};

TooltipTrigger.displayName = 'TooltipTrigger';

export interface TooltipContentProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const TooltipContent = forwardRef<View, TooltipContentProps>(
  ({ children, style, className: _className, ...props }, ref) => {
    const colors = useColors();
    const { open, triggerLayout } = useTooltip();
    const opacity = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      if (open) {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      } else {
        opacity.setValue(0);
      }
    }, [open, opacity]);

    if (!open) {
      return null;
    }

    const contentStyle: ViewStyle = {
      backgroundColor: colors.foreground,
    };

    // Position above the trigger
    const positionStyle: ViewStyle = {
      position: 'absolute',
      top: triggerLayout.y - 8, // Will be adjusted with transform
      left: triggerLayout.x + triggerLayout.width / 2,
      transform: [{ translateX: -50 }, { translateY: -100 }],
    };

    return (
      <Modal visible={open} transparent animationType="none">
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Animated.View
            ref={ref}
            style={[
              styles.content,
              contentStyle,
              positionStyle,
              { opacity },
              style,
            ]}
            {...props}
          >
            {typeof children === 'string' ? (
              <Text style={[styles.text, { color: colors.background }]}>{children}</Text>
            ) : (
              children
            )}
          </Animated.View>
        </View>
      </Modal>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    maxWidth: 200,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export { Tooltip, TooltipTrigger, TooltipContent };
