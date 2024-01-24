import { atom } from 'jotai';
import type { DraggableModal } from '../components/DraggableModal/DraggableModal.types';

export const draggableModalsAtom = atom<DraggableModal[]>([]);
