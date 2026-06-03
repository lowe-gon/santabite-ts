import React from 'react';
import { Text, TextInput, type FocusEvent, type TextInputProps } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';
import ThemedView from '../themed-view';

export interface IInputProps extends TextInputProps {
  label: string;
  isRequired?: boolean;
  isError?: boolean;
}

export default function Input({
  label,
  value,
  isError,
  isRequired,
  placeholder,
  onFocus,
  onBlur,
  ...rest
}: IInputProps) {
  const [isFocus, setIsFocus] = React.useState(false);
  const offset = useSharedValue(0);

  const animatedLabelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(offset.value, [0, 1], [0, -12], Extrapolation.CLAMP),
      },
    ],
    fontSize: interpolate(offset.value, [0, 1], [14, 12]),
    opacity: interpolate(offset.value, [0, 1], [1, 0.7]),
  }));

  const _onFocus = React.useCallback(
    (e: FocusEvent) => {
      // eslint-disable-next-line react-hooks/immutability
      offset.value = withTiming(1, { duration: 300 });
      setIsFocus(true);
      onFocus?.(e);
    },
    [offset, onFocus],
  );

  const _onBlur = React.useCallback(
    (e: FocusEvent) => {
      if (!value) {
        // eslint-disable-next-line react-hooks/immutability
        offset.value = withTiming(0, { duration: 300 });
      }
      setIsFocus(false);
      onBlur?.(e);
    },
    [offset, value, onBlur],
  );

  return (
    <ThemedView
      testID="input-container"
      className={twMerge(
        'bg-card relative h-14 w-full rounded-2xl px-4',
        isError && 'border border-red-500',
      )}>
      <Animated.Text
        style={animatedLabelStyle}
        className={twMerge(
          'text-text-main absolute top-4.5 left-4 font-medium',
          isError && 'text-red-500',
        )}>
        {label} {isRequired && <Text className="text-red-500">*</Text>}
      </Animated.Text>
      <TextInput
        {...rest}
        testID="input"
        placeholder={isFocus ? placeholder : undefined}
        className="text-text-main mt-2 flex-1 font-medium"
        onFocus={_onFocus}
        onBlur={_onBlur}
      />
    </ThemedView>
  );
}
