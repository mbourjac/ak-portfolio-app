import { useQuery } from '@tanstack/react-query';
import { container } from '../../container/container';
import type { Settings } from './settings.types';

export const getSettingsQuery = () => {
  const { settingsService } = container;

  return {
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  };
};

export const useSettingsQuery = (initialData: Settings) => {
  const { data } = useQuery({
    ...getSettingsQuery(),
    initialData,
  });

  return data;
};
