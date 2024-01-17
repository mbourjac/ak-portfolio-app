import type { z } from 'zod';
import type { homeSchema } from './home.schemas';

export type HomeSchema = typeof homeSchema;

export type Home = z.infer<HomeSchema>;

export type Bio = Home['bio'];

export type Contact = Home['contact'];
