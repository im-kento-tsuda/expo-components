import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useColors, type ThemeColors } from '../../lib/theme';

type ToastVariant = 'default' | 'destructive';

interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toast: (data: Omit<ToastData, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  dismiss: () => {},
});

export const useToast = () => useContext(ToastContext);

export interface ToastProviderProps {
  /** 子要素 */
  children: React.ReactNode;
}

let toastId = 0;

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback((data: Omit<ToastData, 'id'>) => {
    const id = `toast-${++toastId}`;
    setToasts((prev) => [...prev, { id, ...data }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';

interface ToastViewportProps {
  toasts: ToastData[];
  dismiss: (id: string) => void;
}

const ToastViewport: React.FC<ToastViewportProps> = ({ toasts, dismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <View style={styles.viewport} pointerEvents="box-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </View>
  );
};

interface ToastItemProps {
  toast: ToastData;
  onDismiss: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const colors = useColors();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    // Show animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss
    const duration = toast.duration ?? 3000;
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  const variantStyles = getVariantStyles(colors);
  const variant = toast.variant || 'default';

  return (
    <Animated.View
      style={[
        styles.toast,
        variantStyles[variant],
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <Pressable onPress={handleDismiss} style={styles.toastContent}>
        {toast.title && (
          <Text style={[styles.title, { color: variant === 'destructive' ? colors.destructiveForeground : colors.foreground }]}>
            {toast.title}
          </Text>
        )}
        {toast.description && (
          <Text style={[styles.description, { color: variant === 'destructive' ? colors.destructiveForeground : colors.mutedForeground }]}>
            {toast.description}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

function getVariantStyles(colors: ThemeColors): Record<ToastVariant, ViewStyle> {
  return {
    default: {
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
    destructive: {
      backgroundColor: colors.destructive,
      borderColor: colors.destructive,
    },
  };
}

const styles = StyleSheet.create({
  viewport: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 9999,
    gap: 8,
  },
  toast: {
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  toastContent: {
    padding: 16,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
  },
});

export { ToastProvider };
