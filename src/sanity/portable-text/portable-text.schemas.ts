import { z } from 'zod';

export const typedObjectSchema = z
  .object({
    _type: z.string(),
    _key: z.string().optional(),
  })
  .passthrough();

export const portableTextValueSchema = z.union([
  typedObjectSchema,
  z.array(typedObjectSchema),
]);
