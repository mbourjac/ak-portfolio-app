import type { z } from 'zod';
import type { projectImageSchema } from './image.schemas';

export type ProjectImage = z.infer<typeof projectImageSchema>;
