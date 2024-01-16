import { atom } from 'jotai';
import type { DraggableCoverType } from '../components/DraggableCover/DraggableCover';

export const draggableCoversAtom = atom<DraggableCoverType[]>([]);
