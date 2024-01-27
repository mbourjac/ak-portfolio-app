import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import hideIcon from '../assets/icons/hide.svg';
import showIcon from '../assets/icons/show.svg';
import type { Project } from '../content/project/project.types';
import { cn } from '../lib/tailwind';
import { RichText } from './RichText';

type ProjectInfoProps = {
  title: Project['title'];
  description: Project['description'];
  date: Project['date'];
  isOpen: boolean;
  handleToggleInfo: () => void;
};

export const ProjectInfo = ({
  title,
  description,
  date,
  isOpen,
  handleToggleInfo,
}: ProjectInfoProps) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const descriptionElement = descriptionRef.current;

    if (descriptionElement && !isOpen) {
      descriptionElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpen]);

  return (
    <motion.div
      className="fixed top-[calc(100vh-13.5rem)] cursor-pointer"
      animate={{ y: isOpen ? '-20.625rem' : 0 }}
      transition={{ ease: 'easeIn' }}
      onClick={handleToggleInfo}
    >
      <p className="w-fit bg-black text-6xl text-white">{date}</p>
      <h1 className="w-fit bg-black text-8xl text-white">{title}</h1>
      <div
        ref={descriptionRef}
        className={cn(
          'h-[24.375rem] bg-black text-6xl tracking-widest text-white',
          isOpen ? 'overflow-auto' : 'overflow-hidden',
        )}
      >
        <div className="sticky top-0 float-right h-[3.75rem] w-[3.75rem] p-1">
          {isOpen ?
            <img
              src={hideIcon}
              alt=""
              className="rounded-full bg-primary p-1"
            />
          : <img
              src={showIcon}
              alt=""
              className="rounded-full bg-primary p-1"
            />
          }
        </div>
        <RichText value={description} />
      </div>
    </motion.div>
  );
};
