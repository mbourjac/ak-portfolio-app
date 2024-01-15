import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { draggableModalsAtom } from '../atoms/draggable-modals';
import type {
  DraggableModal,
  DraggableModalId,
} from '../components/DraggableModal/DraggableModal.types';
import { useDraggables } from './use-draggables';

export const useDraggableModals = () => {
  const [draggableModals, setDraggableModals] = useAtom(draggableModalsAtom);
  const {
    getGreaterZIndex: getModalGreaterZIndex,
    handleOnDragStart: handleOnModalDragStart,
    handleOnDragEnd: handleOnModalDragEnd,
    updateDraggablePosition: updateModalPosition,
  } = useDraggables(setDraggableModals);

  const openedModals = useMemo(
    () => draggableModals.filter((modal) => modal.isOpen),
    [draggableModals],
  );

  const isAnyModalOpen = openedModals.length > 0;

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
            zIndex: getModalGreaterZIndex(modals),
          },
        };
      }),
    [getModalGreaterZIndex],
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
