import { homeSchema } from '../content/home/home.schemas';
import { HomeService } from '../content/home/home.service';
import { projectSchema } from '../content/project/project.schemas';
import { ProjectService } from '../content/project/project.service';
import { settingsSchema } from '../content/settings/settings.schemas';
import { SettingsService } from '../content/settings/settings.service';
import { CustomPortableText } from '../sanity/portable-text/CustomPortableText';
import { SanityHomeRepository } from '../sanity/sanity.home';
import { SanityProjectRepository } from '../sanity/sanity.project';
import { SanitySettingsRepository } from '../sanity/sanity.settings';

export interface Container {
  settingsService: SettingsService;
  homeService: HomeService;
  projectService: ProjectService;
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
  homeService: new HomeService(homeSchema, new SanityHomeRepository()),
  projectService: new ProjectService(
    projectSchema,
    new SanityProjectRepository(),
  ),
  RichTextComponent: CustomPortableText,
};
