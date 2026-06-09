import { useKeyboardHandler } from 'react-native-keyboard-controller';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export default function useKeyboardAnimation(OFFSET = 100) {
  const progress = useSharedValue(0);

  useKeyboardHandler(
    {
      onMove: (e) => {
        'worklet';
        progress.value = e.progress;
      },
    },
    [],
  );

  const fakeView = useAnimatedStyle(() => {
    return {
      height: progress.value * OFFSET,
    };
  });

  return { fakeView };
}
