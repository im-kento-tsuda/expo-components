import React, { forwardRef, createContext, useContext, useState, useCallback } from 'react';
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType>({
  open: false,
  setOpen: () => {},
});

export const useDialog = () => useContext(DialogContext);

export interface DialogProps {
  /** 開閉状態 */
  open?: boolean;
  /** 開閉状態変更時のコールバック */
  onOpenChange?: (open: boolean) => void;
  /** 子要素 */
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open: controlledOpen, onOpenChange, children }) => {
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
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

Dialog.displayName = 'Dialog';

export interface DialogTriggerProps {
  /** 子要素 */
  children: React.ReactNode;
  /** トリガーとして使用する場合 */
  asChild?: boolean;
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, asChild }) => {
  const { setOpen } = useDialog();

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

DialogTrigger.displayName = 'DialogTrigger';

export interface DialogContentProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const DialogContent = forwardRef<View, DialogContentProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();
    const { open, setOpen } = useDialog();

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
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View
              ref={ref}
              className={className}
              style={cn<ViewStyle>(styles.content, contentStyle, style)}
              {...props}
            >
              {children}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }
);

DialogContent.displayName = 'DialogContent';

export interface DialogCloseProps {
  /** 子要素 */
  children: React.ReactNode;
  /** トリガーとして使用する場合 */
  asChild?: boolean;
}

const DialogClose: React.FC<DialogCloseProps> = ({ children, asChild }) => {
  const { setOpen } = useDialog();

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

DialogClose.displayName = 'DialogClose';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    borderWidth: 1,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
});

export { Dialog, DialogTrigger, DialogContent, DialogClose };
