import type { Home } from '../content/home/home.types';
import { useDraggableModals } from '../hooks/use-draggable-modals';
import { cn } from '../lib/tailwind';

type HeaderProps = {
  logo: Home['logo'];
};

export const Header = ({ logo }: HeaderProps) => {
  const { draggableModals, isAnyModalOpen, handleToggleModal } =
    useDraggableModals();

  return (
    <header
      className={cn(
        'pointer-events-none left-0 top-0 z-[2] flex w-full justify-between px-8 pt-8',
        isAnyModalOpen ? 'fixed' : 'sticky',
      )}
    >
      <img src={logo.imageUrl} alt={logo.alt} className="max-h-[150px]" />
      <div className="flex flex-col items-end gap-2 text-right tracking-widest">
        {draggableModals.map(({ id, heading }) => (
          <button
            key={id}
            className="pointer-events-auto w-fit font-menu text-[2.2rem] leading-[1.4] tracking-[0.1rem] [-webkit-text-stroke:1px_#fff] [text-shadow:6px_6px_4px_rgba(0,0,0,0.3)]"
            onClick={() => handleToggleModal(id)}
          >
            {heading}
          </button>
        ))}
      </div>
    </header>
  );
};
