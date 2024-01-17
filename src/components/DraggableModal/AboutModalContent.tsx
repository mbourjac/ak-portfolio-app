import type { Bio } from '../../content/home/home.types';
import { RichText } from '../RichText';

type AboutModalContentProps = {
  bio: Bio;
};

export const AboutModalContent = ({ bio }: AboutModalContentProps) => {
  return <RichText value={bio} className="pb-10" />;
};
