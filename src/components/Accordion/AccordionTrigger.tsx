import React, { forwardRef } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  Animated,
  type ViewStyle,
  type TextStyle,
  type PressableProps,
} from 'react-native';
import { useColors } from '../../lib/theme';
import { cn } from '../../lib/utils';
import { useAccordion } from './Accordion';
import { useAccordionItem } from './AccordionItem';

export interface AccordionTriggerProps extends Omit<PressableProps, 'style' | 'className'> {
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: ViewStyle;
  /** NativeWind className */
  className?: string;
}

const AccordionTrigger = forwardRef<React.ElementRef<typeof Pressable>, AccordionTriggerProps>(
  ({ children, style, className, ...props }, ref) => {
    const colors = useColors();
    const { onValueChange } = useAccordion();
    const { value, isOpen } = useAccordionItem();

    const rotateAnim = React.useRef(new Animated.Value(isOpen ? 1 : 0)).current;

    React.useEffect(() => {
      Animated.timing(rotateAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [isOpen, rotateAnim]);

    const rotation = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const textStyle: TextStyle = {
      color: colors.foreground,
    };

    const iconStyle: TextStyle = {
      color: colors.mutedForeground,
    };

    return (
      <Pressable
        ref={ref}
        className={className}
        style={cn<ViewStyle>(styles.trigger, style)}
        onPress={() => onValueChange(value)}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        {...props}
      >
        <Text style={[styles.text, textStyle]}>{children}</Text>
        <Animated.View style={[styles.iconContainer, { transform: [{ rotate: rotation }] }]}>
          <Text style={[styles.icon, iconStyle]}>▼</Text>
        </Animated.View>
      </Pressable>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  text: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  icon: {
    fontSize: 12,
  },
});

export { AccordionTrigger };
