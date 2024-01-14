import { useContextWrapper } from '../hooks/use-context-wrapper';
import { ContainerContextProvider } from './ContainerContextProvider';
import { ContainerContext } from './container-context';

export const useContainerContext = () =>
  useContextWrapper(ContainerContext, {
    contextName: useContainerContext.name,
    contextProvider: ContainerContextProvider.name,
  });
