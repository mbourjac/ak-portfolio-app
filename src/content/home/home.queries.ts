import { queryOptions, useQuery } from '@tanstack/react-query';
import { container } from '../../container/container';
import type { Home } from './home.types';

export const getHomeQueryOptions = () => {
  const { homeService } = container;

  return queryOptions({
    queryKey: ['home'],
    queryFn: homeService.getHome,
  });
};

export const useHomeQuery = (initialData: Home) => {
  const { data } = useQuery({
    ...getHomeQueryOptions(),
    initialData,
  });

  return data;
};
