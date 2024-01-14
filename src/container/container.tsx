import { settingsSchema } from '../content/settings/settings.schemas';
import { SettingsService } from '../content/settings/settings.service';
import { CustomPortableText } from '../sanity/portable-text/CustomPortableText';
import { SanitySettingsRepository } from '../sanity/sanity.settings';

export interface Container {
  settingsService: SettingsService;
  RichTextComponent: (props: {
    element?: keyof JSX.IntrinsicElements;
    value: unknown;
    className?: string;
  }) => JSX.Element;
}

export const container: Container = {
  settingsService: new SettingsService(
    settingsSchema,
    new SanitySettingsRepository(),
  ),
  RichTextComponent: CustomPortableText,
};
