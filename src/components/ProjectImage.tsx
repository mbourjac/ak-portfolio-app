import type { ProjectImage as ProjectImageType } from '../content/utils/image/image.types';
import { cn } from '../lib/tailwind';

type ProjectImageProps = ProjectImageType;

export const ProjectImage = ({
  imageUrl,
  alt,
  aspectRatio,
  size,
  leftPadding,
  rightPadding,
  verticalAlignment,
}: ProjectImageProps) => {
  const heightMapping = {
    max: 'max-h-[calc(100vh-3.75rem)]',
    large: 'max-h-[calc(80vh-3.75rem)]',
    medium: 'max-h-[calc(65vh-3.75rem)]',
    small: 'max-h-[calc(50vh-3.75rem)]',
  };

  const alignmentMapping = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
  };

  const leftPaddingMapping = {
    large: 'pl-32',
    medium: 'pl-24',
    small: 'pl-8',
    null: 'pl-0',
  };

  const rightPaddingMapping = {
    large: 'pr-32',
    medium: 'pr-24',
    small: 'pr-8',
    null: 'pr-0',
  };

  return (
    <div
      className={cn(
        'flex min-h-[calc(100vh-3.75rem)] min-w-fit',
        leftPaddingMapping[leftPadding],
        rightPaddingMapping[rightPadding],
        alignmentMapping[verticalAlignment],
      )}
    >
      <img
        src={imageUrl}
        alt={alt}
        className={cn(heightMapping[size])}
        style={{ aspectRatio }}
      />
    </div>
  );
};
