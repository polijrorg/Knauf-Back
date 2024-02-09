import { inject, injectable } from 'tsyringe';

import { Seen } from '@prisma/client';

import ISeenRepository from '../repositories/ISeenRepository';

@injectable()
export default class MarkContentAsSeenService {
  constructor(
    @inject('SeenRepository')
    private seenRepository: ISeenRepository,
  ) { }

  public async execute(userId: string, contentId: string): Promise<Seen> {
    const content = await this.seenRepository.markAsSeen(userId, contentId);

    return content;
  }
}
