import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { draggableCoversAtom } from '../atoms/draggable-covers';
import type { DraggableCoverType } from '../components/DraggableCover/DraggableCover';
import { useDraggables } from './use-draggables';

export const useDraggableCovers = (
  initialDraggableCovers?: DraggableCoverType[],
) => {
  const [draggableCovers, setDraggableCovers] = useAtom(draggableCoversAtom);
  const {
    handleOnDragStart: handleOnCoverDragStart,
    handleOnDragEnd: handleOnCoverDragEnd,
    updateDraggablePosition: updateCoverPosition,
  } = useDraggables(setDraggableCovers);

  useEffect(() => {
    if (initialDraggableCovers && draggableCovers.length === 0) {
      setDraggableCovers(initialDraggableCovers);
    }
  }, [initialDraggableCovers, draggableCovers, setDraggableCovers]);

  return {
    draggableCovers,
    setDraggableCovers,
    handleOnCoverDragStart,
    handleOnCoverDragEnd,
    updateCoverPosition,
  };
};
