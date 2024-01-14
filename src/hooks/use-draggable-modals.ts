import { type RefObject, useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { draggableModalsAtom } from '../atoms/draggable-modals';
import type {
  DraggableModal,
  DraggableModalId,
} from '../components/DraggableModal/DraggableModal.types';

export const useDraggableModals = () => {
  const [draggableModals, setDraggableModals] = useAtom(draggableModalsAtom);

  const openedModals = useMemo(
    () => draggableModals.filter((modal) => modal.isOpen),
    [draggableModals],
  );

  const isAnyModalOpen = openedModals.length > 0;

  const getGreaterZIndex = useMemo(
    () => (modals: DraggableModal[]) =>
      Math.max(...modals.map(({ position }) => position.zIndex)) + 1,
    [],
  );

  const toggleSelectedModal = useCallback(
    (modals: DraggableModal[], selectedModalId: DraggableModalId) =>
      modals.map((modal) => {
        if (modal.id !== selectedModalId) {
          return modal;
        }

        return {
          ...modal,
          isOpen: !modal.isOpen,
          position: {
            ...modal.position,
            zIndex: getGreaterZIndex(modals),
          },
        };
      }),
    [getGreaterZIndex],
  );

  const closeSelectedModal = useCallback(
    (modals: DraggableModal[], selectedModalId: DraggableModalId) =>
      modals.map((modal) => {
        if (modal.id !== selectedModalId) {
          return modal;
        }

        return {
          ...modal,
          isOpen: false,
        };
      }),
    [],
  );

  const handleToggleModal = useCallback(
    (id: DraggableModalId) => {
      setDraggableModals((prevModals) => toggleSelectedModal(prevModals, id));
    },
    [setDraggableModals, toggleSelectedModal],
  );

  const handleCloseModal = useCallback(
    (id: DraggableModalId) => {
      setDraggableModals((prevModals) => closeSelectedModal(prevModals, id));
    },
    [setDraggableModals, closeSelectedModal],
  );

  const handleOnModalDragStart = useCallback(
    (id: DraggableModalId) => {
      setDraggableModals((prevModals) =>
        prevModals.map((modal) => {
          if (modal.id !== id) {
            return modal;
          }

          return {
            ...modal,
            isDragged: true,
            position: {
              ...modal.position,
              zIndex: getGreaterZIndex(prevModals),
            },
          };
        }),
      );
    },
    [setDraggableModals, getGreaterZIndex],
  );

  const handleOnModalDragEnd = useCallback(
    () =>
      setDraggableModals((prevModals) =>
        prevModals.map((modal) => ({
          ...modal,
          isDragged: false,
        })),
      ),
    [setDraggableModals],
  );

  const getDraggedModalPosition = useCallback(
    (modalElement: HTMLDivElement) => {
      const style = window.getComputedStyle(modalElement);
      const top = parseInt(style.top, 10);
      const left = parseInt(style.left, 10);

      const transformValues =
        modalElement.style.transform.match(/[-]?\d*\.?\d+/g) ?? [];
      const translateX = parseInt(transformValues[0] ?? '0', 10);
      const translateY = parseInt(transformValues[1] ?? '0', 10);

      return {
        updatedTop: `${top + translateY}px`,
        updatedLeft: `${left + translateX}px`,
      };
    },
    [],
  );

  const updateModalPosition = useCallback(
    (modalRef: RefObject<HTMLDivElement>, id: DraggableModalId) => {
      const modalElement = modalRef?.current;

      if (!modalElement) {
        throw new Error('modalRef is not assigned');
      }

      const { updatedTop, updatedLeft } = getDraggedModalPosition(modalElement);

      setDraggableModals((prevModals) =>
        prevModals.map((modal) => {
          if (modal.id !== id) {
            return modal;
          }

          return {
            ...modal,
            position: {
              ...modal.position,
              top: updatedTop,
              left: updatedLeft,
            },
          };
        }),
      );
    },
    [getDraggedModalPosition, setDraggableModals],
  );

  return {
    draggableModals,
    setDraggableModals,
    openedModals,
    isAnyModalOpen,
    handleCloseModal,
    handleToggleModal,
    handleOnModalDragStart,
    handleOnModalDragEnd,
    updateModalPosition,
  };
};
