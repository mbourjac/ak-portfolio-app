import { ContentService } from '../content.service';
import type { ProjectRepository } from './project.repository';
import type { ProjectSchema } from './project.types';

export class ProjectService extends ContentService<ProjectSchema> {
  constructor(
    schema: ProjectSchema,
    private readonly projectRepository: ProjectRepository,
  ) {
    super(schema);
  }

  getProjectBySlug = async (slug: string) => {
    const data = await this.projectRepository.getProjectBySlug(slug);
    return this.parseData(data);
  };
}
