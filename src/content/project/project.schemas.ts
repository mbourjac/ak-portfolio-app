import { z } from 'zod';
import { projectImageSchema } from '../utils/image/image.schemas';
import { pageSeoSchema } from '../utils/seo/seo.schemas';

export const baseProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  videoUrl: z.string().optional(),
});

export const projectSchema = baseProjectSchema.extend({
  seo: pageSeoSchema.optional(),
  description: z.unknown(),
  images: z.array(projectImageSchema),
});

export const projectCoverSchema = baseProjectSchema
  .extend({
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
  })
  .transform(({ position, ...rest }) => ({
    ...rest,
    position: {
      ...position,
      bottom: `${position.bottom}px`,
      left: position.left === undefined ? undefined : `${position.left}%`,
      right: position.right === undefined ? undefined : `${position.right}%`,
    },
    isDragged: false,
  }));
