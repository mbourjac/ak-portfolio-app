import {
  type SetStateAction,
  useCallback,
  useMemo,
  type RefObject,
} from 'react';
import type { SetAtom } from '../lib/jotai';

interface Draggable {
  id: string;
  isDragged: boolean;
  position: { zIndex: number };
}

export const useDraggables = <T extends Draggable>(
  setDraggables: SetAtom<[SetStateAction<T[]>], void>,
) => {
  const getGreaterZIndex = useMemo(
    <T extends Draggable>() =>
      (draggables: T[]) =>
        Math.max(...draggables.map(({ position }) => position.zIndex)) + 1,
    [],
  );

  const handleOnDragStart = useCallback(
    (id: string) => {
      setDraggables((prevDraggables) =>
        prevDraggables.map((draggable) => {
          if (draggable.id !== id) {
            return draggable;
          }

          return {
            ...draggable,
            isDragged: true,
            position: {
              ...draggable.position,
              zIndex: getGreaterZIndex(prevDraggables),
            },
          };
        }),
      );
    },
    [setDraggables, getGreaterZIndex],
  );

  const handleOnDragEnd = useCallback(
    () =>
      setDraggables((prevDraggables) =>
        prevDraggables.map((draggable) => ({
          ...draggable,
          isDragged: false,
        })),
      ),
    [setDraggables],
  );

  const getDraggedPosition = useCallback(
    <T extends HTMLElement>(draggableElement: T) => {
      const style = window.getComputedStyle(draggableElement);
      const top = parseInt(style.top, 10);
      const left = parseInt(style.left, 10);

      const transformValues =
        draggableElement.style.transform.match(/[-]?\d*\.?\d+/g) ?? [];

      const translateX = parseInt(transformValues[0] ?? '0', 10);
      const translateY = parseInt(transformValues[1] ?? '0', 10);

      return {
        updatedTop: `${top + translateY}px`,
        updatedLeft: `${left + translateX}px`,
      };
    },
    [],
  );

  const updateDraggablePosition = useCallback(
    <T extends HTMLElement>(
      draggableRef: RefObject<T>,
      id: Draggable['id'],
    ) => {
      const draggableElement = draggableRef?.current;

      if (!draggableElement) {
        throw new Error('draggableRef is not assigned');
      }

      const { updatedTop, updatedLeft } = getDraggedPosition(draggableElement);

      setDraggables((prevDraggables) =>
        prevDraggables.map((draggable) => {
          if (draggable.id !== id) {
            return draggable;
          }

          return {
            ...draggable,
            position: {
              ...draggable.position,
              top: updatedTop,
              left: updatedLeft,
              bottom: null,
              right: null,
            },
          };
        }),
      );
    },
    [getDraggedPosition, setDraggables],
  );

  return {
    getGreaterZIndex,
    handleOnDragStart,
    handleOnDragEnd,
    updateDraggablePosition,
  };
};
