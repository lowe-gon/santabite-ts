import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { View } from 'react-native';
import ThemedText from './themed-text';
import { InputOTP, InputOTPSlot } from './ui/input-otp';

interface IControlledInputOTPProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function ControlledInputOTP<T extends FieldValues>({
  control,
  name,
  onSubmit,
}: IControlledInputOTPProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onBlur, onChange },
        fieldState: { error },
        formState: { isSubmitting },
      }) => (
        <View className="relative w-full">
          <View className="flex-row items-center">
            <InputOTP
              maxLength={6}
              value={value || ''}
              onChange={onChange}
              disabled={isSubmitting}
              onComplete={onSubmit}>
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
              <InputOTPSlot index={6} />
            </InputOTP>
          </View>
          {error?.message && (
            <View className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-md bg-red-500/20 px-3 py-1">
              <ThemedText className="text-xs text-red-500">{error.message}</ThemedText>
            </View>
          )}
        </View>
      )}
    />
  );
}
