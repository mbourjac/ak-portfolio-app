import { z } from 'zod';
import { appSeoSchema } from '../utils/seo/seo.schemas';

export const settingsSchema = z.object({
  seo: appSeoSchema,
});
