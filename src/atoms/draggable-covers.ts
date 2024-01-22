import { atom } from 'jotai';
import type { DraggableCover } from '../components/DraggableCover/DraggableCover.types';

export const draggableCoversAtom = atom<DraggableCover[]>([]);
