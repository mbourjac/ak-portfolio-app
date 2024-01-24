import { type MutableRefObject, useMemo } from 'react';
import type { Bio } from '../content/home/home.types';
import { useDraggableModals } from '../hooks/use-draggable-modals';
import { DraggableModal } from './DraggableModal/DraggableModal';
import { RichText } from './RichText';

type AboutModalProps = {
  bio: Bio;
  constraintsRef: MutableRefObject<null>;
};

export const AboutModal = ({ bio, constraintsRef }: AboutModalProps) => {
  const initialAboutModal = useMemo(
    () => ({
      id: 'about' as const,
      heading: 'Infos',
      position: { top: '5vh', left: '50vw', zIndex: 1 },
      isOpen: false,
      isDragged: false,
    }),
    [],
  );

  const { draggableModals } = useDraggableModals(initialAboutModal);
  const draggableAboutModal = draggableModals.find(
    ({ id }) => id === initialAboutModal.id,
  );

  return (
    draggableAboutModal?.isOpen && (
      <DraggableModal {...draggableAboutModal} constraintsRef={constraintsRef}>
        <RichText value={bio} className="pb-10" />
      </DraggableModal>
    )
  );
};
