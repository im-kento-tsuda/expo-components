import React, { forwardRef, createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Modal,
  Pressable,
  Animated,
  StyleSheet,
  Dimensions,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import { useColors } from '../../lib/theme';

type SheetSide = 'bottom' | 'top' | 'left' | 'right';

interface SheetContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  side: SheetSide;
}

const SheetContext = createContext<SheetContextType>({
  open: false,
  setOpen: () => {},
  side: 'bottom',
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
  side = 'bottom',
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

Sheet.displayName = 'Sheet';

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
    return React.cloneElement(children as React.ReactElement<{ onPress?: () => void }>, {
      onPress: handlePress,
    });
  }

  return (
    <Pressable onPress={handlePress}>
      {children}
    </Pressable>
  );
};

SheetTrigger.displayName = 'SheetTrigger';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface SheetContentProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const SheetContent = forwardRef<View, SheetContentProps>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();
    const { open, setOpen, side } = useSheet();
    const translateAnim = useRef(new Animated.Value(getInitialTranslate(side))).current;

    useEffect(() => {
      if (open) {
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(translateAnim, {
          toValue: getInitialTranslate(side),
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }, [open, side, translateAnim]);

    const contentStyle: ViewStyle = {
      backgroundColor: colors.background,
      borderColor: colors.border,
    };

    const getTransformStyle = () => {
      if (side === 'bottom' || side === 'top') {
        return { transform: [{ translateY: translateAnim }] };
      }
      return { transform: [{ translateX: translateAnim }] };
    };

    const getSideStyle = (): ViewStyle => {
      switch (side) {
        case 'bottom':
          return { bottom: 0, left: 0, right: 0, borderTopWidth: 1, borderTopLeftRadius: 12, borderTopRightRadius: 12 };
        case 'top':
          return { top: 0, left: 0, right: 0, borderBottomWidth: 1, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 };
        case 'left':
          return { top: 0, bottom: 0, left: 0, width: SCREEN_WIDTH * 0.8, maxWidth: 400, borderRightWidth: 1 };
        case 'right':
          return { top: 0, bottom: 0, right: 0, width: SCREEN_WIDTH * 0.8, maxWidth: 400, borderLeftWidth: 1 };
      }
    };

    if (!open) {
      return null;
    }

    return (
      <Modal
        visible={open}
        transparent
        animationType="none"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
          <Animated.View
            ref={ref}
            style={[
              styles.content,
              contentStyle,
              getSideStyle(),
              getTransformStyle(),
              style,
            ]}
            {...props}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
);

SheetContent.displayName = 'SheetContent';

function getInitialTranslate(side: SheetSide): number {
  switch (side) {
    case 'bottom':
      return SCREEN_HEIGHT;
    case 'top':
      return -SCREEN_HEIGHT;
    case 'left':
      return -SCREEN_WIDTH;
    case 'right':
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
    return React.cloneElement(children as React.ReactElement<{ onPress?: () => void }>, {
      onPress: handlePress,
    });
  }

  return (
    <Pressable onPress={handlePress}>
      {children}
    </Pressable>
  );
};

SheetClose.displayName = 'SheetClose';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
});

export { Sheet, SheetTrigger, SheetContent, SheetClose };
