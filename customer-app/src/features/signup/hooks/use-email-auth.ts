import useZodForm from '@/hooks/use-zod-form';
import {
  ZEmailAuthValidatorSchema,
  type TEmailAuthSchemaProps,
} from '@/validators/email-auth.validation';

import { useRouter } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';

export default function useEmailAuth() {
  const { form } = useZodForm<TEmailAuthSchemaProps>({
    schema: ZEmailAuthValidatorSchema,
  });
  const router = useRouter();

  const _onEmailSubmit: SubmitHandler<TEmailAuthSchemaProps> = React.useCallback(
    async (data) => {
      console.log(data);
      router.replace({
        pathname: '/(auth)/verification',
        params: {
          identifier: 'email',
        },
      });
    },
    [router],
  );

  return { form, _onEmailSubmit };
}
