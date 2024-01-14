import { settingsSchema } from '../content/settings/settings.schemas';
import { SettingsService } from '../content/settings/settings.service';
import { SanitySettingsRepository } from '../sanity/sanity.settings';

export interface Container {
  settingsService: SettingsService;
}

export const container: Container = {
  settingsService: new SettingsService(
    settingsSchema,
    new SanitySettingsRepository(),
  ),
};
