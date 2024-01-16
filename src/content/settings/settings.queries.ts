import { queryOptions, useQuery } from '@tanstack/react-query';
import { container } from '../../container/container';
import type { Settings } from './settings.types';

export const getSettingsQueryOptions = () => {
  const { settingsService } = container;

  return queryOptions({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  });
};

export const useSettingsQuery = (initialData: Settings) => {
  const { data } = useQuery({
    ...getSettingsQueryOptions(),
    initialData,
  });

  return data;
};
