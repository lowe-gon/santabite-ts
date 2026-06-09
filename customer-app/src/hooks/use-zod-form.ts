import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldValues, type UseFormProps } from 'react-hook-form';
import * as z from 'zod';

type TUseZodFormProps<T extends FieldValues> = Omit<UseFormProps<T>, 'resolver'> & {
  schema: z.ZodType<T, any, any>;
};

export default function useZodForm<T extends FieldValues>({
  schema,
  ...props
}: TUseZodFormProps<T>) {
  const form = useForm<T>({
    ...props,
    resolver: zodResolver(schema),
  });

  return { form };
}
