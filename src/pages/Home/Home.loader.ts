import type { QueryClient } from '@tanstack/react-query';
import { getHomeQueryOptions } from '../../content/home/home.queries';

export const homeLoader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(getHomeQueryOptions());
};
