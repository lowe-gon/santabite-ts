import { isValidPhoneNumber, type CountryCode } from 'libphonenumber-js';
import * as z from 'zod';

export const ZPhoneAuthSchema = z
  .object({
    phone: z.string().min(1, 'Required'),
    callingCountry: z.string().min(1, 'Required'),
    callingCode: z.string().min(1, 'Required'),
  })
  .check((ctx) => {
    const { callingCode, callingCountry, phone } = ctx.value;

    if (
      !isValidPhoneNumber(phone, {
        defaultCallingCode: callingCode,
        defaultCountry: callingCountry as CountryCode,
      })
    ) {
      ctx.issues.push({
        code: 'custom',
        path: ['phone'],
        message: 'Invalid phone number',
        input: phone,
      });
    }
  });

export type TPhoneAuthSchemaProps = z.infer<typeof ZPhoneAuthSchema>;
