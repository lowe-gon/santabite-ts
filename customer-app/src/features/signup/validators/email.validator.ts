import * as z from 'zod';

export const EmailValidatorSchema = z.object({
  email: z
    .email({
      error: (iss) => (iss.input !== undefined ? 'Invalid email address' : 'Required'),
    })
    .min(1, 'Required'),
});

export type EmailValidatorSchemaProps = z.infer<typeof EmailValidatorSchema>;
