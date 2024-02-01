import { inject, injectable } from 'tsyringe';

import { Content } from '@prisma/client';

import IContentRepository from '../repositories/IContentRepository';

@injectable()
export default class GetAllContentService {
  constructor(
    @inject('ContentRepository')
    private contentRepository: IContentRepository,

  ) { }

  public async execute(): Promise<Content[] | null> {
    const content = await this.contentRepository.findAll();

    return content;
  }
}
