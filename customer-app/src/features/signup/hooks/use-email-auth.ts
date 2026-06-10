import useZodForm from '@/hooks/use-zod-form';
import { useRouter } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import {
  EmailValidatorSchema,
  type EmailValidatorSchemaProps,
} from '../validators/email.validator';

export default function useEmailAuth() {
  const { form } = useZodForm<EmailValidatorSchemaProps>({
    schema: EmailValidatorSchema,
  });
  const router = useRouter();

  const _onEmailSubmit: SubmitHandler<EmailValidatorSchemaProps> = React.useCallback(
    async (data) => {
      console.log(data);
      router.push({
        pathname: '/(auth)/verification',
        params: {
          identifier: 'email',
          email: 'juandelacruz@example.com',
        },
      });
    },
    [router],
  );

  return {
    form,
    _onEmailSubmit,
  };
}
