import { type MutableRefObject, useMemo } from 'react';
import type { Contact } from '../content/home/home.types';
import { useDraggableModals } from '../hooks/use-draggable-modals';
import { DraggableModal } from './DraggableModal/DraggableModal';

type ContactModalProps = {
  contact: Contact;
  constraintsRef: MutableRefObject<null>;
};

export const ContactModal = ({
  contact: { location, email, instagram },
  constraintsRef,
}: ContactModalProps) => {
  const initialContactModal = useMemo(
    () => ({
      id: 'contact' as const,
      heading: 'Contact',
      position: { top: '15vh', left: '10vw', zIndex: 1 },
      isOpen: false,
      isDragged: false,
    }),
    [],
  );

  const { draggableModals } = useDraggableModals(initialContactModal);
  const draggableContactModal = draggableModals.find(
    ({ id }) => id === initialContactModal.id,
  );

  return (
    draggableContactModal?.isOpen && (
      <DraggableModal
        {...draggableContactModal}
        constraintsRef={constraintsRef}
      >
        <div className="flex h-full flex-col justify-center text-2xl">
          <p>{location}</p>
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            {email}
          </a>
          <a
            href={`https://www.instagram.com/${instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`@${instagram}`}
          </a>
        </div>
      </DraggableModal>
    )
  );
};
