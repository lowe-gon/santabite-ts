import * as z from 'zod';

export const CodeValidatorSchema = z.object({
  code: z
    .string({ error: (iss) => (iss.input !== undefined ? 'Required' : 'Invalid Input') })
    .min(1, 'Must be 6-digit code')
    .max(6, 'Must less than 6-digit code'),
});

export type CodeValidatorSchemaProps = z.infer<typeof CodeValidatorSchema>;
