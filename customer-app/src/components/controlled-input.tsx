import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { View } from 'react-native';
import ThemedText from './themed-text';
import type { InputProps } from './ui/input';
import Input from './ui/input';

interface ControlledInputProps<TFieldValues extends FieldValues> extends Omit<
  InputProps,
  'value' | 'onChangeText'
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export default function ControlledInput<TFieldValues extends FieldValues>({
  control,
  name,
  ...props
}: ControlledInputProps<TFieldValues>) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
          <View className="relative">
            <Input
              {...props}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isError={!!error?.message}
            />
            {error?.message && (
              <View className="absolute top-1/2 right-4 -translate-y-1/2 rounded-md bg-red-500/30 px-3 py-1">
                <ThemedText variant="error" className="text-xs">
                  {error.message}
                </ThemedText>
              </View>
            )}
          </View>
        )}
      />
    </>
  );
}
