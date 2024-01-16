import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/use-mouse-position';

type CoverTitleProps = {
  title: string;
  zIndex: number;
};

export const CoverTitle = ({ title, zIndex }: CoverTitleProps) => {
  const mousePosition = useMousePosition();
  const offsetX = -4;
  const offsetY = -38;

  return (
    mousePosition && (
      <motion.p
        style={{
          zIndex: zIndex + 1,
          x: `${mousePosition.x + offsetX}px`,
          y: `${mousePosition.y + offsetY}px`,
        }}
        className="pointer-events-none fixed left-0 top-0 text-[2rem] tracking-widest text-white [text-shadow:2px_2px_1px_rgba(0,0,0,0.8)]"
      >
        {title}
      </motion.p>
    )
  );
};
