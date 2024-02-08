import { inject, injectable } from 'tsyringe';

import { Content } from '@prisma/client';

import IContentRepository from '../repositories/IContentRepository';
import IUpdateContentDTO from '../dtos/IUpdateContentDTO';

@injectable()
export default class UpdateContentService {
  constructor(
    @inject('ContentRepository')
    private contentRepository: IContentRepository,

  ) { }

  public async execute(id: string, data: IUpdateContentDTO): Promise<Content> {
    const content = await this.contentRepository.update(id, data);

    return content;
  }
}
