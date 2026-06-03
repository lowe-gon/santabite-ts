import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, type GestureResponderEvent, type PressableProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface IHapticPressableProps extends PressableProps {
  isLiquidGlass?: boolean;
}

export default function HapticPressable({
  isLiquidGlass,
  className,
  onPress,
  ...rest
}: IHapticPressableProps & React.PropsWithChildren) {
  const _onPress = React.useCallback(
    async (e: GestureResponderEvent) => {
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }

      onPress?.(e);
    },
    [onPress],
  );

  return <Pressable className={twMerge('', className)} onPress={_onPress} {...rest} />;
}
