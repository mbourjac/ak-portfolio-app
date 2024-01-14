import { type Context, useContext } from 'react';

interface ContextConfig {
  contextName: string;
  contextProvider: string;
}

export const useContextWrapper = <T>(
  ReactContext: Context<T>,
  contextConfig: ContextConfig,
) => {
  const context = useContext(ReactContext);
  const { contextName, contextProvider } = contextConfig;

  if (!context) {
    throw new Error(`${contextName} must be used within a ${contextProvider}`);
  }

  return context;
};
