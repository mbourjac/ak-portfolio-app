import { z } from 'zod';

export const baseImageSchema = z.object({
  imageUrl: z.string(),
  alt: z.string().optional(),
});
