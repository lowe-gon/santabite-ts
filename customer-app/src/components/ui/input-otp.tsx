import React from 'react';
import { Platform, TextInput, type TextInputKeyPressEvent } from 'react-native';
import { twMerge } from 'tailwind-merge';
import ThemedView from '../themed-view';

interface IInputOTPContextProps {
  ref: React.RefObject<TextInput[]>;
  value: string[];
  onChange: (text: string, index: number) => void;
  onKeyPress: (event: TextInputKeyPressEvent, index: number) => void;
  disabled: boolean;
}

const InputOTPContext = React.createContext<IInputOTPContextProps | null>(null);

export interface IInputOTPProps extends React.PropsWithChildren {
  maxLength: number;
  value: string;
  onChange: (text: string) => void;
  disabled: boolean;
  onComplete?: () => void;
}

export function InputOTP({
  maxLength,
  value,
  disabled,
  onChange,
  onComplete,
  children,
}: IInputOTPProps) {
  const inputRef = React.useRef<TextInput[]>([]);
  const [values, setValues] = React.useState<string[]>(value.split(''));

  const focusInput = React.useCallback((index: number) => {
    if (inputRef.current[index]) {
      inputRef.current[index].focus();
    }
  }, []);

  const _onChangeText = React.useCallback(
    (text: string, index: number) => {
      const newValue = [...values];
      newValue[index] = text;
      setValues(newValue);

      const combinedString = newValue.join('');
      onChange(combinedString);

      if (text && index < maxLength - 1) {
        focusInput(index + 1);
      }

      if (combinedString.length === maxLength) {
        onComplete?.();
      }
    },
    [values, maxLength, focusInput, onChange, onComplete],
  );

  const _onKeyPress = React.useCallback(
    (event: TextInputKeyPressEvent, index: number) => {
      if (event.nativeEvent.key === 'Backspace' && !values[index] && index > 0) {
        focusInput(index - 1);
      }
    },
    [values, focusInput],
  );

  return (
    <InputOTPContext.Provider
      value={{
        ref: inputRef,
        value: values,
        onChange: _onChangeText,
        onKeyPress: _onKeyPress,
        disabled,
      }}>
      {children}
    </InputOTPContext.Provider>
  );
}

export function useInputOTP() {
  const context = React.useContext(InputOTPContext);

  if (!context) {
    throw new Error('useInputOTP must be used within InputOTP');
  }

  return context;
}

interface IInputOTPSlotProps {
  index: number;
}

export function InputOTPSlot({ index }: IInputOTPSlotProps) {
  const { ref: inputRef, onChange: _onChangeText, onKeyPress: _onKeyPress, value } = useInputOTP();

  return (
    <ThemedView
      testID="otp-input-container"
      className={twMerge(
        'bg-card relative h-14 flex-1 rounded-2xl px-4',
        //   isError && 'border border-red-500',
      )}>
      <TextInput
        ref={(ref) => {
          if (ref) inputRef.current[index - 1] = ref;
        }}
        keyboardType="decimal-pad"
        className="text-text-main flex-1 text-center text-2xl font-semibold"
        value={value[index - 1]}
        onChangeText={(text) => _onChangeText(text, index - 1)}
        onKeyPress={(e) => _onKeyPress(e, index - 1)}
        maxLength={1}
        selectTextOnFocus
        caretHidden={Platform.OS === 'ios'}
        textContentType="oneTimeCode"
        autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        accessibilityRole="text"
        testID="otp-input"
      />
    </ThemedView>
  );
}
