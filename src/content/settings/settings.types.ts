import type { z } from 'zod';
import type { settingsSchema } from './settings.schemas';

export type SettingsSchema = typeof settingsSchema;

export type Settings = z.infer<SettingsSchema>;
