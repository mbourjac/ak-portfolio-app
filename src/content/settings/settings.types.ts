import type { z } from 'zod';
import type { appSeoSchema, settingsSchema } from './settings.schemas';

export type AppSeo = z.infer<typeof appSeoSchema>;
export type Settings = z.infer<typeof settingsSchema>;
