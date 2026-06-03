import { useKeyboardHandler } from 'react-native-keyboard-controller';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export default function useKeyboardAnimation(offset = -24) {
  const height = useSharedValue(0);

  useKeyboardHandler({
    onMove: (e) => {
      'worklet';
      height.value = Math.max(e.height, 0);
    },
  });

  const fakeViewStyle = useAnimatedStyle(() => ({
    height: height.value > 0 ? height.value + offset : 0,
  }));

  return { fakeViewStyle };
}
