import type { QueryClient } from '@tanstack/react-query';
import { getSettingsQueryOptions } from '../../content/settings/settings.queries';

export const appLayoutLoader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(getSettingsQueryOptions());
};
