import type { z } from 'zod';
import type { appSeoSchema, pageSeoSchema } from './seo.schemas';

export type AppSeo = z.infer<typeof appSeoSchema>;
export type PageSeo = z.infer<typeof pageSeoSchema>;
