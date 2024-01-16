import type { z } from 'zod';
import type { projectCoverSchema } from './project.schemas';

export type ProjectCover = z.infer<typeof projectCoverSchema>;
