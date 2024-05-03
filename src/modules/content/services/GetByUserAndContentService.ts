import { inject, injectable } from 'tsyringe';

import { Seen } from '@prisma/client';

import ISeenRepository from '../repositories/ISeenRepository';

@injectable()
export default class GetByUserAndContentService {
  constructor(
    @inject('SeenRepository')
    private seenRepository: ISeenRepository,
  ) { }

  public async execute(contentId: string, userId: string): Promise<Seen | null> {
    const content = await this.seenRepository.getByUserAndContent(userId, contentId);

    return content;
  }
}
