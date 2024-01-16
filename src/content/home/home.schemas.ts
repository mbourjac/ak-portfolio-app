import { z } from 'zod';
import { projectCoverSchema } from '../project/project.schemas';
import { baseImageSchema } from '../utils/image/image.schemas';

export const homeSchema = z.object({
  logo: baseImageSchema,
  bio: z.unknown(),
  contact: z.object({
    location: z.string(),
    email: z.string(),
    instagram: z.string(),
  }),
  projectCovers: z.array(projectCoverSchema),
});
