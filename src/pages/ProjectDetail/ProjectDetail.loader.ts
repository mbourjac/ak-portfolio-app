import type { LoaderFunctionArgs } from 'react-router-dom';
import type { QueryClient } from '@tanstack/react-query';
import { getHomeQueryOptions } from '../../content/home/home.queries';
import { getProjectQueryOptions } from '../../content/project/project.queries';

export const projectLoader =
  (queryClient: QueryClient) =>
  async ({ params: { slug } }: LoaderFunctionArgs) => {
    if (!slug) return null;

    return {
      projectDetail: await queryClient.ensureQueryData(
        getProjectQueryOptions(slug),
      ),
      home: await queryClient.ensureQueryData(getHomeQueryOptions()),
    };
  };
