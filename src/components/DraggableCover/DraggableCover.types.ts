import type { ProjectCover } from '../../content/project/project.types';

export type DraggableCover = Omit<ProjectCover, 'position'> & {
  position: Omit<ProjectCover['position'], 'bottom' | 'left' | 'right'> & {
    top?: string;
    bottom: string | null;
    left?: string;
    right?: string | null;
  };
  isDragged: boolean;
};
