import { isValidPhoneNumber, type CountryCode } from 'libphonenumber-js';
import * as z from 'zod';

export const PhoneValidatorSchema = z
  .object({
    phoneNumber: z
      .string({
        error: (iss) => (iss.input === undefined ? 'Required' : 'Invalid Input'),
      })
      .min(1, 'Required'),
    callingCountry: z.string({
      error: (iss) => (iss.input === undefined ? 'Required' : 'Invalid Input'),
    }),
  })
  .check((ctx) => {
    const { phoneNumber, callingCountry } = ctx.value;
    if (!isValidPhoneNumber(phoneNumber, callingCountry as CountryCode)) {
      ctx.issues.push({
        code: 'custom',
        message: 'Invalid phone number',
        path: ['phoneNumber'],
        input: phoneNumber,
      });
    }
  });

export type PhoneValidatorSchemaProps = z.infer<typeof PhoneValidatorSchema>;
