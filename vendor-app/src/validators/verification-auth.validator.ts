import * as z from 'zod';

export const ZVerificationAuthValidatorSchema = z.object({
  code: z.string().min(1, 'Must be 6-digit').max(6, 'Less than 6-digit'),
});

export type TVerificationAuthSchemaProps = z.infer<typeof ZVerificationAuthValidatorSchema>;
