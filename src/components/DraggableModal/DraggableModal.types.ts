export type DraggableModalId = 'about' | 'contact';

export type DraggableModal = {
  id: DraggableModalId;
  heading: string;
  position: { zIndex: number; top: string; left: string };
  isOpen: boolean;
  isDragged: boolean;
};
