import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import ThemedText from './themed-text';
import ThemedView from './themed-view';
import type { IInputProps } from './ui/input';
import Input from './ui/input';

interface IControlledInputProps<T extends FieldValues> extends IInputProps {
  control: Control<T>;
  name: Path<T>;
}

export default function ControlledInput<T extends FieldValues>({
  control,
  name,
  ...props
}: IControlledInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
        <ThemedView className="relative w-full bg-transparent">
          <Input
            {...props}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            isError={!!error?.message}
          />
          {error?.message && (
            <ThemedView className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-md bg-red-500/20 px-3 py-1">
              <ThemedText size="smallBold" className="text-xs text-red-500">
                {error.message}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      )}
    />
  );
}
