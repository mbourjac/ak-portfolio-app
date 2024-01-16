import { type MutableRefObject, useEffect, useRef, useState } from 'react';
import type { ProjectCover as ProjectCoverType } from '../../content/project/project.types';
import { useDraggableCovers } from '../../hooks/use-draggable-covers';
import { usePixelization } from '../../hooks/use-pixelisation';
import { cn } from '../../lib/tailwind';
import { MotionLink } from '../MotionLink';
import { PixelatedImage } from '../PixelatedImage';
import { CoverTitle } from './CoverTitle';

export type DraggableCoverType = Omit<ProjectCoverType, 'position'> & {
  position: Omit<ProjectCoverType['position'], 'bottom' | 'left' | 'right'> & {
    top?: string;
    bottom: string | null;
    left?: string;
    right?: string | null;
  };
  isDragged: boolean;
};

type DraggableCoverProps = {
  projectCover: DraggableCoverType;
  constraintsRef: MutableRefObject<null>;
};

export const DraggableCover = ({
  projectCover: {
    id,
    slug,
    title,
    videoUrl,
    imageUrl,
    position: { top, bottom, left, right, zIndex },
    width,
    isVideo,
    aspectRatio,
    isDragged,
  },
  constraintsRef,
}: DraggableCoverProps) => {
  const [showTitle, setShowTitle] = useState(false);
  const { isPixelization } = usePixelization();
  const { handleOnCoverDragStart, handleOnCoverDragEnd, updateCoverPosition } =
    useDraggableCovers();
  const coverRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isDragged) return;

    updateCoverPosition(coverRef, id);
  }, [isDragged, updateCoverPosition, id]);

  return (
    <>
      <MotionLink
        ref={coverRef}
        to={slug}
        drag
        draggable={true}
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onDragStart={() => {
          handleOnCoverDragStart(id);
          setShowTitle(false);
        }}
        onDragEnd={() => {
          handleOnCoverDragEnd();
          setShowTitle(true);
        }}
        whileDrag={{
          boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
        }}
        onHoverStart={() => setShowTitle(true)}
        onHoverEnd={() => setShowTitle(false)}
        initial={{
          top: top ?? 'unset',
          left: left ?? 'unset',
          bottom: bottom ?? 'unset',
          right: right ?? 'unset',
        }}
        style={{
          zIndex,
          width: `${width}px`,
          aspectRatio: isVideo ? '16 / 9' : aspectRatio,
        }}
        className={cn('absolute block', isDragged && 'pointer-events-none')}
      >
        {isVideo ?
          <video
            src={videoUrl}
            preload="auto"
            muted
            autoPlay
            loop={true}
            className={cn(
              'pointer-events-none absolute block h-full w-full',
              isPixelization ? 'opacity-0' : 'opacity-100',
            )}
          ></video>
        : <img
            src={imageUrl}
            alt={title}
            className="pointer-events-none absolute w-full object-cover"
          />
        }
        {isPixelization && <PixelatedImage imageUrl={imageUrl} />}
      </MotionLink>
      {showTitle && <CoverTitle title={title} zIndex={zIndex} />}
    </>
  );
};
