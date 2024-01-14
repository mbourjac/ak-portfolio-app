import { z } from 'zod';

export const appSeoSchema = z.object({
  title: z.string(),
  description: z.string(),
  ogImageUrl: z.string().optional(),
});

export const pageSeoSchema = appSeoSchema.partial();
