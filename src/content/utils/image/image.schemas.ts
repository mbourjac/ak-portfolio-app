import { z } from 'zod';

export const baseImageSchema = z.object({
  imageUrl: z.string(),
  alt: z.string().optional(),
});

export const projectImageSchema = baseImageSchema.extend({
  aspectRatio: z.number(),
  size: z.enum(['max', 'large', 'medium', 'small']),
  verticalAlignment: z.enum(['top', 'center', 'bottom']),
  leftPadding: z.enum(['large', 'medium', 'small', 'null']),
  rightPadding: z.enum(['large', 'medium', 'small', 'null']),
});
