import { ContentService } from '../content.service';
import type { SettingsRepository } from './settings.repository';
import type { SettingsSchema } from './settings.types';

export class SettingsService extends ContentService<SettingsSchema> {
  constructor(
    schema: SettingsSchema,
    private readonly settingsRepository: SettingsRepository,
  ) {
    super(schema);
  }

  getSettings = async () => {
    const data = await this.settingsRepository.getSettings();
    return this.parseData(data);
  };
}
