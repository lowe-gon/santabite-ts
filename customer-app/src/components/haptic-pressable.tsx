import { cn } from '@/libs/cn';
// import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
  type PressableProps,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { tv, type VariantProps } from 'tailwind-variants';

const hapticPressableVariant = tv({
  base: 'relative flex-row items-center justify-center rounded-2xl',
  variants: {
    variant: {
      default: 'bg-sky-500 disabled:bg-sky-500/70',
      outline: 'border-px bg-background disabled:bg-background/70',
      secondary: 'bg-orange-500 disabled:bg-orange-500/70',
      ghost: 'bg-background',
      destructive: 'bg-red-500 disabled:bg-red-500/70',
    },
    size: {
      default: 'h-14',
      xs: 'h-6',
      sm: 'h-7',
      lg: 'h-9',
      icon: 'size-8 rounded-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface HapticPressableProps extends PressableProps, VariantProps<typeof hapticPressableVariant> {
  label: string;
  hasAnimation?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  textColor: string;
}

export default function HapticPressable({
  hasAnimation,
  label,
  variant,
  size,
  className,
  iconLeft,
  iconRight,
  textColor,
  onPressIn,
  onPressOut,
  ...props
}: HapticPressableProps) {
  const scale = useSharedValue(1);

  const _onPressIn = React.useCallback(
    (e: GestureResponderEvent) => {
      // if (Platform.OS === 'ios') {
      //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      // }

      if (hasAnimation) {
        scale.value = withSpring(0.9);
      }

      onPressIn?.(e);
    },
    [hasAnimation, scale, onPressIn],
  );

  const _onPressOut = React.useCallback(
    (e: GestureResponderEvent) => {
      if (hasAnimation) {
        scale.value = withSpring(1);
      }

      onPressOut?.(e);
    },
    [hasAnimation, scale, onPressOut],
  );

  const pressableAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <>
      <Animated.View style={pressableAnimatedStyle}>
        <Pressable
          {...props}
          onPressOut={_onPressOut}
          className={cn(hapticPressableVariant({ variant, size }), className)}
          onPressIn={_onPressIn}>
          {iconLeft && <View className="absolute top-1/2 left-5 -translate-y-1/2">{iconLeft}</View>}

          <Text className={cn('text-base font-medium', textColor)}>{label}</Text>

          {iconRight && (
            <View className="absolute top-1/2 right-5 -translate-y-1/2">{iconRight}</View>
          )}
        </Pressable>
      </Animated.View>
    </>
  );
}
