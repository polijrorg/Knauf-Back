import { inject, injectable } from 'tsyringe';

import { Seen } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IContentRepository from '@modules/content/repositories/IContentRepository';
import ISeenRepository from '../repositories/ISeenRepository';

@injectable()
export default class GetAllSeenFromAContentService {
  constructor(
    @inject('SeenRepository')
    private seenRepository: ISeenRepository,
    @inject('ContentRepository')
    private contentRepository: IContentRepository,

  ) { }

  public async execute(id: string): Promise<Seen[] | null> {
    const userExists = await this.contentRepository.findByID(id);

    if (!userExists) throw new AppError('A content with this Id does not exist');

    const content = await this.seenRepository.getAllByContentId(id);

    return content;
  }
}
