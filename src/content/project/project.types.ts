import type { z } from 'zod';
import type { projectCoverSchema, projectSchema } from './project.schemas';

export type ProjectSchema = typeof projectSchema;

export type Project = z.infer<ProjectSchema>;

export type ProjectCover = z.infer<typeof projectCoverSchema>;
