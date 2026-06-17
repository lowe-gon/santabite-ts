import useZodForm from '@/hooks/use-zod-form';
import { useRouter } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import {
  PhoneValidatorSchema,
  type PhoneValidatorSchemaProps,
} from '../validators/phone.validator';

export default function usePhoneAuth() {
  const { form } = useZodForm<PhoneValidatorSchemaProps>({
    defaultValues: {
      callingCountry: 'PH',
    },
    schema: PhoneValidatorSchema,
  });
  const router = useRouter();

  const _onPhoneAuthSubmit: SubmitHandler<PhoneValidatorSchemaProps> = React.useCallback(
    async (data) => {
      console.log(data);
      router.replace({
        pathname: '/(auth)/verification',
        params: {
          identifier: 'phone',
          phone: data.phoneNumber,
          callingCountry: data.callingCountry,
        },
      });
    },
    [router, form],
  );

  return { form, _onPhoneAuthSubmit };
}
