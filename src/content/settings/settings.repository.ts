export interface SettingsRepository {
  getSettings: () => Promise<unknown>;
}
