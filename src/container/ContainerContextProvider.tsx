import type { ReactNode } from 'react';
import { container } from './container';
import { ContainerContext } from './container-context';

type ContainerContextProviderProps = {
  children: ReactNode;
};

export const ContainerContextProvider = ({
  children,
}: ContainerContextProviderProps) => {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
};
