import useZodForm from '@/hooks/use-zod-form';
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

  const _onPhoneAuthSubmit: SubmitHandler<PhoneValidatorSchemaProps> = React.useCallback(
    async (data) => {
      console.log(data);
    },
    [],
  );

  return { form, _onPhoneAuthSubmit };
}
