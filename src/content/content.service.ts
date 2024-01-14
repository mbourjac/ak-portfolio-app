import type { z } from 'zod';

export abstract class ContentService<T extends z.ZodTypeAny> {
  private readonly name: string;

  constructor(private readonly contentSchema: T) {
    this.name = this.constructor.name;
  }

  protected parseData = (data: unknown) => {
    const parsedData = this.contentSchema.safeParse(data);

    if (!parsedData.success) {
      console.error(parsedData.error);
      throw new Error(`Error while validating schema in ${this.name}.`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return parsedData.data as z.infer<T>;
  };
}
