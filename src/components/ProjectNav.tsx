import { motion } from 'framer-motion';
import { MotionLink } from './MotionLink';

type ProjectNavProps = {
  isInfoOpen: boolean;
  nextProjectSlug: string;
};

export const ProjectNav = ({
  nextProjectSlug,
  isInfoOpen,
}: ProjectNavProps) => {
  return (
    <motion.nav
      animate={{ x: isInfoOpen ? '100%' : '0%' }}
      transition={{ ease: 'easeIn' }}
      className="vertical-rl fixed right-0 top-0 bg-black py-6 pr-2 text-7xl uppercase text-white"
    >
      <MotionLink to="/" whileHover={{ color: '#ef82ff' }}>
        Back
      </MotionLink>
      <span> - </span>
      <MotionLink to={`/${nextProjectSlug}`} whileHover={{ color: '#ef82ff' }}>
        Next
      </MotionLink>
    </motion.nav>
  );
};
