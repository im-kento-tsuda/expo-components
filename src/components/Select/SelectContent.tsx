import React, { forwardRef } from 'react';
import {
  View,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useSelect } from './Select';

export interface SelectContentProps extends Omit<ViewProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const SelectContent = forwardRef<View, SelectContentProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();
    const { open, setOpen } = useSelect();

    const contentStyle: ViewStyle = {
      backgroundColor: colors.background,
      borderColor: colors.border,
    };

    if (!open) {
      return null;
    }

    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.contentWrapper}>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View
                ref={ref}
                className={className}
                style={cn<ViewStyle>(styles.content, contentStyle, style)}
                {...props}
              >
                <ScrollView style={styles.scrollView} bounces={false}>
                  {children}
                </ScrollView>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    );
  }
);

SelectContent.displayName = 'SelectContent';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    width: '80%',
    maxWidth: 300,
  },
  content: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  scrollView: {
    maxHeight: 300,
  },
});

export { SelectContent };
