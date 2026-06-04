import * as z from 'zod';

export const ZEmailAuthValidatorSchema = z.object({
  email: z.email(),
});

export type TEmailAuthSchemaProps = z.infer<typeof ZEmailAuthValidatorSchema>;
