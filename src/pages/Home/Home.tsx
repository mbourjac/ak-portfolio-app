import { useCallback, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import { DraggableCover } from '../../components/DraggableCover/DraggableCover';
import { AboutModalContent } from '../../components/DraggableModal/AboutModalContent';
import { ContactModalContent } from '../../components/DraggableModal/ContactModalContent';
import { DraggableModal } from '../../components/DraggableModal/DraggableModal';
import type { DraggableModalId } from '../../components/DraggableModal/DraggableModal.types';
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
  const { openedModals, isAnyModalOpen } = useDraggableModals();

  const coversConstraintsRef = useRef(null);
  const modalsConstraintsRef = useRef(null);

  const getModalContent = useCallback(
    (modalId: DraggableModalId) => {
      switch (modalId) {
        case 'about':
          return <AboutModalContent bio={bio} />;
        case 'contact':
          return <ContactModalContent contact={contact} />;
      }
    },
    [bio, contact],
  );

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
        <>
          <div
            className="fixed left-0 top-0 z-[1] h-screen w-screen px-8 pb-8 backdrop-blur"
            ref={modalsConstraintsRef}
          ></div>
          {openedModals.map((modal) => (
            <DraggableModal
              key={modal.id}
              modal={modal}
              constraintsRef={modalsConstraintsRef}
            >
              {getModalContent(modal.id)}
            </DraggableModal>
          ))}
        </>
      )}
    </div>
  );
};
