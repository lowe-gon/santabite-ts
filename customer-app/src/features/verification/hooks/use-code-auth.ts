import useZodForm from '@/hooks/use-zod-form';
import { useAuthStore } from '@/store/auth-store';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { CodeValidatorSchema, type CodeValidatorSchemaProps } from '../validators/code.validator';

export default function useCodeAuth() {
  const { form } = useZodForm<CodeValidatorSchemaProps>({
    schema: CodeValidatorSchema,
  });

  const setUser = useAuthStore((state) => state.setUser);

  const _onCodeSubmit: SubmitHandler<CodeValidatorSchemaProps> = React.useCallback(
    async (data) => {
      console.log(data);
      setUser({ full_name: 'Juan Dela Cruz', gender: 'Male', age: 27 });
    },
    [setUser],
  );

  return {
    form,
    _onCodeSubmit,
  };
}
