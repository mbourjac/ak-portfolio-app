import groq from 'groq';
import { SanityRepository } from './sanity.repository';

export class SanityProjectRepository extends SanityRepository {
  type = 'project';

  getProjection = () => groq`{
    "id": _id,
    defined(seo) => {
      seo {
        defined(title) => {title},
        defined(description) => {description},
        defined(ogImageUrl) => {
          "ogImageUrl": ogImageUrl.asset->url
        },
      }
    },
    title,
    "slug": slug.current,
    date,
    "description": description[] {
      ...,
      markDefs[] {
        ...,
        _type == "internalLink" => {
          "slug": @.reference-> slug.current
        }
      }
    },
    "images": images[] {
      "imageUrl": asset->url + "?h=" + string(round(${window.innerHeight} * 2)),
      "aspectRatio": asset->metadata.dimensions.aspectRatio,
      defined(alt) => {alt},
      size,
      verticalAlignment,
      leftMargin,
      rightMargin
    },
    defined(cover) => {
      cover {
        "imageUrl": asset->url,
        defined(alt) => {alt},
      }
    },
    defined(video) => {
      "video": video.asset->url
    },
  }`;

  getProjectBySlug = async (slug: string) => {
    return this.getDocumentBySlug(slug);
  };
}
