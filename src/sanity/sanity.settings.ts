import groq from 'groq';
import { SanityRepository } from './sanity.repository';

export class SanitySettingsRepository extends SanityRepository {
  type = 'settings';

  getProjection = () => groq`{
    seo {
      title,
      description,
      defined(ogImageUrl) => {
        "ogImageUrl": ogImageUrl.asset->url
      },
    }
  }`;

  getSettings = async () => {
    return this.getSingletonDocument();
  };
}
