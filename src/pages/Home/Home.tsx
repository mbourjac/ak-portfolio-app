import { useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AboutModal } from '../../components/AboutModal';
import { ContactModal } from '../../components/ContactModal';
import { DraggableCover } from '../../components/DraggableCover/DraggableCover';
import { Header } from '../../components/Header';
import { useHomeQuery } from '../../content/home/home.queries';
import type { Home as HomeType } from '../../content/home/home.types';
import { useDraggableCovers } from '../../hooks/use-draggable-covers';
import { useDraggableModals } from '../../hooks/use-draggable-modals';
import { cn } from '../../lib/tailwind';

export const Home = () => {
  const initialData = useLoaderData() as HomeType;
  const { projectCovers, logo, bio, contact } = useHomeQuery(initialData);

  const { draggableCovers } = useDraggableCovers(projectCovers);
  const { isAnyModalOpen } = useDraggableModals();

  const coversConstraintsRef = useRef(null);
  const modalsConstraintsRef = useRef(null);

  return (
    <div className="flex min-h-screen flex-col" ref={coversConstraintsRef}>
      <Header logo={logo} />
      <main
        className={cn(
          'relative z-0 flex grow items-center px-8 pb-8',
          isAnyModalOpen ? 'pt-[calc(150px+4rem)]' : 'pt-8',
        )}
      >
        <section className="relative h-[700px] w-full">
          {draggableCovers.map((cover) => (
            <DraggableCover
              key={cover.id}
              cover={cover}
              constraintsRef={coversConstraintsRef}
            />
          ))}
        </section>
      </main>
      {isAnyModalOpen && (
        <div
          className="fixed left-0 top-0 z-[1] h-screen w-screen px-8 pb-8 backdrop-blur"
          ref={modalsConstraintsRef}
        ></div>
      )}
      <ContactModal contact={contact} constraintsRef={modalsConstraintsRef} />
      <AboutModal bio={bio} constraintsRef={modalsConstraintsRef} />
    </div>
  );
};
