import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import InputPhone from './ui/input-phone';

interface ControlledInputPhoneProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export default function ControlledInputPhone<TFieldValues extends FieldValues>({
  control,
  name,
}: ControlledInputPhoneProps<TFieldValues>) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <>
            <InputPhone value={value} onChange={onChange} />
          </>
        )}
      />
    </>
  );
}
