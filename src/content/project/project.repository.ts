export interface ProjectRepository {
  getProjectBySlug: (slug: string) => Promise<unknown>;
}
