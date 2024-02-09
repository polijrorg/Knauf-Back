import { inject, injectable } from 'tsyringe';

import { Content } from '@prisma/client';

import IContentRepository from '../repositories/IContentRepository';
import ICreateContentDTO from '../dtos/ICreateContentDTO';

@injectable()
export default class CreateContentService {
  constructor(
    @inject('ContentRepository')
    private contentRepository: IContentRepository,
  ) { }

  public async execute(data: ICreateContentDTO): Promise<Content> {
    const content = await this.contentRepository.create(data);

    return content;
  }
}
