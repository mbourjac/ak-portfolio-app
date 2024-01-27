import { useParams } from 'react-router-dom';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { container } from '../../container/container';
import type { Project } from './project.types';

export const getProjectQueryOptions = (slug: string) => {
  const { projectService } = container;

  return queryOptions({
    queryKey: ['projects', 'detail', { slug }],
    queryFn: () => projectService.getProjectBySlug(slug),
  });
};

export const useProjectQuery = (initialData: Project) => {
  const { slug } = useParams();

  if (!slug) {
    throw new Error('Project slug is undefined');
  }

  const { data } = useQuery({
    ...getProjectQueryOptions(slug),
    initialData,
  });

  return data;
};
