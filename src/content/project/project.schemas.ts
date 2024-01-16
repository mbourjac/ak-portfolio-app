import { z } from 'zod';

export const baseProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  videoUrl: z.string().optional(),
});

export const projectCoverSchema = baseProjectSchema.extend({
  isVideo: z.boolean().optional(),
  imageUrl: z.string(),
  width: z.number(),
  aspectRatio: z.number(),
  position: z.object({
    bottom: z.number(),
    left: z.number().optional(),
    right: z.number().optional(),
    zIndex: z.number(),
  }),
});
