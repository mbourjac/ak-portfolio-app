import { atom } from 'jotai';
import type { DraggableModal } from '../components/DraggableModal/DraggableModal.types';

export const aboutModal = {
  id: 'about' as const,
  heading: 'Infos',
  position: { top: '5vh', left: '50vw' },
};

export const contactModal = {
  id: 'contact' as const,
  heading: 'Contact',
  position: { top: '15vh', left: '10vw' },
};

export const initialModals = [aboutModal, contactModal].map((modal) => ({
  ...modal,
  position: {
    ...modal.position,
    zIndex: 1,
  },
  isOpen: false,
  isDragged: false,
}));

export const draggableModalsAtom = atom<DraggableModal[]>(initialModals);
