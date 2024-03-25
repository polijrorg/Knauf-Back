import { inject, injectable } from 'tsyringe';

import { Content } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IContentRepository from '../repositories/IContentRepository';
import IUpdateContentDTO from '../dtos/IUpdateContentDTO';

@injectable()
export default class UpdateContentService {
  constructor(
    @inject('ContentRepository')
    private contentRepository: IContentRepository,

  ) { }

  public async execute(id: string, data: IUpdateContentDTO): Promise<Content> {
    const contentExists = await this.contentRepository.findByID(id);

    if (!contentExists) throw new AppError('A content with this id does not exist');

    const content = await this.contentRepository.update(id, data);

    return content;
  }
}
