// Type declarations to support NativeWind's className prop
// This allows components to accept className without requiring NativeWind as a dependency

import 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface TouchableHighlightProps {
    className?: string;
  }
  interface TouchableWithoutFeedbackProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface FlatListProps<ItemT> {
    className?: string;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface SectionListProps<ItemT, SectionT = ItemT> {
    className?: string;
  }
  interface SafeAreaViewProps {
    className?: string;
  }
  interface ModalProps {
    className?: string;
  }
}
