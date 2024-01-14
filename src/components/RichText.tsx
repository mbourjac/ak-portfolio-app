import { useContainerContext } from '../container/use-container-context';

type RichTextProps = {
  content: unknown;
  className?: string;
};

export const RichText = ({ content, className }: RichTextProps) => {
  const { RichTextComponent } = useContainerContext();

  return <RichTextComponent value={content} className={className} />;
};
