import useZodForm from '@/hooks/use-zod-form';
import { type TPhoneAuthSchemaProps, ZPhoneAuthSchema } from '@/validators/phone-auth.validator';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';

export default function usePhoneAuth() {
  const { form } = useZodForm<TPhoneAuthSchemaProps>({
    defaultValues: {
      phone: '',
      callingCode: '+63',
      callingCountry: 'PH',
    },
    schema: ZPhoneAuthSchema,
  });

  const _onPhoneAuthSubmit: SubmitHandler<TPhoneAuthSchemaProps> = React.useCallback(
    async (data) => {
      console.log(data);
    },
    [],
  );

  return { form, _onPhoneAuthSubmit };
}
