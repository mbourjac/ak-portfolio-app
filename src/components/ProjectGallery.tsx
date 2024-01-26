import type { ProjectImage as ProjectImageType } from '../content/utils/image/image.types';
import { ProjectImage } from './ProjectImage';

type ProjectGalleryProps = {
  images: ProjectImageType[];
  videoUrl?: string;
};

export const ProjectGallery = ({ images, videoUrl }: ProjectGalleryProps) => {
  return (
    <div className="flex">
      {videoUrl && (
        <div className="aspect-video h-[70vh]">
          <video
            src={videoUrl}
            muted
            autoPlay
            loop={true}
            className="pointer-events-none h-full w-full"
          ></video>
        </div>
      )}
      {images.map((image, index) => {
        return <ProjectImage key={index} {...image} />;
      })}
    </div>
  );
};
