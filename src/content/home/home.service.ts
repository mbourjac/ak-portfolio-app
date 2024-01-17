import { ContentService } from '../content.service';
import type { HomeRepository } from './home.repository';
import type { HomeSchema } from './home.types';

export class HomeService extends ContentService<HomeSchema> {
  constructor(
    schema: HomeSchema,
    private readonly homeRepository: HomeRepository,
  ) {
    super(schema);
  }

  getHome = async () => {
    const data = await this.homeRepository.getHome();
    return this.parseData(data);
  };
}
