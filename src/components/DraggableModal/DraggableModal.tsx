import {
  type MutableRefObject,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';
import { motion } from 'framer-motion';
import { useDraggableModals } from '../../hooks/use-draggable-modals';
import type { DraggableModal as DraggableModalType } from './DraggableModal.types';

export type DraggableModalProps = {
  modal: DraggableModalType;
  constraintsRef: MutableRefObject<null>;
  children: ReactNode;
};

export const DraggableModal = ({
  modal: {
    id,
    heading,
    position: { zIndex, top, left },
    isDragged,
  },
  constraintsRef,
  children,
}: DraggableModalProps) => {
  const {
    handleCloseModal,
    handleOnModalDragStart,
    handleOnModalDragEnd,
    updateModalPosition,
  } = useDraggableModals();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDragged) return;

    updateModalPosition(modalRef, id);
  }, [isDragged, updateModalPosition, id]);

  return (
    <motion.div
      ref={modalRef}
      drag
      draggable={true}
      dragElastic={0}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      onDragStart={() => handleOnModalDragStart(id)}
      onDragEnd={handleOnModalDragEnd}
      whileDrag={{
        cursor: 'grabbing',
        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 5px 20px',
      }}
      onClick={() => handleOnModalDragStart(id)}
      initial={{ top, left }}
      style={{
        zIndex,
      }}
      className="bg-primary fixed h-[min(80vh,800px)] w-[clamp(480px,35vw,600px)] cursor-grab shadow-[rgba(0,0,0,0.35)_0px_5px_15px]"
    >
      <button
        onClick={() => handleCloseModal(id)}
        className="absolute right-[0.8rem] top-[0.2rem] text-[2.5rem]"
      >
        X
      </button>
      <div className="flex h-full flex-col gap-8 overflow-auto p-10">
        <h4 className="font-menu bg-transparent text-center text-[2.2rem] leading-[2.2rem] tracking-widest [-webkit-text-stroke:1px_#fff] [text-shadow:6px_6px_4px_rgba(0,0,0,0.3)]">
          {heading}
        </h4>
        <div className="font-modal h-[calc(100%+2.5rem)] text-base">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
