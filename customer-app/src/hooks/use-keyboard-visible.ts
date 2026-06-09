import React from "react";
import { Keyboard } from "react-native";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function useKeyboardVisible() {
  const [isKeyboardVisible, setIsKeyboardVisible] =
    React.useState<boolean>(false);

  const progress = useSharedValue(0);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
      "worklet";
      setIsKeyboardVisible(true);
      progress.value = withTiming(1, { duration: e.duration });
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", (e) => {
      "worklet";
      setIsKeyboardVisible(false);
      progress.value = withTiming(0, { duration: e.duration });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 1]),
    };
  }, []);

  return { isKeyboardVisible, buttonAnimatedStyle };
}
