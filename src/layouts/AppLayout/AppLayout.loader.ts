import type { QueryClient } from '@tanstack/react-query';
import { getSettingsQuery } from '../../content/settings/settings.queries';

export const appLayoutLoader = (queryClient: QueryClient) => async () => {
  const query = getSettingsQuery();
  return queryClient.ensureQueryData(query);
};
