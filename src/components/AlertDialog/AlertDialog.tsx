import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';
import {
  View,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type ViewProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

interface AlertDialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextType>({
  open: false,
  setOpen: () => {},
});

export const useAlertDialog = () => useContext(AlertDialogContext);

export interface AlertDialogProps {
  /** 開閉状態 */
  open?: boolean;
  /** 開閉状態変更時のコールバック */
  onOpenChange?: (open: boolean) => void;
  /** 子要素 */
  children: React.ReactNode;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  open: controlledOpen,
  onOpenChange,
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
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

AlertDialog.displayName = 'AlertDialog';

export interface AlertDialogTriggerProps {
  /** 子要素 */
  children: React.ReactNode;
  /** トリガーとして使用する場合 */
  asChild?: boolean;
}

const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = ({
  children,
  asChild,
}) => {
  const { setOpen } = useAlertDialog();

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

AlertDialogTrigger.displayName = 'AlertDialogTrigger';

export interface AlertDialogContentProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const AlertDialogContent = forwardRef<View, AlertDialogContentProps>(
  ({ children, style, ...props }, ref) => {
    const colors = useColors();
    const { open } = useAlertDialog();

    const contentStyle: ViewStyle = {
      backgroundColor: colors.background,
      borderColor: colors.border,
    };

    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => {
          // AlertDialog は外部クリックでは閉じない
        }}
      >
        <View style={styles.overlay}>
          <View
            ref={ref}
            style={cn<ViewStyle>(styles.content, contentStyle, style)}
            {...props}
          >
            {children}
          </View>
        </View>
      </Modal>
    );
  }
);

AlertDialogContent.displayName = 'AlertDialogContent';

export interface AlertDialogHeaderProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const AlertDialogHeader = forwardRef<View, AlertDialogHeaderProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={cn<ViewStyle>(styles.header, style)} {...props}>
        {children}
      </View>
    );
  }
);

AlertDialogHeader.displayName = 'AlertDialogHeader';

export interface AlertDialogFooterProps extends Omit<ViewProps, 'style'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
}

const AlertDialogFooter = forwardRef<View, AlertDialogFooterProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={cn<ViewStyle>(styles.footer, style)} {...props}>
        {children}
      </View>
    );
  }
);

AlertDialogFooter.displayName = 'AlertDialogFooter';

export interface AlertDialogTitleProps {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({
  children,
  style,
}) => {
  const colors = useColors();

  const textStyle: TextStyle = {
    color: colors.foreground,
  };

  return <Text style={[styles.title, textStyle, style]}>{children}</Text>;
};

AlertDialogTitle.displayName = 'AlertDialogTitle';

export interface AlertDialogDescriptionProps {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
}

const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({
  children,
  style,
}) => {
  const colors = useColors();

  const textStyle: TextStyle = {
    color: colors.mutedForeground,
  };

  return (
    <Text style={[styles.description, textStyle, style]}>{children}</Text>
  );
};

AlertDialogDescription.displayName = 'AlertDialogDescription';

export interface AlertDialogCancelProps {
  /** 子要素 */
  children: React.ReactNode;
  /** トリガーとして使用する場合 */
  asChild?: boolean;
}

const AlertDialogCancel: React.FC<AlertDialogCancelProps> = ({
  children,
  asChild,
}) => {
  const { setOpen } = useAlertDialog();

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

AlertDialogCancel.displayName = 'AlertDialogCancel';

export interface AlertDialogActionProps {
  /** 子要素 */
  children: React.ReactNode;
  /** トリガーとして使用する場合 */
  asChild?: boolean;
  /** アクション実行時のコールバック */
  onAction?: () => void;
}

const AlertDialogAction: React.FC<AlertDialogActionProps> = ({
  children,
  asChild,
  onAction,
}) => {
  const { setOpen } = useAlertDialog();

  const handlePress = () => {
    onAction?.();
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

AlertDialogAction.displayName = 'AlertDialogAction';

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
  header: {
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
};
