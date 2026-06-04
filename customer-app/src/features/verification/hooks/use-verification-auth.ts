import useZodForm from '@/hooks/use-zod-form';
import { useAuthStore } from '@/store/auth-store';
import {
  ZVerificationAuthValidatorSchema,
  type TVerificationAuthSchemaProps,
} from '@/validators/verification-auth.validator';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';

export default function useVerificationAuth() {
  const { form } = useZodForm<TVerificationAuthSchemaProps>({
    schema: ZVerificationAuthValidatorSchema,
  });
  const _onSaveGuest = useAuthStore((state) => state.onSaveGuest);

  const _onVerificationSubmit: SubmitHandler<TVerificationAuthSchemaProps> = React.useCallback(
    async (data) => {
      setTimeout(() => {
        console.log(data);
        _onSaveGuest(true);
      }, 10000);
    },
    [_onSaveGuest],
  );

  return { form, _onVerificationSubmit };
}
