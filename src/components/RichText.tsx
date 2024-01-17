import { useContainerContext } from '../container/use-container-context';

type RichTextProps = {
  value: unknown;
  className?: string;
};

export const RichText = ({ value, className }: RichTextProps) => {
  const { RichTextComponent } = useContainerContext();

  return <RichTextComponent value={value} className={className} />;
};
