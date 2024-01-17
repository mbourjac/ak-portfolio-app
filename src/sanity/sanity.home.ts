import groq from 'groq';
import { SanityRepository } from './sanity.repository';

export class SanityHomeRepository extends SanityRepository {
  type = 'home';

  getProjection = () => groq`{
    defined(logo) => {
      logo {
        "imageUrl": asset->url,
        defined(alt) => {alt},
      }
    },
    "bio": bio[] {
      ...,
      markDefs[] {
        ...,
        _type == "internalLink" => {
          "slug": @.reference-> slug.current
        }
      }
    },
    "contact": {
      location,
      email,
      instagram
    },
    "projectCovers": projects[]-> {
      "id": _id,
      title,
      "slug": slug.current,
      date,
      defined(cover.isVideo) => {
        "isVideo": cover.isVideo
      },
      "imageUrl": cover.image.asset->url + "?w=" + string(round(cover.width * 2)),
      defined(video) => {
        "videoUrl": video.asset->url
      },
      "width": cover.width,
      "aspectRatio": cover.image.asset->metadata.dimensions.aspectRatio,
      "position": {
        "bottom": cover.position.bottom,
      defined(cover.position.left) => {
        "left": cover.position.left
      },
      defined(cover.position.right) => {
        "right": cover.position.right
      },
      "zIndex": cover.position.zIndex,
      },      
    },
  }`;

  getHome = async () => {
    return this.getSingletonDocument();
  };
}
