import { ContentService } from '../content.service';
import type { SettingsRepository } from './settings.repository';
import type { settingsSchema } from './settings.schemas';

export class SettingsService extends ContentService<typeof settingsSchema> {
  constructor(
    schema: typeof settingsSchema,
    private readonly settingsRepository: SettingsRepository,
  ) {
    super(schema);
  }

  getSettings = async () => {
    const data = await this.settingsRepository.getSettings();
    return this.parseData(data);
  };
}
