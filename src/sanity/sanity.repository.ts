import groq from 'groq';
import { z } from 'zod';

export abstract class SanityRepository {
  private readonly PROJECT_ID = '9imdd6o6';
  private readonly DATASET = 'production';
  private readonly dataSchema = z.object({
    result: z.unknown(),
  });
  private readonly errorResponseSchema = z.object({
    error: z.unknown(),
  });

  protected abstract readonly type: string;
  protected abstract readonly getProjection: () => string;

  getAllDocuments = async () => {
    const query = groq`*[_type == "${
      this.type
    }"] | order(_createdAt desc) ${this.getProjection()}`;
    return this.fetchData(query);
  };

  getSingletonDocument = async () => {
    const query = groq`*[_type == "${this.type}"]${this.getProjection()}[0]`;
    return this.fetchData(query);
  };

  getNewestDocument = async () => {
    const query = groq`*[_type == "${
      this.type
    }"] | order(_createdAt desc) ${this.getProjection()}[0]`;
    return this.fetchData(query);
  };

  getDocumentBySlug = async (slug: string) => {
    const query = groq`*[_type == "${
      this.type
    }" && slug.current == "${slug}"]${this.getProjection()}[0]`;
    return this.fetchData(query);
  };

  private fetchData = async (query: string) => {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://${this.PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${this.DATASET}?query=${encodedQuery}`;
    const response = await fetch(url);

    if (!response.ok) {
      const { error } = this.errorResponseSchema.parse(await response.json());
      console.error(error);

      throw new Error(`Error ${response.status} while fetching Sanity data.`);
    }

    const data = this.dataSchema.parse(await response.json());

    return data.result;
  };
}
