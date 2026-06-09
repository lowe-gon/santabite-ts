import useThemeColor from '@/hooks/use-theme-color';
import { cn } from '@/libs/cn';
import React from 'react';
import {
  Text,
  TextInput,
  View,
  type BlurEvent,
  type FocusEvent,
  type TextInputProps,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface InputProps extends TextInputProps {
  label: string;
  isError?: boolean;
  isRequired?: boolean;
}

export default function Input({
  label,
  value,
  placeholder,
  isError,
  isRequired,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const text = useThemeColor('text');
  const textMuted = useThemeColor('textMuted');
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const translateY = useSharedValue(0);
  const labelHeight = useSharedValue(0);

  const animatedLabelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          translateY.value,
          [0, 1],
          [(labelHeight.value / 2) * -1, -20],
          Extrapolation.CLAMP,
        ),
      },
    ],
    fontSize: interpolate(translateY.value, [0, 1], [14, 11]),
    color: interpolateColor(
      translateY.value,
      [0, 1],
      [isError ? '#fb2c36' : text, isError ? '#fb2c36' : textMuted],
    ),
  }));

  const _onFocus = React.useCallback(
    (e: FocusEvent) => {
      setIsFocus(true);
      translateY.value = withTiming(1, { duration: 300 });
      onFocus?.(e);
    },
    [onFocus],
  );

  const _onBlur = React.useCallback(
    (e: BlurEvent) => {
      setIsFocus(false);
      if (!value) {
        translateY.value = withTiming(0, { duration: 300 });
      }
      onBlur?.(e);
    },
    [value, onBlur],
  );

  return (
    <View
      className={cn(
        'bg-surface relative h-14 w-full rounded-2xl px-4',
        isError && 'border border-red-500',
      )}>
      <Animated.Text
        onLayout={(e) => {
          labelHeight.value = e.nativeEvent.layout.height;
        }}
        style={animatedLabelStyle}
        className="text-text absolute top-1/2 left-4 font-medium">
        {label} {isRequired && <Text className="text-red-500">*</Text>}
      </Animated.Text>

      <TextInput
        {...props}
        className="text-text mt-2 flex-1 text-sm font-medium"
        onFocus={_onFocus}
        onBlur={_onBlur}
        placeholder={isFocus ? placeholder : ''}
      />
    </View>
  );
}
